/** @category Account */
export { Account } from './accounts';
/** @category Auth */
export { AuthorizationToken } from './auth';
/** @category Connection */
export { Connection } from './connections';
/** @category Identity */
export { IdentityResult } from './identities';
/** @category Payment */
export {
  PaymentStatus,
  Payment,
  PaymentCreateParams,
  PaymentQueryParams
} from './payments';
/** @category Transfer */
export {
  TransferStatus,
  Transfer,
  TransferCreateParams,
  TransferQueryParams,
} from './transfers';
/** @category Transaction */
export {
  TransactionType,
  Transaction,
  UnenrichedTransaction,
  PhysicalOutletAddress,
  WebOutletAddress,
  EnrichedTransaction,
  TransactionQueryParams,
} from './transactions';
/** @category User */
export { User } from './users';
/** @category Webhook */
export {
  WebhookType,
  WebhookStatus,
  Webhook,
  WebhookCreateParams,
  BasePayload,
  CancelledPayload,
  TokenPayload,
  IdentityPayload,
  AccountPayload,
  TransactionPayload,
  TransferPayload,
  PaymentPayload,
  WebhookPayload,
  WebhookEvent,
  WebhookEventQueryParams,
} from './webhooks';


/**
 * A "page" of results returned by paginated API endpoints.
 * 
 * Each page of returned objects is contained in an array nested under the
 * `items` key. This key will contain a list of zero-or-more items. In some
 * cases - even though the page is empty - there may still be further pages
 * available. Because if this it is important to always check the `cursor`.
 * 
 * The cursor pointing to the next page of results can be found nested under
 * `cursor.next`. If there are no further results available, `cursor.next` will
 * be `undefined`. It is important to check explicitly for `undefined` to
 * determine when to break while iterating over mutiple pages, as passing an
 * `undefined` cursor back to the API will cause the first page to be returned,
 * resulting in an infinite loop.
 * 
 * @category Generic
 * */
export type Paginated<T> = {
  items: T[],
  cursor: { next?: string },
}