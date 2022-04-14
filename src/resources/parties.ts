import { BaseResource } from "./base";

import { PartyData } from "../models";

/**
 * Fetch party data for the user such as their name, date-of-birth, email
 * addresses etc.
 * @category Resource
 */
export class PartiesResource extends BaseResource {
  /**
   * Fetch party data for the user such as their name, date-of-birth,
   * email addresses etc.
   *
   * {@link https://developers.akahu.nz/reference/get_parties}
   */
  public async get(token: string): Promise<PartyData> {
    return await this._client._apiCall<PartyData>({
      path: "/parties",
      auth: { token },
    });
  }
}
