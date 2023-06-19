export type TransferStatus =
  | "READY"
  | "PENDING_APPROVAL"
  | "SENT"
  | "DECLINED"
  | "ERROR"
  | "PAUSED"
  | "CANCELLED";

/**
 * Transfer object returned by the /transfers endpoint.
 */
export type Transfer = {
  _id: string;
  from: string;
  to: string;
  amount: number;
  sid: string;
  status: TransferStatus;
  status_text?: string;
  final: boolean;
  timeline: { status: TransferStatus; time: string }[];
  created_at: string;
  updated_at: string;
};

/**
 * Parameters for initiating a new bank account transfer using Akahu.
 */
export type TransferCreateParams = {
  /**
   * The Akahu account id from which the transfer will be made. The `from`
   * account id **must** refer to an account that has been linked by the user
   * for which this request is authenticated.
   *
   * An account id starts with `acc_...`.
   */
  from: string;
  /**
   * The Akahu account id to which the transfer will be made. The `to`
   * account id **must** refer to an account that has been linked by the user
   * for which this request is authenticated.
   *
   * An account id starts with `acc_...`.
   */
  to: string;
  /**
   * The dollar amount for the transfer. This must be a numeric value with no more
   * than 2 decimal places.
   */
  amount: number;
};

/**
 * The date range that will be used to filter transfer results.
 */
export type TransferQueryParams = {
  /**
   * The start date of the query as an ISO 8601 string.
   *
   * @defaultValue `30 days ago`
   */
  start?: string;
  /**
   * The end date of the query as an ISO 8601 string.
   *
   * @defaultValue `today`
   */
  end?: string;
};
