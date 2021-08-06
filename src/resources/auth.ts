import { Protocol, buildUrl } from "../utils";
import { BaseResource } from "./base";
import { AuthorizationToken } from "../models/auth";


export class AuthResource extends BaseResource {

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
    }: {
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
    const { appToken: client_id } = this._client.authConfig;
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
    params: {
      grant_type?: string
      code: string,
      redirect_uri: string,
    }
  ): Promise<AuthorizationToken> {
    // POST parameters for OAuth code exchange
    const { appToken: client_id, appSecret: client_secret } = this._client.authConfig;
    const data = { grant_type: 'authorization_code', client_id, client_secret, ...params };

    return await this._client._apiCall<AuthorizationToken>({ path: '/token', method: 'POST', data });
  }

  /**
   * Revoke the specified user auth token:
   * https://developers.akahu.nz/reference/delete_token
   */
  public async revoke(token: string) {
    return await this._client._apiCall<void>({ path: '/token', method: 'DELETE', auth: { token } });
  }
}
