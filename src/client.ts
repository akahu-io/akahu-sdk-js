import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { v4 as uuidv4 } from "uuid";

import {
  buildUrl,
  pick,
  Protocol,
  isNode,
  isBrowser,
  axiosRetryOnNetworkError,
} from "./utils";
import { version } from "./version";
import { AkahuErrorResponse } from "./errors";

import { Paginated } from "./models";
import { AuthResource } from "./resources/auth";
import { IdentitiesResource } from "./resources/identities";
import { AccountsResource } from "./resources/accounts";
import { ConnectionsResource } from "./resources/connections";
import { PaymentsResource } from "./resources/payments";
import { TransfersResource } from "./resources/transfers";
import { TransactionsResource } from "./resources/transactions";
import { UsersResource } from "./resources/users";
import { WebhooksResource } from "./resources/webhooks";
import { IncomeResource } from "./resources/income";

// We will set this header to report SDK version
const X_AKAHU_SDK = `akahu-sdk-js/${version}`;

type ApiVersion = "v1";

/**
 * @category API client config
 */
export { Protocol } from "./utils";

/**
 * Authentication and API endpoint configuration for {@link AkahuClient}.
 * @category API client config
 */
export type AkahuClientConfig = {
  /**
   * appToken is required to access the Akahu API.
   */
  appToken: string;
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
  appSecret?: string;
  /**
   * The Akahu API version. Currently the only supported value is "v1".
   *
   * @defaultValue `v1`
   */
  apiVersion?: ApiVersion;
  /**
   * The protocol used for Akahu API calls.
   * The Akahu API only supports connections over HTTPS, so this option is only
   * useful for test environments etc.
   *
   * @defaultValue `https`
   */
  protocol?: Protocol;
  /**
   * The Akahu API hostname.
   * It may be useful to override this in staging / testing environments.
   *
   * @defaultValue `api.akahu.io`
   */
  host?: string;
  /**
   * The Akahu API port.
   * It may be useful to override this in staging / testing environments.
   *
   * @defaultValue `undefined`
   */
  port?: number;
  /**
   * Additional headers that will be included in each request.
   */
  headers?: Record<string, string>;
  /**
   * Timeout in ms for each request to the Akahu API.
   *
   * If used in combination with `retries`, the timeout will be applied to
   * each retried request. This means that the total time until an error is
   * thrown due to a timeout will be `timeout * (retries + 1)` milliseconds.
   *
   * @defaultValue `0` (no timeout)
   */
  timeout?: number;
  /**
   * The number of times that API requests will be retried in the case of
   * network errors. Error responses from the Akahu API will not result in
   * a retry.
   *
   * @defaultValue `0`
   */
  retries?: number;
  /**
   * Optional configuration for an HTTP proxy.
   *
   * See the proxy section of the axios {@link https://axios-http.com/docs/req_config request config}
   * for more details.
   */
  proxy?: {
    host: string;
    port: number;
    auth?: {
      username: string;
      password: string;
    };
    protocol?: string;
  };
};

// We allow custom axios configuration using this subset of options
const allowedAxiosOptions = ["headers", "timeout", "proxy", "retries"] as const;

// Internal flag to switch between API authentication methods
type AuthMethod = { basic: true } | { token: string };

// Internal union type to capture the different shapes of response payloads
type ApiResponsePayload =
  | Record<string, any> // Generic `item` response
  | Record<string, any>[] // `items` list response
  | Paginated<Record<string, any>> // Paginated `items` list response
  | string // `item_id` response
  | void; // No response payload

/**
 * The AkahuClient provides a simple interface to the Akahu API and utilities
 * that assist with common usage patterns.
 *
 * AkahuClient uses {@link https://axios-http.com/docs/intro axios} under the hood to make
 * API requests. A subset of axios request options can be passed through to the underlying axios
 * instance using the options available in {@link AkahuClientConfig}.
 *
 * In the case of an error while making an API request, you can expect to handle one of the
 * following two exceptions:
 *
 * - {@link AkahuErrorResponse} When an error response is returned from the API
 * - {@link https://github.com/axios/axios/blob/v0.21.1/index.d.ts#L85 AxiosError} when an error
 *    occurred during the request process, but no response was received (i.e. due to network issues).
 *
 * @category API client
 */
export class AkahuClient {
  private readonly axios: AxiosInstance;
  /** @internal */
  readonly authConfig: { appToken: string; appSecret?: string };

  /**
   * @category Resource
   * @inheritDoc AuthResource
   * */
  auth: AuthResource;
  /**
   * @category Resource
   * @inheritDoc IdentitiesResource
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
   * @inheritDoc IncomeResource
   * */
  income: IncomeResource;
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

