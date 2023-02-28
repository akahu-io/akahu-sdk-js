import { Cursor } from "./generic";

export type TransactionType =
  | "CREDIT"
  | "DEBIT"
  | "PAYMENT"
  | "TRANSFER"
  | "STANDING ORDER"
  | "EFTPOS"
  | "INTEREST"
  | "FEE"
  | "CREDIT CARD"
  | "TAX"
  | "DIRECT DEBIT"
  | "DIRECT CREDIT"
  | "ATM"
  | "LOAN";

/**
 * A raw, unenriched transaction object returned by /transactions
 */
export type RawTransaction = {
  /**
   * The unique id for the transaction
   */
  _id: string;
  /**
   * The unique id of the user that the transaction is associated with.
   */
  _user: string;
  /**
   * The unique id of the account that the transaction is associated with.
   */
  _account: string;
  /**
   * The unique id of the connection that the transaction is associated with.
   */
  _connection: string;
  /**
   * The time at which the transaction was retrieved by Akahu. Formatted as an ISO 8601 timestamp.
   */
  created_at: string;
  /**
   * The time at which the transaction was last updated by Akahu. Formatted as an ISO 8601 timestamp.
   */
  updated_at: string;
  /**
   * The date that the transaction was posted as reported by the bank integration. Formatted as an
   * ISO 8601 timestamp.
   */
  date: string;
  /**
   * An identification string based on the contents of the transaction and the account from
   * which the transaction was fetched.
   *
   * @deprecated Prefer {@link RawTransaction._id `_id`} to uniquely identify transactions.
   */
  hash: string;
  /**
   * The transaction description as reported by the bank integration.
   */
  description: string;
  /**
   * The monetary value of the transaction.
   */
  amount: number;
  /**
   * The account balance after receipt of this transaction (when available).
   */
  balance?: number;
  /**
   * The type of the transaction.
   */
  type: TransactionType;
};

/**
 * A pending transaction as returned by /transactions/pending
 */
export type PendingTransaction = {
  /**
   * The unique id of the user that the pending transaction is associated with.
   */
  _user: string;
  /**
   * The unique id of the account that the pending transaction is associated with.
   */
  _account: string;
  /**
   * The unique id of the account that the pending transaction is associated with.
   */
  _connection: string;
  /**
   * The time at which the transaction was updated by Akahu. Formatted as an ISO 8601 timestamp.
   */
  updated_at: string;
  /**
   * The date that the transaction was posted as reported by the bank integration. Formatted as an
   * ISO 8601 timestamp.
   */
  date: string;
  description: string;

  amount: number;

  type: TransactionType;
};

/**
 * A basic transaction with additional enrichment data.
 *
 * An enriched transaction includes structured data describing the merchant
 * that was party to the transaction.
 */
export type EnrichedTransaction = RawTransaction & {
  merchant: { _id: string; name: string };
  category: {
    _id: string;
    name: string;
    groups: {
      [groupKey: string]: {
        _id: string;
        name: string;
      };
    };
  };
  meta: {
    particulars?: string;
    code?: string;
    reference?: string;
    other_account?: string;
    conversion?: string;
    logo?: string;
  };
};

/**
 * A transaction object as returned by the /transactions endpoint.
 */
export type Transaction = RawTransaction | EnrichedTransaction;

/**
 * Query parameters that will be used to filter transaction results.
 */
export type TransactionQueryParams = {
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
  /**
   * The pagination cursor received as part of a previous paginated response.
   *
   * If this query parameter is omitted, only the first page of transaction
   * results will be retrieved. The cursor to fetch the next page of results can
   * be retrieved from a given `page` of response data, nested under
   * `page.cursor.next`. If this value is `undefined`, it means that the last
   * page has been reached.
   */
  cursor?: Cursor;
};
