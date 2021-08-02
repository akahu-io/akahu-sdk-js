import fetch from 'node-fetch';
import type { Response } from 'node-fetch';

import { Agent } from 'https';

import { AuthorizationToken } from './models/auth';
import { IdentityResult } from './models/identity';

const { name: SDK_NAME, version: SDK_VERSION } = require('../package.json');
const USER_AGENT = `${SDK_NAME}/${SDK_VERSION} node/${process.version}`;

type ApiVersion = 'v1';
type Protocol = 'http' | 'https';


function buildUrl(
  { protocol, host, port, path = '', query } :
  { protocol: Protocol, host: string, port?: number, path?: string, query?: Record<string, string> }
) : string {
  // If not specified, port will be chosen by browser based on protocol choice (http or https).
  const _port = port ? `:${port}` : '';

  // Convert to URL encoded query string
  const queryString = query
    ? '?' + new URLSearchParams(query).toString()
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
  }

  _buildApiUrl(path: string, query?: Record<string, string>): string {
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

  async _apiCall<T>({
    path,
    method = 'GET',
    query,
    data,
    auth,
  } : {
    path: string,
    method?: 'GET' | 'POST' | 'DELETE',
    query?: Record<string, string>,
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

    // Deserialize json response
    const { success, ...payload } = await response.json();

    // Check status from API
    if (!success) {
      // TODO: Error response handling
      console.error(response.status);
      console.error(response.statusText);
      console.error({ success, ...payload });
      // Examples:
      // message: "Unauthorized"
      // error: 'invalid_grant',
      // error_description: 'This code has expired'
      throw new Error(payload.message);
    }

    // https://developers.akahu.nz/docs/response-formatting
    return payload.item_id  // Item id response
      ?? payload.item       // Single item response
      ?? payload.items      // Item list response
      ?? payload;           // OAuth responses are un-nested
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

  /**
   * Exchange an OAuth authorization code for an access token.
   * https://developers.akahu.nz/docs/identity-verification#retrieving-identity-results-with-the-oauth-result-code
   */
  public async exchange(code: string): Promise<IdentityResult> {
    return await this._client._apiCall<IdentityResult>({ path: `identity/${code}`, auth: { basic: true } });
  }
}
