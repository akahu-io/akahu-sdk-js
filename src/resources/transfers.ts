import { BaseResource } from "./base";
import { Transfer, TransferCreateParams, TransferQueryParams } from "../models";

/**
 * Utilities for managing bank account transfers on behalf of users.
 *
 * {@link https://developers.akahu.nz/docs/making-a-transfer}
 *
 * @category Resource
 */
export class TransfersResource extends BaseResource {
  /**
   * Get a single transfer made by the user associated with the specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/get_transfers-id}
   */
  public async get(token: string, transferId: string): Promise<Transfer> {
    return await this._client._apiCall<Transfer>({
      path: `/transfers/${transferId}`,
      auth: { token },
    });
  }

  /**
   * List all transfers made in the provided date range by the user associated
   * with the specified `token`. Defaults to the last 30 days if no date range
   * is provided.
   *
   * {@link https://developers.akahu.nz/reference/get_transfers}
   */
  public async list(
    token: string,
    query: TransferQueryParams = {}
  ): Promise<Transfer[]> {
    // List endpoint with optional query params for date range
    return await this._client._apiCall<Transfer[]>({
      path: "/transfers",
      auth: { token },
      query,
    });
  }

  /**
   * Initiate a transfer between two of the users bank accounts.
   *
   * {@link https://developers.akahu.nz/reference/post_transfers}
   */
  public async create(
    token: string,
    transfer: TransferCreateParams
  ): Promise<Transfer> {
    return await this._client._apiCall<Transfer>({
      path: "/transfers",
      method: "POST",
      auth: { token },
      data: transfer,
    });
  }
}
