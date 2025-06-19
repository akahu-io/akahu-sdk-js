import { BaseResource } from "./base";

/**
 * Utilities for managing Akahu authorisations that have been linked by users.
 *
 * @category Resource
 */
export class AuthorisationsResource extends BaseResource {
  /**
   * Revoke a single authorisation from the specified `token`.
   *
   * After this call the token will no longer have access to the specified authorisation or it's associated data,
   * including accounts and transactions.
   *
   * {@link https://developers.akahu.nz/reference/delete_authorisations-id}
   */
  public async revoke(token: string, authorisationId: string): Promise<void> {
    return await this._client._apiCall<void>({
      path: `/authorisations/${authorisationId}`,
      method: "DELETE",
      auth: { token },
    });
  }
}
