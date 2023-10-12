import { BaseResource } from "./base";
import {
  Payment,
  PaymentCreateParams,
  PaymentQueryParams,
  PostRequestOptions,
} from "../models";
import { IrdPaymentCreateParams } from "../models/payments";

/**
 * Utilities for managing bank account payments on behalf of users.
 *
 * {@link https://developers.akahu.nz/docs/making-a-payment}
 *
 * @category Resource
 */
export class PaymentsResource extends BaseResource {
  /**
   * Get a single payment made by the user associated with the specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/get_payments-id}
   */
  public async get(token: string, paymentId: string): Promise<Payment> {
    return await this._client._apiCall<Payment>({
      path: `/payments/${paymentId}`,
      auth: { token },
    });
  }

  /**
   * List all payments made in the provided date range by the user associated
   * with the specified `token`. Defaults to the last 30 days if no date range
   * is provided.
   *
   * {@link https://developers.akahu.nz/reference/get_payments}
   */
  public async list(
    token: string,
    query: PaymentQueryParams = {}
  ): Promise<Payment[]> {
    // List endpoint with optional query params for date range
    return await this._client._apiCall<Payment[]>({
      path: "/payments",
      auth: { token },
      query,
    });
  }

  /**
   * Initiate a payment to an external bank account on behalf of the user associated
   * with the specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/post_payments}
   */
  public async create(
    token: string,
    payment: PaymentCreateParams,
    requestOptions?: PostRequestOptions
  ): Promise<Payment> {
    return await this._client._apiCall<Payment>({
      path: "/payments",
      method: "POST",
      auth: { token },
      data: payment,
      options: requestOptions,
    });
  }

  /**
   * Initiate a payment to the Inland Revenue Department on behalf of the user
   * associated with the specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/post_payments-ird}
   */
  public async createToIrd(
    token: string,
    payment: IrdPaymentCreateParams,
    requestOptions?: PostRequestOptions
  ): Promise<Payment> {
    return await this._client._apiCall<Payment>({
      path: "/payments/ird",
      method: "POST",
      auth: { token },
      data: payment,
      options: requestOptions,
    });
  }

  /**
   * Cancel a payment that has a status of `PENDING_APPROVAL`.
   *
   * {@link https://developers.akahu.nz/reference/put_payments-id-cancel}
   * {@link https://developers.akahu.nz/docs/making-a-payment#manual-payment-approval}
   */
  public async cancel(token: string, paymentId: string) {
    return this._client._apiCall<void>({
      path: `/payments/${paymentId}`,
      method: "PUT",
      auth: { token },
    });
  }
}
