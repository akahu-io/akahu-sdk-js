import { TransferStatus } from "./transfers";

export type WebhookType =
  | "TOKEN"
  | "ACCOUNT"
  | "TRANSACTION"
  | "TRANSFER"
  | "PAYMENT";
export type WebhookStatus = "SENT" | "FAILED" | "RETRY";

/**
 * Description of a single webhook subscription.
 */
export type Webhook = {
  _id: string;
  type: WebhookType;
  state: string;
  url: string;
  created_at: string;
  updated_at: string;
  last_called_at: string;
};

/**
 * Parameters used to subscribe to a new webhook event.
 */
export type WebhookCreateParams = {
  webhook_type: WebhookType;
  /**
   * The `state` value will be
   * This value should allow you to uniquely iden
   */
  state?: string;
};

// *Webhook event payloads
export type BasePayload = {
  webhook_type: WebhookType;
  webhook_code: string;
  state: string;
};

/**
 * WEBHOOK_CANCELLED
 *
 * Webhook payload to indicate that the specified webhook has been cancelled.
 * For example, if the user revokes access to your app.
 */
export type CancelledPayload = BasePayload & {
  // Applies to all webhook_types
  webhook_code: "WEBHOOK_CANCELLED";
};

export type TokenDeletePayload = BasePayload & {
  webhook_type: "TOKEN";
  webhook_code: "DELETE";
  item_id: string;
};

/**
 * TOKEN
 *
 * An event has occurred relating to a user token.
 *
 * {@link https://developers.akahu.nz/docs/reference-webhooks#token}
 */
export type TokenPayload = TokenDeletePayload;

export type AccountCreatePayload = BasePayload & {
  webhook_type: "ACCOUNT";
  webhook_code: "CREATE";
  /**
   * The account ID that was created.
   */
  item_id: string;
};

export type AccountDeletePayload = BasePayload & {
  webhook_type: "ACCOUNT";
  webhook_code: "DELETE";
  /**
   * The account ID that was deleted.
   */
  item_id: string;
};

export type AccountUpdatePayload = BasePayload & {
  webhook_type: "ACCOUNT";
  webhook_code: "UPDATE";
  /**
   * The account ID that was updated.
   */
  item_id: string;
  /**
   * The fields that were updated on the account.
   */
  updated_fields: string[];
};

export type AccountMigratePayload = BasePayload & {
  webhook_type: "ACCOUNT";
  webhook_code: "MIGRATE";
  /**
   * The old account ID.
   */
  previous_item_id: string;
  /**
   * The new account ID.
   */
  new_item_id: string;
};

/**
 * ACCOUNT
 *
 * An event has occurred relating to a users linked account.
 *
 * {@link https://developers.akahu.nz/docs/reference-webhooks#account}
 */
export type AccountPayload =
  | AccountCreatePayload
  | AccountDeletePayload
  | AccountUpdatePayload
  | AccountMigratePayload;

export type TransactionUpdatePayload = BasePayload & {
  webhook_type: "TRANSACTION";
  webhook_code: "DEFAULT_UPDATE" | "INITIAL_UPDATE";
  /**
   * The account ID that the transactions were updated for.
   */
  item_id: string;
  /**
   * The number of new transactions that are available.
   */
  new_transactions: number;
  /**
   * The IDs of the new transactions that are available.
   */
  new_transaction_ids: string[];
};

export type TransactionDeletePayload = BasePayload & {
  webhook_type: "TRANSACTION";
  webhook_code: "DELETE";
  /**
   * The account ID that the transactions were deleted from.
   */
  item_id: string;
  /**
   * The IDs of the transactions that were removed.
   */
  removed_transactions: string[];
};

/**
 * TRANSACTION
 *
 * An event has occurred relating to transactions on a users linked account.
 *
 * {@link https://developers.akahu.nz/docs/reference-webhooks#transaction}
 */
export type TransactionPayload =
  | TransactionUpdatePayload
  | TransactionDeletePayload;

export type TransferReceivedPayload = BasePayload & {
  webhook_type: "TRANSFER";
  webhook_code: "RECEIVED";
  item_id: string;
  received_at: string;
};

export type TransferUpdatePayload = BasePayload & {
  webhook_type: "TRANSFER";
  webhook_code: "UPDATE";
  item_id: string;
  status: TransferStatus;
  status_text?: string;
};

/**
 * TRANSFER
 *
 * An event has occurred relating to a transfer between a users bank accounts.
 *
 * {@link https://developers.akahu.nz/docs/reference-webhooks#transfer}
 */
export type TransferPayload = TransferReceivedPayload | TransferUpdatePayload;

export type PaymentReceivedPayload = BasePayload & {
  webhook_type: "PAYMENT";
  webhook_code: "RECEIVED";
  item_id: string;
  received_at: string;
};

export type PaymentUpdatePayload = BasePayload & {
  webhook_type: "PAYMENT";
  webhook_code: "UPDATE";
  item_id: string;
  status: TransferStatus;
  status_text?: string;
  status_code?: string;
};

/**
 * PAYMENT
 *
 * An event has occurred relating to a payment from a users linked bank account.
 *
 * {@link https://developers.akahu.nz/docs/reference-webhooks#payment}
 */
export type PaymentPayload = PaymentReceivedPayload | PaymentUpdatePayload;

// Combined union type
export type WebhookPayload =
  | CancelledPayload
  | TokenPayload
  | AccountPayload
  | TransactionPayload
  | TransferPayload
  | PaymentPayload;

/**
 * Metadata about a past webhook event, as retreived from /webhook-events
 *
 * {@link https://developers.akahu.nz/reference/get_webhook-events}
 */
export type WebhookEvent = {
  /**
   * The unique identifier for this webhook event.
   */
  _id: string;
  /**
   * The unique identifier for this webhook subscription.
   * This can be used with the `unsubscribe` method to remove this webhook
   * subscription if it is no longer required.
   */
  _hook: string;
  /**
   * The delivery status of this webhook event.
   */
  status: WebhookStatus;
  /**
   * The main payload of the webhook event.
   */
  payload: WebhookPayload;
  /**
   * The timestamp at which this webhook event was created.
   */
  created_at: string;
  /**
   * The timestamp at which this webhook event was last updated.
   */
  updated_at: string;
  /**
   * If the webhook event has at any point failed to send, the timestamp at
   * which the last attempt was made.
   */
  last_failed_at?: string;
};

/**
 * Query parameters to filter results from the /webhook-events endpoint.
 */
export type WebhookEventQueryParams = {
  /**
   * **Required:** The webhook delivery status.
   */
  status: WebhookStatus;
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
