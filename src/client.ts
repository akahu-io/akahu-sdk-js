import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { buildUrl, pick, Protocol } from './utils';

import { Paginated } from './resources/base';
import { AccountsResource } from "./resources/accounts";
import { AuthResource } from './resources/auth';
import { ConnectionsResource } from './resources/connections';
import { IdentityResource } from './resources/identity';
import { PaymentsResource } from './resources/payments';
import { TransactionsResource } from './resources/transactions';
import { UsersResource } from './resources/users';
import { WebhooksResource } from './resources/webhooks';


const { name: SDK_NAME, version: SDK_VERSION } = require('../package.json');

// We will set this header to report SDK version
const X_AKAHU_SDK = `${SDK_NAME}/${SDK_VERSION}`

type ApiVersion = 'v1';


/**
 * Akahu API and authentication configuration.
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
   * For security reasons, this option must not be made available client-side in
   * the browser.
   * 
   * https://developers.akahu.nz/reference/api_index
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
const supportedAxiosOptions = ['headers', 'timeout', 'proxy'] as const;
/**
 * Config that will be passed though to axios when making API requests.
 * Only a subset of axios configuration parameters are supported.
 * 
 * {@link https://axios-http.com/docs/req_config}
 */
export type AkahuRequestConfig = Pick<AxiosRequestConfig, typeof supportedAxiosOptions[number]>;


// Internal flag to switch between API authentication methods
type AuthMethod = { basic: true } | { token: string };


// Internal union type to capture the different shapes of response payloads
type ApiResponsePayload =
  Record<string, any>               // Generic `item` response
  | Record<string, any>[]           // `items` list response
  | Paginated<Record<string, any>>  // Paginated `items` list response
  | string                          // `item_id` response
  | void;                           // No response payload


export class AkahuClient {
  private readonly axios: AxiosInstance;
  readonly authConfig: { appToken: string, appSecret?: string }

  readonly auth: AuthResource;
  readonly identity: IdentityResource;
  readonly users: UsersResource;
  readonly accounts: AccountsResource;
  readonly connections: ConnectionsResource;
  readonly transactions: TransactionsResource;
  readonly payments: PaymentsResource;
  readonly webhooks: WebhooksResource;

  constructor(apiOptions: AkahuApiConfig, requestConfig: AkahuRequestConfig = {}) {
    const { appToken, appSecret, apiVersion, protocol, host, port } = {
      apiVersion: 'v1' as const,
      protocol: 'https' as const,
      host: 'api.akahu.io',
      ...apiOptions
    };

    this.authConfig = { appToken, appSecret };

    // Filter user-provided axios config to ensure we only include supported options.
    const filteredRequestConfig = pick<AkahuRequestConfig>(requestConfig, ...supportedAxiosOptions);
    

    this.axios = axios.create({
      ...filteredRequestConfig,
      baseURL: buildUrl({ protocol, host, port, path: apiVersion }),
      headers: {
        ...filteredRequestConfig.headers,
        'X-Akahu-SDK': X_AKAHU_SDK,
        'X-Akahu-Id': appToken,
      }
    });

    // Initialise client resources
    this.auth = new AuthResource(this);
    this.identity = new IdentityResource(this);
    this.users = new UsersResource(this);
    this.accounts = new AccountsResource(this);
    this.connections = new ConnectionsResource(this);
    this.transactions = new TransactionsResource(this);
    this.payments = new PaymentsResource(this);
    this.webhooks = new WebhooksResource(this);
  }

  private _buildAuthConfig(auth?: AuthMethod) : AxiosRequestConfig {    
    if (typeof auth === 'undefined') {
      return {}
    }
    
    if ('basic' in auth && auth.basic) {
      const { appToken, appSecret } = this.authConfig;

      if (typeof appSecret === 'undefined') {
        throw new Error(
          'This resource requires authentication using your Akahu app secret. ' +
          'Include this using the `appSecret` option when initializing the AkahuClient.'
        );
      }
      return { auth: { username: appToken, password: appSecret } };
    }
    
    if ('token' in auth) {
      return { headers: { Authorization: `Bearer ${auth.token}` } };
    }

    return {};
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
    const authConfig = this._buildAuthConfig(auth);
    let response: AxiosResponse;

    try {
      response = await this.axios.request({ ...authConfig, url: path, params: query, method, data });
    } catch (e) {
      // TODO: Network error handling
      console.error(e);
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
    );
  }
}
