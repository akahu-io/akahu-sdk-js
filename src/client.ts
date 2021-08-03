import fetch from 'node-fetch';
import type { Response } from 'node-fetch';

import { Agent } from 'https';

import {
  Account,
  AuthorizationToken,
  Connection,
  IdentityResult,
  Paginated,
  Transaction,
  TransactionQueryParams,
  User,
} from './models';

const { name: SDK_NAME, version: SDK_VERSION } = require('../package.json');
const USER_AGENT = `${SDK_NAME}/${SDK_VERSION} node/${process.version}`;

type ApiVersion = 'v1';
type Protocol = 'http' | 'https';


function buildUrl(
  { protocol, host, port, path = '', query = {}} :
  { protocol: Protocol, host: string, port?: number, path?: string, query?: Record<string, string | undefined> }
) : string {
  // If not specified, port will be chosen by browser based on protocol choice (http or https).
  const _port = port ? `:${port}` : '';

  // Clean `undefined` values from the query params 
  const cleanedQuery = Object.fromEntries(
    Object.entries(query || {}).filter(([_, v]) => typeof v !== 'undefined')
  ) as Record<string, string>;

  // Convert to URL encoded query string
  const queryString = Object.keys(cleanedQuery).length !== 0
    ? '?' + new URLSearchParams(cleanedQuery).toString()
    : '';

  return `${protocol}://${host}${_port}/${path}${queryString}`;
}


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


export default class AkahuClient {
  readonly requestOptions: RequestOptions;

  readonly auth: OAuthResource;
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
    this.auth = new OAuthResource(this);
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


class BaseResource {
  protected readonly _client: AkahuClient;

  constructor(client: AkahuClient) {
    this._client = client;
  }
}


class OAuthResource extends BaseResource {

  /**
   * Build the OAuth Authorization URL
   * https://developers.akahu.nz/docs/authorizing-with-oauth2#the-authorization-request
  */
  public buildAuthorizationUrl(
    {
      protocol = 'https',
      host = 'oauth.akahu.io',
      port,
      path = '',
      response_type = 'code',
      email,
      connection,
      redirect_uri,
      scope = 'ENDURING_CONSENT',
      state
    } : {
      protocol?: Protocol,
      host?: string,
      port?: number,
      path?: string,
      response_type?: string,
      email?: string,
      connection?: string,
      redirect_uri: string,
      scope?: string,
      state?: string,
    }
  ) {
    // Construct main OAuth query params
    const { appToken: client_id } = this._client.requestOptions;
    const query: Record<string, string> = { response_type, redirect_uri, scope, client_id };

    // Include optional params if specified in options
    if (email) query.email = email;
    if (connection) query.connection = connection;
    if (state) query.state = state;

    return buildUrl({ protocol, host, port, path, query })
  }

  /**
   * Exchange an OAuth authorization code for an access token.
   * https://developers.akahu.nz/docs/authorizing-with-oauth2#exchanging-the-authorization-code
   * https://developers.akahu.nz/reference/post_token
   */
  public async exchange(
    params : {
      grant_type?: string
      code: string,
      redirect_uri: string,
    }
  ): Promise<AuthorizationToken> {
    // POST parameters for OAuth code exchange
    const { appToken: client_id, appSecret: client_secret } = this._client.requestOptions;
    const data = { grant_type: 'authorization_code', client_id, client_secret, ...params };

    return await this._client._apiCall<AuthorizationToken>({ path: 'token', method: 'POST', data });
  }

  /**
   * Revoke the specified user auth token:
   * https://developers.akahu.nz/reference/delete_token
   */
  public async revoke(token: string) {
    return await this._client._apiCall<void>({ path: 'token', method: 'DELETE', auth: { token } });
  }
}


class IdentityResource extends BaseResource {
  /**
   * Build the Identity OAuth Authorization URL
   * https://developers.akahu.nz/docs/identity-verification#the-authorization-request
  */
  public buildAuthorizationUrl(
    params : {
      protocol?: Protocol,
      host?: string,
      port?: number,
      path?: string,
      response_type?: string,
      redirect_uri: string,
      scope?: string,
      state?: string,
    }
  ) {
    // Borrow implementaton from `OAuthResource.buildAuthorizationUrl`
    return this._client.auth.buildAuthorizationUrl({ scope: 'ONEOFF', ...params });
  }

