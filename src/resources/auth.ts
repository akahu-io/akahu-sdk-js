import { Protocol, buildUrl } from "../utils";
import { BaseResource } from "./base";
import { AuthorizationToken } from "../models";

/**
 * Utilities for authorizing users using OAuth2.
 *
 * {@link https://developers.akahu.nz/docs/authorizing-with-oauth2}
 *
 * @category Resource
 */
export class AuthResource extends BaseResource {
  /**
   * Build the OAuth Authorization URL
   *
   * @param options Options for customising the generated URL.
   *
   * {@link https://developers.akahu.nz/docs/authorizing-with-oauth2#the-authorization-request}
   */
  public buildAuthorizationUrl(options: {
    /**
     * Where to redirect the user once they have accepted or rejected the access request.
     * This **must** match one of your app's Redirect URIs.
     */
    redirect_uri: string;
    /**
     * The type of OAuth response. Currently `code` is the only supported option.
     *
     * @default `code`
     */
    response_type?: string;
    scope?: string;
    email?: string;
    connection?: string;
    state?: string;
    protocol?: Protocol;
    host?: string;
    port?: number;
    path?: string;
  }) {
    // Unpack options with defaults
    const {
      protocol,
      host,
      port,
      path,
      response_type,
      scope,
      redirect_uri,
      state,
      email,
      connection,
    } = {
      protocol: "https" as const,
      host: "oauth.akahu.io",
      path: "",
      response_type: "code",
      scope: "ENDURING_CONSENT",
      ...options,
    };

    // Construct main OAuth query params
    const { appToken: client_id } = this._client.authConfig;
    const query: Record<string, string> = {
      response_type,
      redirect_uri,
      scope,
      client_id,
    };

    // Include optional params if specified in options
    if (email) query.email = email;
    if (connection) query.connection = connection;
    if (state) query.state = state;

    return buildUrl({ protocol, host, port, path, query });
  }

  /**
   * Exchange an OAuth authorization code for an access token.
   *
   * {@link https://developers.akahu.nz/docs/authorizing-with-oauth2#exchanging-the-authorization-code}
   * {@link https://developers.akahu.nz/reference/post_token}
   */
  public async exchange(
    code: string,
    redirect_uri: string,
    grant_type: string = "authorization_code"
  ): Promise<AuthorizationToken> {
    // POST parameters for OAuth code exchange
    const { appToken: client_id, appSecret: client_secret } =
      this._client.authConfig;
    const data = { code, redirect_uri, grant_type, client_id, client_secret };

    return await this._client._apiCall<AuthorizationToken>({
      path: "/token",
      method: "POST",
      data,
    });
  }

  /**
   * Revoke the specified user auth token:
   *
   * {@link https://developers.akahu.nz/reference/delete_token}
   */
  public async revoke(token: string) {
    return await this._client._apiCall<void>({
      path: "/token",
      method: "DELETE",
      auth: { token },
    });
  }
}
