import { BaseResource } from "./base";

import {
  Account,
  Transaction,
  TransactionQueryParams,
  Paginated,
} from '../models';


/**
 * Utilities for managing Akahu accounts that have been linked by users.
 * 
 * {@link https://developers.akahu.nz/docs/accessing-account-data}
 * 
 * @category Resource
 */
export class AccountsResource extends BaseResource {
  /**
   * List all accounts that have been connected by the user associated with the specified `token`.
   * 
   * {@link https://developers.akahu.nz/reference/get_accounts}
   */
  public async list(token: string): Promise<Account[]> {
    return await this._client._apiCall<Account[]>({
      path: '/accounts',
      auth: { token }
    });
  }

  /**
   * Get a single account that has been connected by the user associated with the specified `token`.
   * 
   * {@link https://developers.akahu.nz/reference/get_accounts-id}
   */
  public async get(token: string, accountId: string): Promise<Account> {
    return await this._client._apiCall<Account>({
      path: `/accounts/${accountId}`,
      auth: { token }
    });
  }


  /**
   * List transactions for a specified account.
   * 
   * {@link https://developers.akahu.nz/reference/get_accounts-id-transactions}
   */
  public async listTransactions(
    token: string,
    accountId: string,
    query: TransactionQueryParams = {}
  ): Promise<Paginated<Transaction>> {
    return await this._client._apiCall<Paginated<Transaction>>({
      path: `/accounts/${accountId}/transactions`,
      auth: { token },
      query,
    });
  }

  
  /**
   * Refresh a single account that has been connected by the user associated with the specified `token`.
   * 
   * {@link https://developers.akahu.nz/reference/post_refresh-id}
   */
  public async refresh(token: string, accountId: string): Promise<void> {
    return await this._client._apiCall<void>({
      path: `/refresh/${accountId}`,
      method: 'POST',
      auth: { token }
    });
  }

  /**
   * Refresh all accounts that have been connected by the user associated with the specified `token`.
   * 
   * {@link https://developers.akahu.nz/reference/post_refresh}
   */
  public async refreshAll(token: string): Promise<void> {
    return await this._client._apiCall<void>({
      path: '/refresh',
      method: 'POST',
      auth: { token }
    });
  }
}