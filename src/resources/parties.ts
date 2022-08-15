import { BaseResource } from "./base";

import { Party } from "../models";

/**
 * Fetch identity data relating to the party that the user has logged-in to
 * their institution as when connecting accounts to Akahu. i.e. the user's
 * "profile" information at the connected institution.
 * @category Resource
 */
export class PartiesResource extends BaseResource {
  /**
   * List all parties related to accounts which the user has shared with your
   * app.
   *
   * {@link https://developers.akahu.nz/reference/get_parties}
   */
  public async list(token: string): Promise<Party[]> {
    return await this._client._apiCall<Party[]>({
      path: "/parties",
      auth: { token },
    });
  }
}
