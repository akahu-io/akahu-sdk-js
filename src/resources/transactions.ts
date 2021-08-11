import { BaseResource } from './base';
import { Transaction, TransactionQueryParams, Paginated } from '../models';


/**
 * @category Resource
 */
export class TransactionsResource extends BaseResource {
  /**
   * List all transactions for all accounts that have been connected by the user associated with the
   * specified `token`.
   * https://developers.akahu.nz/reference/get_transactions
   */
  public async list(token: string, query: TransactionQueryParams = {}): Promise<Paginated<Transaction>> {
    // Paginated list endpoint with optional query params for date range & cursor
    return await this._client._apiCall<Paginated<Transaction>>({
      path: '/transactions',
      auth: { token },
      query
    });    
  }

  /**
   * List a subset of transactions - filtered by id - for all accounts that have been connected by
   * the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/post_transactions-ids
   */
  public async listSubset(token: string, transactionIds: string[]): Promise<Transaction[]> {
    // Non-paginated list endpoint subset by transaction id
    return this._client._apiCall<Transaction[]>({
      path: '/transactions/ids',
      method: 'POST',
      auth: { token },
      data: transactionIds
    });
  }

  /**
   * Get a single transaction from an account that has been connected by the user associated with
   * the specified `token`.
   * https://developers.akahu.nz/reference/get_transactions-id
   */
  public async get(token: string, transactionId: string): Promise<Transaction> {
    return await this._client._apiCall<Transaction>({
      path: `/transactions/${transactionId}`,
      auth: { token }
    });
  }
}