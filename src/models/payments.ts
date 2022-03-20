export type PaymentStatus =
  | "READY"
  | "PENDING_APPROVAL"
  | "PAUSED"
  | "SENT"
  | "DECLINED"
  | "ERROR"
  | "CANCELLED";

/**
 * Payment object returned by the /payments endpoint.
 */
export type Payment = {
  _id: string;
  from: string;
  to: {
    name: string;
    account_number: string;
  };
  amount: number;
  meta: {
    source: {
      code?: string;
      reference?: string;
    };
    destination: {
      code?: string;
      reference?: string;
    };
  };
  sid: string;
  status: PaymentStatus;
  status_text: string;
  final: true;
  timeline: {
    status: PaymentStatus;
    time: string;
    eta?: string;
  }[];
  created_at: string;
  updated_at: string;
  received_at?: string;
  timeout_at?: string;
};

/**
 * Parameters for initiating a new bank account payment using Akahu.
 */
export type PaymentCreateParams = {
  /**
   * The Akahu account id from which the payment will be made. The `from`
   * account id **must** refer to an account that has been linked by the user
   * for which this request is authenticated.
   *
   * An account id starts with `acc_...`.
   */
  from: string;
  /**
   * The dollar amount for the payment. This must be a numeric value with no more
   * than 2 decimal places.
   */
  amount: number;
  /** The details of the payee bank account to which the payment will be made. */
  to: {
    /** The payee account holder name */
    name: string;
    /** The full payee account number. */
    account_number: string;
  };
  /** Optional metadata to send with the payment. */
  meta?: {
    /** Metadata which will appear on the payers acccount statement. */
    source?: {
      code?: string;
      reference?: string;
    };
    /** Metadata which will appear on the payees account statement */
    destination?: {
      code?: string;
      reference?: string;
    };
  };
};

/**
 * The date range that will be used to filter payment results.
 */
export type PaymentQueryParams = {
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
