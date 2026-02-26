export type PaymentPeriodFrequency = "DAILY" | "WEEKLY" | "FORTNIGHTLY" | "MONTHLY" | "ANNUALLY";

/**
 * The periodic payment limit for a consent, e.g. no more than $50 daily
 */
export type PaymentConsentPeriodicLimit = {
  amount: number;
  frequency: PaymentPeriodFrequency;
}

/**
 * The payee details for a payment consent
 */
export type PaymentConsentPayee = {
  /**
   * The holder name of the payee.
   */
  name: string;
  /**
   * The account number of the payee, this will be a BECS formatted account number.
   */
  account_number: string;
};

export type PaymentStatus =
  | "READY"
  | "PENDING_APPROVAL"
  | "PAUSED"
  | "SENT"
  | "DECLINED"
  | "ERROR"
  | "CANCELLED";

export type PaymentStatusCode =
  | "INTERNAL_ERROR"
  | "BANK_ERROR"
  | "UNAVAILABLE"
  | "INVALID_ACCOUNT"
  | "INSUFFICIENT_FUNDS"
  | "SINGLE_LIMIT_EXCEEDED"
  | "DAILY_LIMIT_EXCEEDED"
  | "AKAHU_LIMIT_EXCEEDED"
  | "MFA_UNSUPPORTED"
  | "MULTISIG_UNSUPPORTED"
  | "AUTHENTICATION_FAILED"
  | "MFA_FAILED"
  | "AFTER_HOURS"
  | "USER_CANCELLED"
  | "APP_CANCELLED"
  | "AKAHU_CANCELLED";

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
      particulars?: string;
      code?: string;
      reference?: string;
    };
  };
  sid: string;
  status: PaymentStatus;
  status_code?: PaymentStatusCode;
  status_text?: string;
  approval_type?: "BANK" | "USER";
  final: boolean;
  timeline: {
    status: PaymentStatus;
    time: string;
    eta?: string;
  }[];
  created_at: string;
  updated_at: string;
  received_at?: string;
  /** @deprecated this field is unused */
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
    /**
     * Metadata which will appear on the payers account statement.
     *
     * @remarks
     * **Note:** `particulars` is not an accepted field. Akahu reserves this
     * field on the source/payer statement for support and transaction verification.
     */
    source?: {
      code?: string;
      reference?: string;
    };
    /** Metadata which will appear on the payees account statement */
    destination?: {
      particulars?: string;
      code?: string;
      reference?: string;
    };
  };
};

/**
 * Parameters for initiating a new payment from a bank account to IRD.
 */
export type IrdPaymentCreateParams = {
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
  /** Required tax payment metadata to send with the payment. */
  meta: {
    /** The IRD/GST number associated with the payment. */
    tax_number: string;
    /**
     * The 3 character IRD tax type code that tells IRD what type of tax the
     * payment is for.
     * {@link https://www.ird.govt.nz/managing-my-tax/make-a-payment/choosing-the-right-account-type}
     */
    tax_type: string;
    /**
     * The end date of the tax period which this payment is for, formatted as an
     * ISO 8601 date e.g. 1970-01-01.
     *
     * This is required by IRD for _most_ tax payments, however there are certain
     * payment types that do not require it (e.g. ARR, KSS, LGL). For the complete
     * list of exclusions see:
     * {@link https://www.ird.govt.nz/managing-my-tax/make-a-payment/ways-of-paying/paying-electronically}
     */
    tax_period?: string;
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
