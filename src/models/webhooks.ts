import { TransferStatus } from './transfers';

export type WebhookType = 'TOKEN' | 'IDENTITY' | 'ACCOUNT' | 'TRANSACTION' | 'TRANSFER' | 'PAYMENT';
export type WebhookStatus = 'SENT' | 'FAILED' | 'RETRY';

/**
 * Decription of a single webhook subscription.
 */
export type Webhook = {
  _id: string,
  type: WebhookType,
  state: string,
  url: string,
  created_at: string,
  updated_at: string,
  last_called_at: string,
}

/**
 * Parameters used to subscribe to a new webhook event.
 */
export type WebhookCreateParams = {
  webhook_type: WebhookType,
  /**
   * The `state` value will be
   * This value should allow you to uniquely iden
   */
  state?: string,
}

// *Webhook event payloads
export type BasePayload = {
  webhook_type: WebhookType,
  webhook_code: string,
  state: string,
}

/**
 * WEBHOOK_CANCELLED
 * 
 * Webhook payload to indicate that the specified webhook has been cancelled.
 * For example, if the user revokes access to your app.
 */
export type CancelledPayload = BasePayload & {
  // Applies to all webhook_types
  webhook_code: 'WEBHOOK_CANCELLED',
};

/**
 * TOKEN
 * 
 * An event has occurred relating to a user token.
 * 
 * {@link https://developers.akahu.nz/docs/reference-webhooks#token}
 */
export type TokenPayload = BasePayload & {
  webhook_type: 'TOKEN',
  webhook_code: 'DELETE',
  item_id: string,
}

/**
 * IDENTITY
 * 
 * An event has occurred relating to an identity verification request.
 * 
 * {@link https://developers.akahu.nz/docs/reference-webhooks#identity}
 */
export type IdentityPayload = BasePayload & {
  webhook_type: 'IDENTITY',
  webhook_code: 'CREATE' | 'UPDATE' | 'DELETE',
  item_id: string,
}

/**
 * ACCOUNT
 * 
 * An event has occurred relating to a users linked account.
 * 
 * {@link https://developers.akahu.nz/docs/reference-webhooks#account}
 */
export type AccountPayload = BasePayload & {
  webhook_type: 'ACCOUNT',
} & ({
  // CREATE / DELETE events
  webhook_code: 'CREATE' | 'DELETE',
  item_id: string,
} | {
  // UPDATE event
  webhook_code: 'UPDATE',
  item_id: string,
  updated_fields: string[],
});

/**
 * TRANSACTION
 * 
 * An event has occurred relating to transactions on a users linked account.
 * 
 * {@link https://developers.akahu.nz/docs/reference-webhooks#transaction}
 */
export type TransactionPayload = BasePayload & {
  webhook_type: 'TRANSACTION',
} & ({
  // UPDATE events
  webhook_code: 'INITIAL_UPDATE' | 'DEFAULT_UPDATE',
  item_id: string,
  new_transactions: number,
  new_transaction_ids: string[],
} | {
  // DELETE event
  webhook_code: 'DELETE',
  item_id: string,
  removed_transactions: string[],
})

/**
 * TRANSFER
 * 
 * An event has occurred relating to a transfer between a users bank accounts.
 * 
 * {@link https://developers.akahu.nz/docs/reference-webhooks#transfer}
 */
export type TransferPayload = BasePayload & {
  webhook_type: 'TRANSFER',
} & ({
  // UPDATE event
  webhook_code: 'UPDATE',
  item_id: string,
  status: TransferStatus,
  status_text: string,
} | {
  // RECEIVED event
  webhook_code: 'RECEIVED',
  item_id: string,
  received_at: string,
})

/**
 * PAYMENT
 * 
 * An event has occurred relating to a payment from a users linked bank account.
 * 
 * {@link https://developers.akahu.nz/docs/reference-webhooks#payment}
 */
export type PaymentPayload = BasePayload & {
  webhook_type: 'PAYMENT',
} & ({
  // UPDATE event
  webhook_code: 'UPDATE',
  item_id: string,
  status: TransferStatus,
  status_text: string,
} | {
  // RECEIVED event
  webhook_code: 'RECEIVED',
  item_id: string,
  received_at: string,
})

// Combined union type
export type WebhookPayload =
  CancelledPayload
  | TokenPayload
  | IdentityPayload
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
  _id: string,
  /**
   * The unique identifier for this webhook subscription.
   * This can be used with the `unsubscribe` method to remove this webhook
   * subscription if it is no longer required.
   */
  _hook: string,
  /**
   * The delivery status of this webhook event.
   */
  status: WebhookStatus,
  /**
   * The main payload of the webhook event.
   */
  payload: WebhookPayload,
  /**
   * The timestamp at which this webhook event was created.
   */
  created_at: string,
  /**
   * The timestamp at which this webhook event was last updated.
   */
  updated_at: string,
  /**
   * If the webhook event has at any point failed to send, the timestamp at
   * which the last attempt was made.
   */
  last_failed_at?: string,
}

/**
 * Query parameters to filter results from the /webhook-events endpoint.
 */
export type WebhookEventQueryParams = {
  /**
   * **Required:** The webhook delivery status.
   */
  status: WebhookStatus,
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
}