  constructor(config: AkahuClientConfig) {
    const {
      appToken,
      appSecret,
      apiVersion,
      protocol,
      host,
      port,
      ...axiosOptions
    } = {
      apiVersion: "v1" as const,
      protocol: "https" as const,
      host: "api.akahu.io",
      ...config,
    };
    // Sanity check to warn against insecure App Secret usage
    if (typeof appSecret !== "undefined" && !isNode()) {
      console.warn(
        "Warning: do not use the appSecret option with AkahuClient in a client-side " +
          "application. This option is only intended to be used on a server environment."
      );
    }

    this.authConfig = { appToken, appSecret };

    // Common headers that we will send with each request
    const akahuHeaders: Record<string, string> = {
      "X-Akahu-Sdk": X_AKAHU_SDK, // Report the SDK version
      "X-Akahu-Id": appToken, // Identify the calling app
    };

    // Also report SDK version in the User-Agent for convenience / visibility in logs. However
    // we don't want to set this in a browser environment as not all browsers support overriding
    // this header and it may result in un-suppressible errors in the browser console.
    // e.g: https://github.com/axios/axios/issues/1231
    if (!isBrowser()) {
      akahuHeaders["User-Agent"] = X_AKAHU_SDK;
    }

    // Filter user-provided config to ensure we only include supported options.
    const filteredAxiosOptions = pick<AxiosRequestConfig>(
      axiosOptions,
      ...allowedAxiosOptions
    );

    this.axios = axios.create({
      ...filteredAxiosOptions,
      baseURL: buildUrl({ protocol, host, port, path: apiVersion }),
      headers: { ...filteredAxiosOptions.headers, ...akahuHeaders },
    } as AxiosRequestConfig);

    this.axios.interceptors.response.use(undefined, axiosRetryOnNetworkError);

    // Initialise client resources
    this.auth = new AuthResource(this);
    this.identities = new IdentitiesResource(this);
    this.users = new UsersResource(this);
    this.connections = new ConnectionsResource(this);
    this.accounts = new AccountsResource(this);
    this.income = new IncomeResource(this);
    this.payments = new PaymentsResource(this);
    this.transfers = new TransfersResource(this);
    this.transactions = new TransactionsResource(this);
    this.webhooks = new WebhooksResource(this);
  }

  private _authorizeRequest(
    config: AxiosRequestConfig,
    auth?: AuthMethod
  ): AxiosRequestConfig {
    if (typeof auth !== "undefined") {
      // Basic HTTP auth is use for "app" endpoints
      if ("basic" in auth && auth.basic) {
        const { appToken, appSecret } = this.authConfig;

        if (typeof appSecret === "undefined") {
          throw new Error(
            "This resource requires authentication using your Akahu app secret. " +
              "Include this using the `appSecret` option when initializing the AkahuClient."
          );
        }
        return { ...config, auth: { username: appToken, password: appSecret } };
      }
      // Token auth is used for user-specific endpoints
      if ("token" in auth) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${auth.token}`,
          },
        };
      }
    }

    return config;
  }

  private _makeIdempotent(config: AxiosRequestConfig): AxiosRequestConfig {
    if (config.method?.toUpperCase() === "POST") {
      return {
        ...config,
        headers: { ...config.headers, "Idempotency-Key": uuidv4() },
      };
    }

    return config;
  }

  private _sanitizeQuery(query: Record<string, any>): Record<string, any> {
    // Sanity check for attempts to paginate with a `null` cursor. This might
    // happen if the user blindly passes in the "next" cursor from a paginated
    // response without checking its value. `query.cursor` must either be
    // `undefined` or a string value.
    if (query.cursor === null) {
      throw new Error(
        "Pagination cursor cannot be null. A null next cursor in an API " +
          "response indicates that the final page has been reached."
      );
    }

    return query;
  }

  /**
   * Generic API wrapper, exposed for use by client resources.
   * @internal
   */
  async _apiCall<T extends ApiResponsePayload>({
    path,
    method = "GET",
    query,
    data,
    auth,
  }: {
    path: string;
    method?: "GET" | "POST" | "DELETE";
    query?: Record<string, any>;
    data?: any;
    auth?: AuthMethod;
  }): Promise<T> {
    let params = query;

    if (typeof params !== "undefined") {
      params = this._sanitizeQuery(params);
    }

    // Build up the request config object for axios
    let requestConfig: AxiosRequestConfig = { url: path, method, params, data };
    requestConfig = this._authorizeRequest(requestConfig, auth);
    requestConfig = this._makeIdempotent(requestConfig);

    let response: AxiosResponse;

    try {
      response = await this.axios.request(requestConfig);
    } catch (e) {
      const err = e as AxiosError;
      // Wrap error responses from the API
      if (typeof err.response !== "undefined") {
        throw new AkahuErrorResponse(err.response);
      }
      // All other errors are re-raised.
      throw err;
    }

    // Unpack response:
    // - success will always be present
    // - cursor will be present in the case of paginated responses
    // - response value will generally be nested under `item`, `items`, or `item_id`
    const { success, cursor, ...payload } = response.data;

    // Check status flag from API. Generally we shouldn't hit this, as any response
    // with `success: false` should return a 4xx or 5xx status which would
    // cause an exception above.
    if (!success) throw new AkahuErrorResponse(response);

    // Results from paginated responses are always nested under `items`
    if (cursor) {
      return { cursor, items: payload.items } as T;
    }

    // Unpacking of non-paginated response formats:
    // https://developers.akahu.nz/docs/response-formatting
    // Order is important here, as some endpoints return both `item` and
    // `item_id`, the latter of which is deprecated.
    return (payload.item ?? // Single item response
      payload.item_id ?? // Item id response
      payload.items ?? // Item list response
      (Object.keys(payload).length !== 0
        ? payload // OAuth response data is not nested to be spec-compliant
        : undefined)) as T; // No response payload: no return value
  }
}
