[akahu - v0.0.1](../README.md) / models

# Namespace: models

## Table of contents

### Account Type aliases

- [Account](models.md#account)

### Auth Type aliases

- [AuthorizationToken](models.md#authorizationtoken)

### Connection Type aliases

- [Connection](models.md#connection)

### Identity Type aliases

- [IdentityResult](models.md#identityresult)

### Payment Type aliases

- [PaymentStatus](models.md#paymentstatus)
- [Payment](models.md#payment)
- [PaymentCreateParams](models.md#paymentcreateparams)
- [PaymentQueryParams](models.md#paymentqueryparams)

### Transaction Type aliases

- [TransactionType](models.md#transactiontype)
- [UnenrichedTransaction](models.md#unenrichedtransaction)
- [PhysicalOutletAddress](models.md#physicaloutletaddress)
- [WebOutletAddress](models.md#weboutletaddress)
- [EnrichedTransaction](models.md#enrichedtransaction)
- [Transaction](models.md#transaction)
- [TransactionQueryParams](models.md#transactionqueryparams)

### Transfer Type aliases

- [TransferStatus](models.md#transferstatus)
- [Transfer](models.md#transfer)
- [TransferCreateParams](models.md#transfercreateparams)
- [TransferQueryParams](models.md#transferqueryparams)

### User Type aliases

- [User](models.md#user)

### Webhook Type aliases

- [WebhookType](models.md#webhooktype)
- [WebhookStatus](models.md#webhookstatus)
- [Webhook](models.md#webhook)
- [WebhookCreateParams](models.md#webhookcreateparams)
- [BasePayload](models.md#basepayload)
- [CancelledPayload](models.md#cancelledpayload)
- [TokenPayload](models.md#tokenpayload)
- [AccountPayload](models.md#accountpayload)
- [TransactionPayload](models.md#transactionpayload)
- [TransferPayload](models.md#transferpayload)
- [PaymentPayload](models.md#paymentpayload)
- [WebhookPayload](models.md#webhookpayload)
- [WebhookEvent](models.md#webhookevent)
- [WebhookEventQueryParams](models.md#webhookeventqueryparams)

## Account Type aliases

### Account

Ƭ **Account**: `Object`

#### Index signature

▪ [k: `string`]: `any`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `_credentials` | `string` |
| `connection` | [`Connection`](models.md#connection) |
| `name` | `string` |
| `status` | ``"ACTIVE"`` \| ``"PENDING"`` \| ``"INACTIVE"`` |
| `formatted_account` | `string` |
| `type` | `string` |
| `balance?` | `Object` |
| `balance.current` | `number` |
| `balance.available` | `number` |
| `balance.limit` | `number` |
| `balance.currency` | `string` |
| `balance.overdrawn` | `boolean` |
| `balance.updated_at` | `string` |
| `attributes?` | (``"PAYMENT_TO"`` \| ``"PAYMENT_FROM"`` \| ``"TRANSFER_TO"`` \| ``"TRANSFER_FROM"`` \| ``"TRANSACTIONS"``)[] |
| `branch?` | `Object` |
| `branch.name` | `string` |
| `branch.description?` | `string` |
| `branch.phone?` | `string` |
| `branch.address?` | `Record`<`string`, `string`\> |
| `refreshed?` | `Object` |
| `refreshed.balance?` | `string` |
| `refreshed.transactions?` | `string` |
| `refreshed.meta?` | `string` |
| `meta?` | `Record`<`string`, `any`\> |

___

## Auth Type aliases

### AuthorizationToken

Ƭ **AuthorizationToken**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `access_token` | `string` |
| `token_type` | ``"bearer"`` |
| `expires_in` | `number` |
| `scopes` | `string` |

___

## Connection Type aliases

### Connection

Ƭ **Connection**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `name` | `string` |
| `logo` | `string` |

___

## Identity Type aliases

### IdentityResult

Ƭ **IdentityResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `status` | ``"PROCESSING"`` \| ``"COMPLETE"`` \| ``"REVIEW"`` \| ``"ERROR"`` |
| `created_at` | `string` |
| `updated_at` | `string` |
| `expires_at` | `string` |
| `source` | `Record`<`string`, `any`\> |
| `errors?` | `string`[] |
| `identities?` | `Record`<`string`, `any`\>[] |
| `addresses?` | `Record`<`string`, `any`\>[] |
| `accounts?` | `Record`<`string`, `any`\>[] |

___

## Payment Type aliases

### PaymentStatus

Ƭ **PaymentStatus**: ``"READY"`` \| ``"PENDING_APPROVAL"`` \| ``"PAUSED"`` \| ``"SENT"`` \| ``"DECLINED"`` \| ``"ERROR"`` \| ``"CANCELLED"``

___

### Payment

Ƭ **Payment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `from` | `string` |
| `to` | `Object` |
| `to.name` | `string` |
| `to.account_number` | `string` |
| `amount` | `number` |
| `meta` | `Object` |
| `meta.source` | `Object` |
| `meta.source.code?` | `string` |
| `meta.source.reference?` | `string` |
| `meta.destination` | `Object` |
| `meta.destination.code?` | `string` |
| `meta.destination.reference?` | `string` |
| `sid` | `string` |
| `status` | [`PaymentStatus`](models.md#paymentstatus) |
| `status_text` | `string` |
| `final` | ``true`` |
| `timeline` | { `status`: [`PaymentStatus`](models.md#paymentstatus) ; `time`: `string` ; `eta?`: `string`  }[] |
| `created_at` | `string` |
| `updated_at` | `string` |

___

### PaymentCreateParams

Ƭ **PaymentCreateParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | `string` |
| `amount` | `number` |
| `to` | `Object` |
| `to.name` | `string` |
| `to.account_number` | `string` |
| `meta?` | `Object` |
| `meta.source?` | `Object` |
| `meta.source.code?` | `string` |
| `meta.source.reference?` | `string` |
| `meta.destination?` | `Object` |
| `meta.destination.code?` | `string` |
| `meta.destination.reference?` | `string` |

___

### PaymentQueryParams

Ƭ **PaymentQueryParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `start?` | `string` |
| `end?` | `string` |

___

## Transaction Type aliases

### TransactionType

Ƭ **TransactionType**: ``"CREDIT"`` \| ``"DEBIT"`` \| ``"PAYMENT"`` \| ``"TRANSFER"`` \| ``"STANDING ORDER"`` \| ``"EFTPOS"`` \| ``"INTEREST"`` \| ``"FEE"`` \| ``"CREDIT CARD"`` \| ``"TAX DIRECT DEBIT"`` \| ``"DIRECT CREDIT"`` \| ``"ATM"`` \| ``"LOAN"``

___

### UnenrichedTransaction

Ƭ **UnenrichedTransaction**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `_account` | `string` |
| `_connection` | `string` |
| `created_at` | `string` |
| `updated_at` | `string` |
| `date` | `string` |
| `hash` | `string` |
| `description` | `string` |
| `amount` | `number` |
| `balance` | `number` |
| `type` | [`TransactionType`](models.md#transactiontype) |

___

### PhysicalOutletAddress

Ƭ **PhysicalOutletAddress**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pretty` | `string` |
| `address?` | `Object` |
| `address.complete?` | `string` |
| `address.street_number?` | `string` |
| `address.route?` | `string` |
| `address.sub_locality?` | `string` |
| `address.locality?` | `string` |
| `address.country?` | `string` |
| `address.postcode?` | `string` |
| `coordinates?` | `Object` |
| `coordinates.lat` | `number` |
| `coordinates.long` | `number` |
| `map_image?` | `string` |
| `accuracy?` | `string` |

___

### WebOutletAddress

Ƭ **WebOutletAddress**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pretty` | `string` |
| `url` | `string` |

___

### EnrichedTransaction

Ƭ **EnrichedTransaction**: [`UnenrichedTransaction`](models.md#unenrichedtransaction) & { `outlet`: { `_id`: `string` ; `name`: `string` ; `location?`: [`PhysicalOutletAddress`](models.md#physicaloutletaddress) \| [`WebOutletAddress`](models.md#weboutletaddress)  } ; `merchant`: { `_id`: `string` ; `name`: `string`  } ; `category`: { `_id`: `string` ; `components`: { `name`: `string` ; `type`: `string`  }[]  } ; `meta`: { `particulars?`: `string` ; `code?`: `string` ; `reference?`: `string` ; `other_account?`: `string` ; `conversion?`: `string` ; `logo?`: `string`  }  }

___

### Transaction

Ƭ **Transaction**: [`UnenrichedTransaction`](models.md#unenrichedtransaction) \| [`EnrichedTransaction`](models.md#enrichedtransaction)

___

### TransactionQueryParams

Ƭ **TransactionQueryParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `start?` | `string` |
| `end?` | `string` |
| `cursor?` | `string` |

___

## Transfer Type aliases

### TransferStatus

Ƭ **TransferStatus**: ``"READY"`` \| ``"PENDING_APPROVAL"`` \| ``"SENT"`` \| ``"RECEIVED"`` \| ``"DECLINED"`` \| ``"ERROR"`` \| ``"PAUSED"`` \| ``"CANCELLED"`` \| ``"SENT_TIMEOUT"`` \| ``"SENT_ERROR"``

___

### Transfer

Ƭ **Transfer**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `from` | `string` |
| `to` | `string` |
| `amount` | `number` |
| `sid` | `string` |
| `status` | [`TransferStatus`](models.md#transferstatus) |
| `status_text` | `string` |
| `final` | `boolean` |
| `cross_bank` | `boolean` |
| `timeline` | { `status`: [`TransferStatus`](models.md#transferstatus) ; `time`: `string`  }[] |
| `created_at` | `string` |
| `updated_at` | `string` |

___

### TransferCreateParams

Ƭ **TransferCreateParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | `string` |
| `to` | `string` |
| `amount` | `number` |

___

### TransferQueryParams

Ƭ **TransferQueryParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `start?` | `string` |
| `end?` | `string` |

___

## User Type aliases

### User

Ƭ **User**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `access_expires_at` | `string` |
| `first_name?` | `string` |
| `last_name?` | `string` |
| `preferred_name?` | `string` |
| `email?` | `string` |
| `mobile?` | `string` |

___

## Webhook Type aliases

### WebhookType

Ƭ **WebhookType**: ``"TOKEN"`` \| ``"IDENTITY"`` \| ``"ACCOUNT"`` \| ``"TRANSACTION"`` \| ``"TRANSFER"`` \| ``"PAYMENT"``

___

### WebhookStatus

Ƭ **WebhookStatus**: ``"SENT"`` \| ``"FAILED"`` \| ``"RETRY"``

___

### Webhook

Ƭ **Webhook**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `type` | [`WebhookType`](models.md#webhooktype) |
| `state` | `string` |
| `url` | `string` |
| `created_at` | `string` |
| `updated_at` | `string` |
| `last_called_at` | `string` |

___

### WebhookCreateParams

Ƭ **WebhookCreateParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `webhook_type` | [`WebhookType`](models.md#webhooktype) |
| `state?` | `string` |

___

### BasePayload

Ƭ **BasePayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `webhook_type` | [`WebhookType`](models.md#webhooktype) |
| `webhook_code` | `string` |
| `state` | `string` |

___

### CancelledPayload

Ƭ **CancelledPayload**: [`BasePayload`](models.md#basepayload) & { `webhook_code`: ``"WEBHOOK_CANCELLED"``  }

___

### TokenPayload

Ƭ **TokenPayload**: [`BasePayload`](models.md#basepayload) & { `webhook_type`: ``"TOKEN"`` ; `webhook_code`: ``"DELETE"`` ; `item_id`: `string`  }

___

### AccountPayload

Ƭ **AccountPayload**: [`BasePayload`](models.md#basepayload) & { `webhook_type`: ``"ACCOUNT"``  } & { `webhook_code`: ``"CREATE"`` \| ``"DELETE"`` ; `item_id`: `string`  } \| { `webhook_code`: ``"UPDATE"`` ; `item_id`: `string` ; `updated_fields`: `string`[]  }

___

### TransactionPayload

Ƭ **TransactionPayload**: [`BasePayload`](models.md#basepayload) & { `webhook_type`: ``"TRANSACTION"``  } & { `webhook_code`: ``"INITIAL_UPDATE"`` \| ``"DEFAULT_UPDATE"`` ; `item_id`: `string` ; `new_transactions`: `number` ; `new_transaction_ids`: `string`[]  } \| { `webhook_code`: ``"DELETE"`` ; `item_id`: `string` ; `removed_transactions`: `string`[]  }

___

### TransferPayload

Ƭ **TransferPayload**: [`BasePayload`](models.md#basepayload) & { `webhook_type`: ``"TRANSFER"``  } & { `webhook_code`: ``"UPDATE"`` ; `item_id`: `string` ; `status`: [`TransferStatus`](models.md#transferstatus) ; `status_text`: `string`  } \| { `webhook_code`: ``"RECEIVED"`` ; `item_id`: `string` ; `received_at`: `string`  }

___

### PaymentPayload

Ƭ **PaymentPayload**: [`BasePayload`](models.md#basepayload) & { `webhook_type`: ``"PAYMENT"``  } & { `webhook_code`: ``"UPDATE"`` ; `item_id`: `string` ; `status`: [`TransferStatus`](models.md#transferstatus) ; `status_text`: `string`  } \| { `webhook_code`: ``"RECEIVED"`` ; `item_id`: `string` ; `received_at`: `string`  }

___

### WebhookPayload

Ƭ **WebhookPayload**: [`CancelledPayload`](models.md#cancelledpayload) \| [`TokenPayload`](models.md#tokenpayload) \| `IdentityPayload` \| [`AccountPayload`](models.md#accountpayload) \| [`TransactionPayload`](models.md#transactionpayload) \| [`TransferPayload`](models.md#transferpayload) \| [`PaymentPayload`](models.md#paymentpayload)

___

### WebhookEvent

Ƭ **WebhookEvent**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `_id` | `string` |
| `_user` | `string` |
| `_hook` | `string` |
| `status` | [`WebhookStatus`](models.md#webhookstatus) |
| `payload` | [`WebhookPayload`](models.md#webhookpayload) |
| `created_at` | `string` |
| `updated_at` | `string` |
| `last_failed_at` | `string` |

___

### WebhookEventQueryParams

Ƭ **WebhookEventQueryParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `status` | [`WebhookStatus`](models.md#webhookstatus) |
| `start?` | `string` |
| `end?` | `string` |
