import { BaseResource } from './base';
import { Transaction, PendingTransaction, TransactionQueryParams, Paginated } from '../models';


/**
 * Utilities for retrieving bank transactions from connected user accounts.
 *
 * {@link https://developers.akahu.nz/docs/accessing-transactional-data}
 *
 * @category Resource
 */
export class TransactionsResource extends BaseResource {
  /**
   * List all transactions for all accounts that have been connected by the user associated with the
   * specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/get_transactions}
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
   * List all pending transactions for all accounts that have been connected by the user associated with the
   * specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/get_transactions-pending}
   */
  public async listPending(token: string): Promise<PendingTransaction[]> {
    // Non-paginated list endpoint of pending transactions
    return await this._client._apiCall<PendingTransaction[]>({
      path: '/transactions/pending',
      auth: { token }
    });
  }

  /**
   * Get a single transaction from an account that has been connected by the user associated with
   * the specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/get_transactions-id}
   */
   public async get(token: string, transactionId: string): Promise<Transaction> {
    return await this._client._apiCall<Transaction>({
      path: `/transactions/${transactionId}`,
      auth: { token }
    });
  }

  /**
   * Get multiple transactions by id.
   *
   * All transactions must belong to the user associated with the specified `token`.
   *
   * This method may be useful to bulk refresh changed transaction data
   * in response to a webhook event.
   *
   * {@link https://developers.akahu.nz/reference/post_transactions-ids}
   */
  public async getMany(token: string, transactionIds: string[]): Promise<Transaction[]> {
    // Non-paginated list endpoint subset by transaction id
    return this._client._apiCall<Transaction[]>({
      path: '/transactions/ids',
      method: 'POST',
      auth: { token },
      data: transactionIds
    });
  }
}