  public async list(): Promise<IdentityResult[]> {
    return await this._client._apiCall<IdentityResult[]>({ path: 'identity', auth: { basic: true } });
  }

  /**
   * Retreive an identity result
   * https://developers.akahu.nz/docs/identity-verification#retrieving-identity-results-with-the-oauth-result-code
   */
  public async get(code: string): Promise<IdentityResult> {
    return await this._client._apiCall<IdentityResult>({ path: `identity/${code}`, auth: { basic: true } });
  }
}


class UsersResource extends BaseResource {
  /**
   * Get the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/get_me
   */
  public async get(token: string): Promise<User> {
    return await this._client._apiCall<User>({ path: 'me', auth: { token } });
  }
}


class AccountsResource extends BaseResource {
  /**
   * List all accounts that have been connected by the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/get_accounts
   */
  public async list(token: string): Promise<Account[]> {
    return await this._client._apiCall<Account[]>({ path: 'accounts', auth: { token } });
  } 

  /**
   * Get a single account that has been connected by the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/get_accounts-id
   */
  public async get(accountId: string, token: string): Promise<Account> {
    return await this._client._apiCall<Account>({
      path: `accounts/${accountId}`,
      auth: { token }
    });
  }
  
  /**
   * Refresh all accounts that have been connected by the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/post_refresh
   */
  public async refreshAll(token: string): Promise<void> {
    return await this._client._apiCall<void>({ path: 'refresh', auth: { token } });
  }

  /**
   * Refresh a single account that has been connected by the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/post_refresh-id
   */
  public async refresh(accountId: string, token: string): Promise<void> {
    return await this._client._apiCall<void>({
      path: `refresh/${accountId}`,
      auth: { token }
    });
  }

  /**
   * List transactions for a specified account.
   * https://developers.akahu.nz/reference/get_accounts-id-transactions
   */
  public async transactions(
    accountId: string,
    token: string,
    query: TransactionQueryParams = {}
  ): Promise<Paginated<Transaction>> {
    return await this._client._apiCall<Paginated<Transaction>>({
      path: `accounts/${accountId}/transactions`,
      auth: { token },
      query,
    });
  }
}


class ConnectionsResource extends BaseResource {
  /**
   * List all connections that the app has access to.
   * https://developers.akahu.nz/reference/get_connections
   */
  public async list(): Promise<Connection[]> {
    return await this._client._apiCall<Connection[]>({ path: 'connections', auth: { basic: true } });
  }

  /**
   * Get an individual connection detail.
   * https://developers.akahu.nz/reference/get_connections-id
   */
  public async get(connectionId: string): Promise<Connection> {
    return await this._client._apiCall<Connection>({
      path: `connections/${connectionId}`,
      auth: { basic: true }
    });
  }


  /**
   * Refresh all accounts that are made using the given connection and have been
   * connected by the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/post_refresh-id
   */
  public async refresh(connectionId: string, token: string): Promise<void> {
    return await this._client._apiCall<void>({
      path: `refresh/${connectionId}`,
      auth: { token }
    });
  }
}


class TransactionsResource extends BaseResource {
  /**
   * List all transactions for all accounts that have been connected by the user associated with the
   * specified `token`.
   * https://developers.akahu.nz/reference/get_transactions
   */
  public async list(
    token: string,
    query: TransactionQueryParams = {}
  ): Promise<Paginated<Transaction>> {
    return await this._client._apiCall<Paginated<Transaction>>({
      path: 'transactions',
      auth: { token },
      query
    });
  }

  
  /**
   * Get a single transaction from an account that has been connected by the user associated with
   * the specified `token`.
   * https://developers.akahu.nz/reference/get_transactions-id
   */
  public async get(transactionId: string, token: string): Promise<Transaction> {
    return await this._client._apiCall<Transaction>({
      path: `transactions/${transactionId}`,
      auth: { token }
    });
  }
}