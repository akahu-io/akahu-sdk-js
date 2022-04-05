import { BaseResource } from "./base";
import { Income, IncomeQueryParams } from "../models";

/**
 * Utilities for retrieving income from connected user accounts.
 *
 * TODO: Link to docs
 *
 * @category Resource
 */
export class IncomeResource extends BaseResource {
  /**
   * List all income for all accounts that have been connected by the user associated with the
   * specified `token`.
   *
   * TODO: Link to docs
   */
  public async list(
    token: string,
    query: IncomeQueryParams = {}
  ): Promise<Income[]> {
    // Paginated list endpoint with optional query params for date range & cursor
    return await this._client._apiCall<Income[]>({
      path: "/income",
      auth: { token },
      query,
    });
  }

  /**
   * Get a single income object from an account that has been connected by the user associated with
   * the specified `token`.
   *
   * TODO: Link to docs
   */
  public async get(
    token: string,
    incomeId: string,
    query: IncomeQueryParams = {}
  ): Promise<Income> {
    return await this._client._apiCall<Income>({
      path: `/income/${incomeId}`,
      auth: { token },
      query,
    });
  }
}
