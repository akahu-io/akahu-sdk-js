import { BaseResource } from "./base";
import { Protocol } from "../utils";
import { IdentityResult } from "../models/identity";


export class IdentityResource extends BaseResource {
  /**
   * Build the Identity OAuth Authorization URL
   * https://developers.akahu.nz/docs/identity-verification#the-authorization-request
  */
  public buildAuthorizationUrl(
    params: {
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
    return await this._client._apiCall<IdentityResult[]>({ path: '/identity', auth: { basic: true } });
  }

  /**
   * Retreive an identity result
   * https://developers.akahu.nz/docs/identity-verification#retrieving-identity-results-with-the-oauth-result-code
   */
  public async get(code: string): Promise<IdentityResult> {
    return await this._client._apiCall<IdentityResult>({ path: `/identity/${code}`, auth: { basic: true } });
  }
}

