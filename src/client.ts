import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { v4 as uuidv4 } from 'uuid';

import { buildUrl, pick, Protocol, axiosRetryOnNetworkError } from './utils';

import { Paginated } from './models';
import { AuthResource } from './resources/auth';
import { IdentitiesResource } from './resources/identities';
import { AccountsResource } from "./resources/accounts";
import { ConnectionsResource } from './resources/connections';
import { PaymentsResource } from './resources/payments';
import { TransfersResource } from './resources/transfers';
import { TransactionsResource } from './resources/transactions';
import { UsersResource } from './resources/users';
import { WebhooksResource } from './resources/webhooks';


const { name: SDK_NAME, version: SDK_VERSION } = require('../package.json');

// We will set this header to report SDK version
const X_AKAHU_SDK = `${SDK_NAME}/${SDK_VERSION}`

type ApiVersion = 'v1';

/**
 * @category API client config
 */
export { Protocol } from './utils';

/**
 * Akahu API and authentication configuration.
 * @category API client config
 */
export type AkahuApiConfig = {
  /**
   * appToken is required to access the Akahu API.
   */
  appToken: string,
  /**
   * appSecret is only required for completing an OAuth code exchange, or to
   * access app-specific endpoints.
   * 
   * For security reasons, this option must not be used client-side in the browser.
   * 
   * {@link https://developers.akahu.nz/reference/api_index}
   * 
   * @defaultValue `undefined`
   */
  appSecret?: string,
  /**
   * The Akahu API version. Currently the only supported value is "v1".
   * 
   * @defaultValue `v1`
   */
  apiVersion?: ApiVersion,
  /**
   * The protocol used for Akahu API calls.
   * The Akahu API only supports connections over HTTPS, so this option is only
   * useful for test environments etc.
   * 
   * @defaultValue `https`
   */
  protocol?: Protocol,
  /**
   * The Akahu API hostname.
   * It may be useful to override this in staging / testing enviroments.
   * 
   * @defaultValue `api.akahu.io`
   */
  host?: string,
  /**
   * The Akahu API port.
   * It may be useful to override this in staging / testing enviroments.
   *
   * @defaultValue `undefined`
   */
  port?: number,
};


// We allow custom axios configuration using this subset of options
const allowedRequestOptions = ['headers', 'timeout', 'proxy', 'retries'] as const;
/**
 * Config that will be passed though to axios when making API requests.
 * Only a subset of axios configuration parameters are supported.
 * 
 * {@link https://axios-http.com/docs/req_config}
 * @category API client config
 */
export type AkahuRequestConfig = {
  // Equivalent to the following, but specified manually for better doc generation:
  // Pick<AxiosRequestConfig, typeof allowedRequestOptions[number]>;
  headers?: Record<string, string>,
  timeout?: number,
  retries?: number,
  proxy?: {
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
    protocol?: string;
  },
};



// Internal flag to switch between API authentication methods
type AuthMethod = { basic: true } | { token: string };


// Internal union type to capture the different shapes of response payloads
type ApiResponsePayload =
  Record<string, any>               // Generic `item` response
  | Record<string, any>[]           // `items` list response
  | Paginated<Record<string, any>>  // Paginated `items` list response
  | string                          // `item_id` response
  | void;                           // No response payload


/**
 * @category API client config
 */
export class AkahuClient {
  private readonly axios: AxiosInstance;
  /** @internal */
  readonly authConfig: { appToken: string, appSecret?: string }

  /**
   * @category Resource
   * @inheritDoc AuthResource
   * */
  auth: AuthResource;
  /**
   * @category Resource
   * @inheritDoc IdentityResource
   * */
  identities: IdentitiesResource;
  /**
   * @category Resource
   * @inheritDoc UsersResource
   * */
  users: UsersResource;
   /**
    * @category Resource
    * @inheritDoc ConnectionsResource
    * */
  connections: ConnectionsResource;
  /**
   * @category Resource
   * @inheritDoc AccountsResource
   * */
  accounts: AccountsResource;
  /**
   * @category Resource
   * @inheritDoc PaymentsResource
   * */
  payments: PaymentsResource;
  /**
  * @category Resource
  * @inheritDoc TransfersResource
  * */
  transfers: TransfersResource;
  /**
   * @category Resource
   * @inheritDoc TransactionsResource
   * */
  transactions: TransactionsResource;
  /**
   * @category Resource
   * @inheritDoc WebhooksResource
   * */
  webhooks: WebhooksResource;

