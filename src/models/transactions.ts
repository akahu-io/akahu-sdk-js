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
   *
   * @remarks
   *
   * **Note:** Transaction ids are **not guaranteed to be stable**. The id of a transaction may
   * change between queries due to internal maintenance operations by Akahu. Because of this, it is
   * recommended that you use {@link RawTransaction.hash `hash`} to uniquely identify individual
   * transactions. It is intended that this behaviour will be resolved in coming updates.
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
   * A unique identification string based on the contents of the transaction and the account from
   * which the transaction was fetched. This property should be used to uniquely identify each
   * transaction in the absence of stable {@link RawTransaction._id `_id`} values.
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
   * The account balance as a result of this transaction.
   */
  balance: number;
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
 * Outlet location information when the outlet has a physical location.
 */
export type PhysicalOutletAddress = {
  pretty: string;

  address?: {
    complete?: string;
    street_number?: string;
    route?: string;
    sub_locality?: string;
    locality?: string;
    country?: string;
    postcode?: string;
  };

  coordinates?: {
    lat: number;
    long: number;
  };

  map_image?: string;
  accuracy?: string;
};

/**
 * Outlet location information when the outlet has a web-only presence.
 */
export type WebOutletAddress = {
  pretty: string;
  url: string;
};

/**
 * A basic transaction with additional enrichment data.
 *
 * An enriched transaction includes structured data describing the merchant
 * and outlet that were party to the transaction.
 */
export type EnrichedTransaction = RawTransaction & {
  outlet: {
    _id: string;
    name: string;
    location?: PhysicalOutletAddress | WebOutletAddress;
  };
  merchant: { _id: string; name: string };
  category: { _id: string; components: { name: string; type: string }[] };
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
