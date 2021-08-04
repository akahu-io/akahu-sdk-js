import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { buildUrl, Protocol } from './utils';

import { Paginated } from './resources/base';
import { AccountsResource } from "./resources/accounts";
import { AuthResource } from './resources/auth';
import { ConnectionsResource } from './resources/connections';
import { IdentityResource } from './resources/identity';
import { PaymentsResource } from './resources/payments';
import { TransactionsResource } from './resources/transactions';
import { UsersResource } from './resources/users';


const { name: SDK_NAME, version: SDK_VERSION } = require('../package.json');

// We will set this header to report SDK version
const X_AKAHU_SDK = `${SDK_NAME}/${SDK_VERSION}`

type ApiVersion = 'v1';


/**
 * Options that control how the AkahuClient makes requests to the Akahu API.
 * Any of these options can be specified when initializing the AkahuClient, in which case they will
 * apply to all requests. These options may also be specified on a per-request basis.
 */
export interface RequestOptions {
  appToken: string,
  appSecret: string,
  apiVersion: ApiVersion,
  /**
   * The protocol used for Akahu API calls.
   * The Akahu API only supports connections over HTTPS, so this option is only
   * useful for test environments etc.
   */
  protocol: Protocol,
  host: string,
  port?: number,
}


export interface ClientConfig extends Partial<RequestOptions> {
  // appToken and appSecret are required properties for client initialisation
  appToken: string,
  appSecret: string,
};


type AuthMethod = { basic: boolean } | { token: string };


export class AkahuClient {
  private readonly axios: AxiosInstance;
  readonly requestOptions: RequestOptions;

  readonly auth: AuthResource;
  readonly identity: IdentityResource;
  readonly users: UsersResource;
  readonly accounts: AccountsResource;
  readonly connections: ConnectionsResource;
  readonly transactions: TransactionsResource;
  readonly payments: PaymentsResource;

  constructor(config: ClientConfig) {
    this.requestOptions = {
      apiVersion: 'v1',
      protocol: 'https',
      host: 'api.akahu.io',
      ...config
    };

    // Intialize axios client with request defaults
    const { appToken, apiVersion, protocol, host, port } = this.requestOptions;
    const baseURL = buildUrl({ protocol, host, port, path: apiVersion });
    const headers = { 'X-Akahu-SDK': X_AKAHU_SDK, 'X-Akahu-Id': appToken };
    this.axios = axios.create({ baseURL, headers });

    // Initialise client resources
    this.auth = new AuthResource(this);
    this.identity = new IdentityResource(this);
    this.users = new UsersResource(this);
    this.accounts = new AccountsResource(this);
    this.connections = new ConnectionsResource(this);
    this.transactions = new TransactionsResource(this);
    this.payments = new PaymentsResource(this);
  }

  _buildAuthConfig(auth: AuthMethod = { basic: false }) : AxiosRequestConfig {
    const { appToken, appSecret } = this.requestOptions;
    const config: AxiosRequestConfig = {};
    
    if ('basic' in auth && auth.basic) {
      config.auth = {
        username: appToken,
        password: appSecret,
      }
    } else if ('token' in auth) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    return config;
  }

  async _apiCall<T extends Paginated<any> | Record<string, any> | void>({
    path,
    method = 'GET',
    query,
    data,
    auth,
  } : {
    path: string,
    method?: 'GET' | 'POST' | 'DELETE',
    query?: Record<string, any>,
    data?: any,
    auth?: AuthMethod,
  }) : Promise<T> {

    const authConfig = this._buildAuthConfig(auth);
    let response: AxiosResponse;

    try {
      response = await this.axios.request({ ...authConfig, url: path, params: query, method, data });
    } catch (e) {
      // TODO: Network error handling
      console.error(e);
      throw e;
    }

    // Deserialize json response:
    //   success will (/should) always be present
    //   cursor will be present in the case of paginated responses
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
        ?? Object.keys(payload).length !== 0
          ? payload     // OAuth response data is not nested to be spec-compliant
          : undefined   // No response payload: no return value
    );
  }
}
