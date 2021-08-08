import { TransferStatus } from './transfers';

export type WebhookType = 'TOKEN' | 'IDENTITY' | 'ACCOUNT' | 'TRANSACTION' | 'TRANSFER' | 'PAYMENT';
export type WebhookStatus = 'SENT' | 'FAILED' | 'RETRY';

/* An individual webhook subscription */
export type Webhook = {
  _id: string,
  type: WebhookType,
  state: string,
  url: string,
  created_at: string,
  updated_at: string,
  last_called_at: string,
}

export type WebhookCreateParams = {
  webhook_type: WebhookType,
  state?: string,
}

// *Webhook event payloads
export type BasePayload = {
  webhook_type: WebhookType,
  webhook_code: string,
  state: string,
}

// WEBHOOK_CANCELLED
export type CancelledPayload = BasePayload & {
  // Applies to all webhook_types
  webhook_code: 'WEBHOOK_CANCELLED',
};


// TOKEN
export type TokenPayload = BasePayload & {
  webhook_type: 'TOKEN',
  webhook_code: 'DELETE',
  item_id: string,
}

// IDENTITY
type IdentityPayload = BasePayload & {
  webhook_type: 'IDENTITY',
  webhook_code: 'CREATE' | 'UPDATE' | 'DELETE',
  item_id: string,
}

// ACCOUNT
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


// TRANSACTION
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


// TRANSFER
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


// PAYMENT
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


/* Webhook event wrapper object */
export type WebhookEvent = {
  _id: string,
  _user: string,
  _hook: string,
  status: WebhookStatus,
  payload: WebhookPayload,
  created_at: string,
  updated_at: string,
  last_failed_at: string,
}

export type WebhookEventQueryParams = {
  status: WebhookStatus,
  start?: string,
  end?: string,
}