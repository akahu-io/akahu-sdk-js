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
  items: T[],
  cursor: { next?: string },
}