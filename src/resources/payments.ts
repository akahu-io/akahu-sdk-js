import { BaseResource } from './base';
import { Payment, PaymentCreateParams, PaymentQueryParams } from '@/models';


/**
 * @category Resource
 */
export class PaymentsResource extends BaseResource {
  /**
   * Get a single payment made by the user associated with the specified `token`.
   * https://developers.akahu.nz/reference/get_payments-id
   */
  public async get(token: string, paymentId: string): Promise<Payment> {
    return await this._client._apiCall<Payment>({
      path: `/payments/${paymentId}`,
      auth: { token }
    });
  }


  /**
   * List all payments made in the provided date range by the user associated
   * with the specified `token`. Defaults to the last 30 days if no date range
   * is provided.
   * https://developers.akahu.nz/reference/get_payments
   */
  public async list(token: string, query: PaymentQueryParams = {}): Promise<Payment[]> {
    // List endpoint with optional query params for date range
    return await this._client._apiCall<Payment[]>({
      path: '/payments',
      auth: { token },
      query
    });
  }


  /**
   * Initiate a payment to an external bank account.
   * https://developers.akahu.nz/reference/post_payments
   */
  public async create(token: string, payment: PaymentCreateParams): Promise<Payment> {
    return await this._client._apiCall<Payment>({
      path: '/payments',
      method: 'POST',
      auth: { token },
      data: payment
    });
  }
}