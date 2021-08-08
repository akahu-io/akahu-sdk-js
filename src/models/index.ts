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
  AccountPayload,
  TransactionPayload,
  TransferPayload,
  PaymentPayload,
  WebhookPayload,
  WebhookEvent,
  WebhookEventQueryParams,
} from './webhooks';


/** @category Generic */
export type Paginated<T> = {
  items: T[],
  cursor: { next?: string },
}