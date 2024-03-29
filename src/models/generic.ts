/**
 * A "page" of results returned by paginated API endpoints.
 *
 * Each page contains an array of zero-or-more returned objects nested under the
 * `items` key. In some cases - even if the returned `items` array is empty -
 * there may still be further pages available. Because if this it is important
 * to always check the value of `cursor.next` in the response.
 *
 * The cursor pointing to the next page of results can be found nested under
 * `cursor.next`. If there are no further results available, `cursor.next` will
 * be `null`.
 *
 * @category Generic
 * */
export type Paginated<T> = {
  items: T[];
  cursor: { next: string | null };
};

/**
 * Convenience type alias, useful when paging through multiple pages of results.
 *
 * @example
 * ```typescript
 * import type { Cursor, Transaction } from "akahu";
 * const transactions: Transaction[] = [];
 * let cursor: Cursor;
 *
 * do {
 *   const page = await akahu.transactions.list(userToken, { cursor });
 *   transactions.push(...page.items);
 *   cursor = page.cursor.next;
 * } while (cursor !== null);
 * ```
 *
 * @category Generic
 */
export type Cursor = string | null | undefined;


/**
 * Additional options for a POST request
 */
export type PostRequestOptions = {
  /**
   * Specifying this key allows you to safely retry POST requests without the
   * risk of taking the same action twice. This is useful when an API call is
   * disrupted in transit and you do not receive a response or you wish to
   * protect against your application issuing duplicate requests.
   *
   * @default auto generated uuid
   */
  idempotencyKey?: string;
}
