export type TransactionType = (
  'CREDIT' |
  'DEBIT' |
  'PAYMENT' |
  'TRANSFER' |
  'STANDING ORDER' |
  'EFTPOS' |
  'INTEREST' |
  'FEE' |
  'CREDIT CARD' |
  'TAX DIRECT DEBIT' |
  'DIRECT CREDIT' |
  'ATM' |
  'LOAN'
);


/**
 * The basic transaction object returned by Akahu.
 */
export type UnenrichedTransaction = {
  _id: string,
  _account: string,
  _connection: string,
  created_at: string,
  updated_at: string,
  date: string,
  hash: string,
  description: string,

  amount: number,
  balance: number,

  type: TransactionType,
}


/**
 * Outlet location information when the outlet has a physical location.
 */
export type PhysicalOutletAddress = {
  pretty: string,

  address?: {
    complete?: string,
    street_number?: string,
    route?: string,
    sub_locality?: string,
    locality?: string,
    country?: string,
    postcode?: string,
  }

  coordinates?: {
    lat: number,
    long: number,
  }

  map_image?: string,
  accuracy?: string,
}

/**
 * Outlet location information when the outlet has a web-only presence.
 */
export type WebOutletAddress = {
  pretty: string,
  url: string,
}

/**
 * A basic transaction with additional enrichment data.
 * 
 * An enriched transaction includes structured data describing the merchant
 * and outlet that were party to the transaction.
 */
export type EnrichedTransaction = UnenrichedTransaction & {
  /** The outlet */
  outlet: { _id: string, name: string, location?: PhysicalOutletAddress | WebOutletAddress },
  merchant: { _id: string, name: string },
  category: { _id: string, components: { name: string, type: string }[] },
  meta: {
    particulars?: string,
    code?: string,
    reference?: string,
    other_account?: string,
    conversion?: string,
    logo?: string,
  },
}

/**
 * A transaction object as returned by the Akahu /transactions endpoint.
 */
export type Transaction = UnenrichedTransaction | EnrichedTransaction;

/**
 * Query parameters that will be used to filter transaction results.
 */
export type TransactionQueryParams = {
  /**
   * The start date of the query as an ISO 8601 string.
   * 
   * @defaultValue `30 days ago`
   */
  start?: string,
  /**
   * The end date of the query as an ISO 8601 string.
   * 
   * @defaultValue `today`
   */
  end?: string,
  /**
   * The pagination cursor received as part of a previous paginated response.
   * 
   * If this query parameter is omitted, only the first page of transaction
   * results will be retreived. The cursor to fetch the next page of results can
   * be retreived from a given `page` of response data, nested under
   * `page.cursor.next`. If this value is `undefined`, it means that the last
   * page has been reached.
   */
  cursor?: string,
}