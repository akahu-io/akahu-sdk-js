import { BaseResource, Paginated } from './base';
import { Transaction, TransactionQueryParams } from '../models/transactions';


export class TransactionsResource extends BaseResource {
  /**
   * List all transactions for all accounts that have been connected by the user associated with the
   * specified `token`.
   * https://developers.akahu.nz/reference/get_transactions
   */
  public async list(
    token: string,
    query: TransactionQueryParams = {}
  ): Promise<Paginated<Transaction>> {
    return await this._client._apiCall<Paginated<Transaction>>({
      path: 'transactions',
      auth: { token },
      query
    });
  }


  /**
   * Get a single transaction from an account that has been connected by the user associated with
   * the specified `token`.
   * https://developers.akahu.nz/reference/get_transactions-id
   */
  public async get(transactionId: string, token: string): Promise<Transaction> {
    return await this._client._apiCall<Transaction>({
      path: `transactions/${transactionId}`,
      auth: { token }
    });
  }
}