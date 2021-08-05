import { TransferStatus } from './transfers';

type WebhookType = 'TOKEN' | 'IDENTITY' | 'ACCOUNT' | 'TRANSACTION' | 'TRANSFER' | 'PAYMENT';
type WebhookStatus = 'SENT' | 'FAILED' | 'RETRY';

/* Individual webhook item */
export interface Webhook {
  _id: string,
  type: WebhookType,
  state: string,
  url: string,
  created_at: string,
  updated_at: string,
  last_called_at: string,
}


export interface WebhookCreateParams {
  webhook_type: WebhookType,
  state?: string,
}


/* Webhook event payloads */
type BasePayload = (
  { success: true }
 | { success: false, error: string }
) & {
  webhook_type: WebhookType,
  webhook_code: string,
  state: string,
  success: boolean,
  error?: string,
}

// WEBHOOK_CANCELLED
type CancelledPayload = BasePayload & {
  // Applies to all webhook_types
  webhook_code: 'WEBHOOK_CANCELLED',
};


// TOKEN
type TokenPayload = BasePayload & {
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
type AccountPayload = BasePayload & {
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
type TransactionPayload = BasePayload & {
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
type TransferPayload = BasePayload & {
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
type PaymentPayload = BasePayload & {
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
type WebhookPayload =
  CancelledPayload
  | TokenPayload
  | IdentityPayload
  | AccountPayload
  | TransactionPayload
  | TransferPayload
  | PaymentPayload;


/* Webhook event wrapper object */
export interface WebhookEvent {
  _id: string,
  _user: string,
  _hook: string,
  status: WebhookStatus,
  payload: WebhookPayload,
  created_at: string,
  updated_at: string,
  last_failed_at: string,

}

export interface WebhookEventQueryParams {
  status: WebhookStatus,
  start?: string,
  end?: string,
}
