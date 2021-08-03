import fetch from 'node-fetch';
import type { Response } from 'node-fetch';

import { Agent } from 'https';

import { buildUrl, Protocol } from './utils';

import { Paginated } from './resources/base';
import { AccountsResource } from "./resources/accounts";
import { AuthResource } from './resources/auth';
import { ConnectionsResource } from './resources/connections';
import { IdentityResource } from './resources/identity';
import { TransactionsResource } from './resources/transactions';
import { UsersResource } from './resources/users';


const { name: SDK_NAME, version: SDK_VERSION } = require('../package.json');
const USER_AGENT = `${SDK_NAME}/${SDK_VERSION} node/${process.version}`;

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
  // The following config options are yet to be implemented
  timeout?: number,
  maxNetworkRetries?: number,
  agent?: Agent,
}


export interface ClientConfig extends Partial<RequestOptions> {
  // appToken and appSecret are required properties for client initialisation
  appToken: string,
  appSecret: string,
};


type AuthMethod = { basic: boolean } | { token: string };


export class AkahuClient {
  readonly requestOptions: RequestOptions;

  readonly auth: AuthResource;
  readonly identity: IdentityResource;
  readonly users: UsersResource;
  readonly accounts: AccountsResource;
  readonly connections: ConnectionsResource;
  readonly transactions: TransactionsResource;

  constructor(config: ClientConfig) {
    this.requestOptions = {
      apiVersion: 'v1',
      protocol: 'https',
      host: 'api.akahu.io',
      // timeout: 80000,
      // maxNetworkRetries: 0,
      ...config
    }

    // Initialise client resources
    this.auth = new AuthResource(this);
    this.identity = new IdentityResource(this);
    this.users = new UsersResource(this);
    this.accounts = new AccountsResource(this);
    this.connections = new ConnectionsResource(this);
    this.transactions = new TransactionsResource(this);
  }

  _buildApiUrl(path: string, query?: Record<string, string | undefined>): string {
    const { apiVersion, protocol, host, port } = this.requestOptions;
    return buildUrl({ protocol, host, port, path: `${apiVersion}/${path}`, query })
  }

  _buildHeaders(auth: AuthMethod = { basic: false }): Record<string, string> {
    const { appToken, appSecret } = this.requestOptions;

    const headers : Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT,
      'X-Akahu-Id': appToken,
    };

    if ('basic' in auth && auth.basic) {
      const credentials = Buffer.from(`${appToken}:${appSecret}`).toString('base64');
      headers.Authorization = `Basic ${credentials}`;
    } else if ('token' in auth) {
      headers.Authorization = `Bearer ${auth.token}`;
    }

    return headers;
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
    query?: Record<string, string | undefined>,
    data?: any,
    auth?: AuthMethod,
  }) : Promise<T> {
    // Build request
    const url = this._buildApiUrl(path, query);
    const body = data ? JSON.stringify(data) : undefined;
    const headers = this._buildHeaders(auth);

    let response: Response;

    try {
      response = await fetch(url, { method, headers, body });
    } catch (e) {
      // TODO: Network error handling
      console.error(e);
      throw e;
    }

    // Deserialize json response:
    //   success will (/should) always be present
    //   cursor will be present in the case of paginated responses
    const { success, cursor, ...payload } = await response.json();

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

    // Unpacking of non-paginated response formats
    // https://developers.akahu.nz/docs/response-formatting
    return (
      payload.item          // Single item response
      ?? payload.item_id    // Item id response
      ?? payload.items      // Item list response
      ?? Object.keys(payload).length !== 0
        ? payload     // OAuth response data is not nested to be spec-compliant
        : undefined   // No response payload: no return value
    );
  }
}