  constructor(apiOptions: AkahuApiConfig, requestConfig: AkahuRequestConfig = {}) {
    const { appToken, appSecret, apiVersion, protocol, host, port } = {
      apiVersion: 'v1' as const,
      protocol: 'https' as const,
      host: 'api.akahu.io',
      ...apiOptions
    };

    this.authConfig = { appToken, appSecret };

    // Filter user-provided axios config to ensure we only include supported options.
    const filteredRequestConfig = pick<AkahuRequestConfig>(requestConfig, ...allowedRequestOptions);
    

    this.axios = axios.create({
      ...filteredRequestConfig,
      baseURL: buildUrl({ protocol, host, port, path: apiVersion }),
      headers: {
        ...filteredRequestConfig.headers,
        'X-Akahu-Sdk': X_AKAHU_SDK,
        'X-Akahu-Id': appToken,
      }
    } as AxiosRequestConfig);

    this.axios.interceptors.response.use(undefined, axiosRetryOnNetworkError);

    // Initialise client resources
    this.auth = new AuthResource(this);
    this.identities = new IdentitiesResource(this);
    this.users = new UsersResource(this);
    this.connections = new ConnectionsResource(this);
    this.accounts = new AccountsResource(this);
    this.payments = new PaymentsResource(this);
    this.transfers = new TransfersResource(this);
    this.transactions = new TransactionsResource(this);
    this.webhooks = new WebhooksResource(this);
  }

  private _authorizeRequest(config: AxiosRequestConfig, auth?: AuthMethod) : AxiosRequestConfig {    
    if (typeof auth !== 'undefined') {
      // Basic HTTP auth is use for "app" endpoints
      if ('basic' in auth && auth.basic) {
        const { appToken, appSecret } = this.authConfig;
  
        if (typeof appSecret === 'undefined') {
          throw new Error(
            'This resource requires authentication using your Akahu app secret. ' +
            'Include this using the `appSecret` option when initializing the AkahuClient.'
          );
        }
        return { ...config, auth: { username: appToken, password: appSecret }};
      }
      // Token auth is used for user-specific endpoints
      if ('token' in auth) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${auth.token}`,
          }
        };
      }
    }

    return config;
  }

  private _makeIdempotent(config: AxiosRequestConfig) : AxiosRequestConfig {
    if (config.method?.toUpperCase() === 'POST') {
      return { ...config, headers: { ...config.headers,
                                     'Idempotency-Key': uuidv4() }}
    }

    return config;
  }

  /**
   * Generic API wrapper, exposed for use by client resources.
   * @internal
   */
  async _apiCall<T extends ApiResponsePayload>(
    { path, method = 'GET', query, data, auth } :
    {
      path: string,
      method?: 'GET' | 'POST' | 'DELETE',
      query?: Record<string, any>,
      data?: any,
      auth?: AuthMethod,
    }
  ) : Promise<T> {
    let requestConfig: AxiosRequestConfig = { url: path, params: query, method, data };

    requestConfig = this._authorizeRequest(requestConfig, auth);
    requestConfig = this._makeIdempotent(requestConfig);

    let response: AxiosResponse;

    try {
      response = await this.axios.request(requestConfig);
    } catch (e) {
      // TODO: Network error handling
      // console.error(e);
      throw e;
    }

    // Unpack response:
    // - success will (should) always be present
    // - cursor will be present in the case of paginated responses
    // - response value will generally be nested under `item`, `items`, or `item_id`
    const { success, cursor, ...payload } = response.data;

    // Check status from API
    if (!success) {
      // TODO: Error response handling
      console.error(response.status);
      console.error(response.statusText);
      console.error({ success, ...payload });
      // Examples:
      // payload = { message: "Unauthorized" }
      // payload = {
      //   error: 'invalid_grant',
      //   error_description: 'This code has expired',
      // }
      throw new Error(payload.message);
    }

    // Results from paginated responses are always nested under `items`
    if (cursor) {
      return { cursor, items: payload.items } as T;
    }

    // Unpacking of non-paginated response formats:
    // https://developers.akahu.nz/docs/response-formatting
    // Order is important here, as some endpoints return both `item` and `item_id`, the latter of
    // which is deprecated.
    return (
      payload.item          // Single item response
        ?? payload.item_id  // Item id response
        ?? payload.items    // Item list response
        ?? (Object.keys(payload).length !== 0
            ? payload     // OAuth response data is not nested to be spec-compliant
            : undefined)  // No response payload: no return value
    ) as T;
  }
}
