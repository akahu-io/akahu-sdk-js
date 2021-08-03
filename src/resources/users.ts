import { BaseResource } from "./base";
import { User } from "../models/users";


export class UsersResource extends BaseResource {
  /**
   * Get the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/get_me
   */
  public async get(token: string): Promise<User> {
    return await this._client._apiCall<User>({ path: 'me', auth: { token } });
  }
}