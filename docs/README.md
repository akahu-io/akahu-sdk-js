akahu - v1.6.0

# akahu - v1.6.0

## Table of contents

### API client config Type aliases

- [AkahuClientConfig](README.md#akahuclientconfig)
- [WebhookCacheConfig](README.md#webhookcacheconfig)

### Account Type aliases

- [Account](README.md#account)

### Auth Type aliases

- [AuthorizationToken](README.md#authorizationtoken)

### Connection Type aliases

- [Connection](README.md#connection)

### Generic Type aliases

- [Paginated](README.md#paginated)
- [Cursor](README.md#cursor)

### Identity Type aliases

- [IdentityResult](README.md#identityresult)

### Other Type aliases

- [Protocol](README.md#protocol)

### Parties Type aliases

- [PartyName](README.md#partyname)
- [PartyDob](README.md#partydob)
- [PartyPhoneNumber](README.md#partyphonenumber)
- [PartyEmail](README.md#partyemail)
- [PartyAddress](README.md#partyaddress)
- [PartyTaxNumber](README.md#partytaxnumber)
- [PartyData](README.md#partydata)

### Payment Type aliases

- [PaymentStatus](README.md#paymentstatus)
- [Payment](README.md#payment)
- [PaymentCreateParams](README.md#paymentcreateparams)
- [IrdPaymentCreateParams](README.md#irdpaymentcreateparams)
- [PaymentQueryParams](README.md#paymentqueryparams)

### Transaction Type aliases

- [TransactionType](README.md#transactiontype)
- [RawTransaction](README.md#rawtransaction)
- [PendingTransaction](README.md#pendingtransaction)
- [PhysicalOutletAddress](README.md#physicaloutletaddress)
- [WebOutletAddress](README.md#weboutletaddress)
- [EnrichedTransaction](README.md#enrichedtransaction)
- [Transaction](README.md#transaction)
- [TransactionQueryParams](README.md#transactionqueryparams)

### Transfer Type aliases

- [TransferStatus](README.md#transferstatus)
- [Transfer](README.md#transfer)
- [TransferCreateParams](README.md#transfercreateparams)
- [TransferQueryParams](README.md#transferqueryparams)

### User Type aliases

- [User](README.md#user)

### Webhook Type aliases

- [WebhookType](README.md#webhooktype)
- [WebhookStatus](README.md#webhookstatus)
- [Webhook](README.md#webhook)
- [WebhookCreateParams](README.md#webhookcreateparams)
- [BasePayload](README.md#basepayload)
- [CancelledPayload](README.md#cancelledpayload)
- [TokenPayload](README.md#tokenpayload)
- [IdentityPayload](README.md#identitypayload)
- [AccountPayload](README.md#accountpayload)
- [TransactionPayload](README.md#transactionpayload)
- [TransferPayload](README.md#transferpayload)
- [PaymentPayload](README.md#paymentpayload)
- [WebhookPayload](README.md#webhookpayload)
- [WebhookEvent](README.md#webhookevent)
- [WebhookEventQueryParams](README.md#webhookeventqueryparams)

### API client Classes

- [AkahuClient](classes/AkahuClient.md)

### Error Classes

- [AkahuErrorResponse](classes/AkahuErrorResponse.md)
- [AkahuWebhookValidationError](classes/AkahuWebhookValidationError.md)

### Resource Classes

- [AccountsResource](classes/AccountsResource.md)
- [AuthResource](classes/AuthResource.md)
- [ConnectionsResource](classes/ConnectionsResource.md)
- [IdentitiesResource](classes/IdentitiesResource.md)
- [PartiesResource](classes/PartiesResource.md)
- [PaymentsResource](classes/PaymentsResource.md)
- [TransactionsResource](classes/TransactionsResource.md)
- [TransfersResource](classes/TransfersResource.md)
- [UsersResource](classes/UsersResource.md)
- [WebhooksResource](classes/WebhooksResource.md)

### API client Interfaces

- [WebhookSigningKeyCache](interfaces/WebhookSigningKeyCache.md)

## API client config Type aliases

### AkahuClientConfig

Ƭ **AkahuClientConfig**: `Object`

Authentication and API endpoint configuration for [AkahuClient](classes/AkahuClient.md).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appToken` | `string` | appToken is required to access the Akahu API. |
| `appSecret?` | `string` | appSecret is only required for completing an OAuth code exchange, or to access app-specific endpoints.  For security reasons, this option must not be used client-side in the browser.  [https://developers.akahu.nz/reference/api_index](https://developers.akahu.nz/reference/api_index)   **`defaultvalue`** `undefined` |
| `apiVersion?` | `ApiVersion` | The Akahu API version. Currently the only supported value is "v1".  **`defaultvalue`** `v1` |
| `protocol?` | [`Protocol`](README.md#protocol) | The protocol used for Akahu API calls. The Akahu API only supports connections over HTTPS, so this option is only useful for test environments etc.  **`defaultvalue`** `https` |
| `host?` | `string` | The Akahu API hostname. It may be useful to override this in staging / testing environments.  **`defaultvalue`** `api.akahu.io` |
| `port?` | `number` | The Akahu API port. It may be useful to override this in staging / testing environments.  **`defaultvalue`** `undefined` |
| `headers?` | `Record`<`string`, `string`\> | Additional headers that will be included in each request. |
| `timeout?` | `number` | Timeout in ms for each request to the Akahu API.  If used in combination with `retries`, the timeout will be applied to each retried request. This means that the total time until an error is thrown due to a timeout will be `timeout * (retries + 1)` milliseconds.   **`defaultvalue`** `0` (no timeout) |
| `retries?` | `number` | The number of times that API requests will be retried in the case of network errors. Error responses from the Akahu API will not result in a retry.  **`defaultvalue`** `0` |
| `proxy?` | `Object` | Optional configuration for an HTTP proxy.  See the proxy section of the axios [request config](https://axios-http.com/docs/req_config) for more details. |
| `proxy.host` | `string` | - |
| `proxy.port` | `number` | - |
| `proxy.auth?` | `Object` | - |
| `proxy.auth.username` | `string` | - |
| `proxy.auth.password` | `string` | - |
| `proxy.protocol?` | `string` | - |

___

### WebhookCacheConfig

Ƭ **WebhookCacheConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cache` | [`WebhookSigningKeyCache`](interfaces/WebhookSigningKeyCache.md) |
| `key` | `string` |
| `maxAgeMs` | `number` |

___

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
| `connection` | [`Connection`](README.md#connection) |
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
| `scope` | `string` |

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

## Generic Type aliases

### Paginated

Ƭ **Paginated**<`T`\>: `Object`

A "page" of results returned by paginated API endpoints.

Each page contains an array of zero-or-more returned objects nested under the
`items` key. In some cases - even if the returned `items` array is empty -
there may still be further pages available. Because if this it is important
to always check the value of `cursor.next` in the response.

The cursor pointing to the next page of results can be found nested under
`cursor.next`. If there are no further results available, `cursor.next` will
be `null`.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |
| `cursor` | `Object` |
| `cursor.next` | `string` \| ``null`` |

___

### Cursor

Ƭ **Cursor**: `string` \| ``null`` \| `undefined`

Convenience type alias, useful when paging through multiple pages of results.

**`example`**
```typescript
import type { Cursor, Transaction } from "akahu";
const transactions: Transaction[] = [];
let cursor: Cursor;

do {
  const page = await akahu.transactions.list(userToken, { cursor });
  transactions.push(...page.items);
  cursor = page.cursor.next;
} while (cursor !== null);
```

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

## Other Type aliases

### Protocol

Ƭ **Protocol**: ``"http"`` \| ``"https"``

___

## Parties Type aliases

### PartyName

Ƭ **PartyName**: `Object`

The user's name as sourced from their connected institution(s).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | The name value in the format provided by the connected institution(s). e.g. John Smith, Mr John Smith, MR JOHN SMITH |
| `sources` | `string`[] | An array of Akahu connection ids indicating the institution(s) from which this data was sourced. When multiple connection ids are present, this indicates that identical values were sourced from multiple institutions and aggregated into this single result. |

___

### PartyDob

Ƭ **PartyDob**: `Object`

The user's date of birth as sourced from their connected institution(s).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | The user's date of birth in the format YYYY-MM-DD. |
| `sources` | `string`[] | An array of Akahu connection ids indicating the institution(s) from which this data was sourced. When multiple connection ids are present, this indicates that identical values were sourced from multiple institutions and aggregated into this single result. |

___

### PartyPhoneNumber

Ƭ **PartyPhoneNumber**: `Object`

The user's phone number as sourced from their connected institution(s).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `subtype` | ``"MOBILE"`` \| ``"HOME"`` \| ``"WORK"`` | - |
| `verified` | `boolean` | - |
| `value` | `string` | The value of the phone number. |
| `sources` | `string`[] | An array of Akahu connection ids indicating the institution(s) from which this data was sourced. When multiple connection ids are present, this indicates that identical values were sourced from multiple institutions and aggregated into this single result. |

___

### PartyEmail

Ƭ **PartyEmail**: `Object`

The user's email address as sourced from their connected institution(s).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `subtype` | ``"PRIMARY"`` | - |
| `verified` | `boolean` | - |
| `value` | `string` | The value of the email address. |
| `sources` | `string`[] | An array of Akahu connection ids indicating the institution(s) from which this data was sourced. When multiple connection ids are present, this indicates that identical values were sourced from multiple institutions and aggregated into this single result. |

___

### PartyAddress

Ƭ **PartyAddress**: `Object`

The user's address as sourced from their connected institution(s).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `subtype` | ``"RESIDENTIAL"`` \| ``"POSTAL"`` | - |
| `value` | `string` | The raw address value from the connected institution. |
| `formatted` | `string` | A consistently formatted/normalised version of the address. |
| `components` | `Object` | Individual components of the normalised address. |
| `components.street` | `string` | - |
| `components.suburb` | `string` | - |
| `components.city` | `string` | - |
| `components.region` | `string` | - |
| `components.postal_code` | `string` | - |
| `components.country` | `string` | - |
| `google_maps_place_id` | `string` | Google Maps API Place ID for this address.  [https://developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id) |
| `sources` | `string`[] | An array of Akahu connection ids indicating the institution(s) from which this data was sourced. When multiple connection ids are present, this indicates that identical values were sourced from multiple institutions and aggregated into this single result. |

___

### PartyTaxNumber

Ƭ **PartyTaxNumber**: `Object`

The user's tax (IRD) number as sourced from their connected institution(s).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `subtype` | ``"PRIMARY"`` | - |
| `value` | `string` | The IRD number in the format XXX-XXX-XXX |
| `sources` | `string`[] | An array of Akahu connection ids indicating the institution(s) from which this data was sourced. When multiple connection ids are present, this indicates that identical values were sourced from multiple institutions and aggregated into this single result. |

___

### PartyData

Ƭ **PartyData**: `Object`

Party data for the user that has been fetched from their connected accounts.

All keys are optional depending on the permissions of your app. However if
your app has permission for a given type of party data (e.g. names), it will
always be included in the response. Note that the array may be empty if no
data of that type is available.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `names?` | [`PartyName`](README.md#partyname)[] |
| `dobs?` | [`PartyDob`](README.md#partydob)[] |
| `phone_numbers?` | [`PartyPhoneNumber`](README.md#partyphonenumber)[] |
| `email_addresses?` | [`PartyEmail`](README.md#partyemail)[] |
| `addresses?` | [`PartyAddress`](README.md#partyaddress)[] |
| `tax_numbers?` | [`PartyTaxNumber`](README.md#partytaxnumber)[] |

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
| `meta.destination.particulars?` | `string` |
| `meta.destination.code?` | `string` |
| `meta.destination.reference?` | `string` |
| `sid` | `string` |
| `status` | [`PaymentStatus`](README.md#paymentstatus) |
| `status_text` | `string` |
| `final` | ``true`` |
| `timeline` | { `status`: [`PaymentStatus`](README.md#paymentstatus) ; `time`: `string` ; `eta?`: `string`  }[] |
| `created_at` | `string` |
| `updated_at` | `string` |
| `received_at?` | `string` |
| `timeout_at?` | `string` |

___

### PaymentCreateParams

Ƭ **PaymentCreateParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | The Akahu account id from which the payment will be made. The `from` account id **must** refer to an account that has been linked by the user for which this request is authenticated.  An account id starts with `acc_...`. |
| `amount` | `number` | The dollar amount for the payment. This must be a numeric value with no more than 2 decimal places. |
| `to` | `Object` | The details of the payee bank account to which the payment will be made. |
| `to.name` | `string` | The payee account holder name |
| `to.account_number` | `string` | The full payee account number. |
| `meta?` | `Object` | Optional metadata to send with the payment. |
| `meta.source?` | `Object` | Metadata which will appear on the payers account statement.  **`remarks`** **Note:** `particulars` is not an accepted field. Akahu reserves this field on the source/payer statement for support and transaction verification. |
| `meta.source.code?` | `string` | - |
| `meta.source.reference?` | `string` | - |
| `meta.destination?` | `Object` | Metadata which will appear on the payees account statement |
| `meta.destination.particulars?` | `string` | - |
| `meta.destination.code?` | `string` | - |
| `meta.destination.reference?` | `string` | - |

___

### IrdPaymentCreateParams

Ƭ **IrdPaymentCreateParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | The Akahu account id from which the payment will be made. The `from` account id **must** refer to an account that has been linked by the user for which this request is authenticated.  An account id starts with `acc_...`. |
| `amount` | `number` | The dollar amount for the payment. This must be a numeric value with no more than 2 decimal places. |
| `meta` | `Object` | Required tax payment metadata to send with the payment. |
| `meta.tax_number` | `string` | The IRD/GST number associated with the payment. |
| `meta.tax_type` | `string` | The 3 character IRD tax type code that tells IRD what type of tax the payment is for. [https://www.ird.govt.nz/managing-my-tax/make-a-payment/choosing-the-right-account-type](https://www.ird.govt.nz/managing-my-tax/make-a-payment/choosing-the-right-account-type) |
| `meta.tax_period?` | `string` | The end date of the tax period which this payment is for, formatted as an ISO 8601 date e.g. 1970-01-01.  This is required by IRD for _most_ tax payments, however there are certain payment types that do not require it (e.g. ARR, KSS, LGL). For the complete list of exclusions see: [https://www.ird.govt.nz/managing-my-tax/make-a-payment/ways-of-paying/paying-electronically](https://www.ird.govt.nz/managing-my-tax/make-a-payment/ways-of-paying/paying-electronically) |

___

### PaymentQueryParams

Ƭ **PaymentQueryParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `string` | The start date of the query as an ISO 8601 string.  **`defaultvalue`** `30 days ago` |
| `end?` | `string` | The end date of the query as an ISO 8601 string.  **`defaultvalue`** `today` |

___

## Transaction Type aliases

### TransactionType

Ƭ **TransactionType**: ``"CREDIT"`` \| ``"DEBIT"`` \| ``"PAYMENT"`` \| ``"TRANSFER"`` \| ``"STANDING ORDER"`` \| ``"EFTPOS"`` \| ``"INTEREST"`` \| ``"FEE"`` \| ``"CREDIT CARD"`` \| ``"TAX"`` \| ``"DIRECT DEBIT"`` \| ``"DIRECT CREDIT"`` \| ``"ATM"`` \| ``"LOAN"``

___

### RawTransaction

Ƭ **RawTransaction**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `_id` | `string` | The unique id for the transaction |
| `_user` | `string` | The unique id of the user that the transaction is associated with. |
| `_account` | `string` | The unique id of the account that the transaction is associated with. |
| `_connection` | `string` | The unique id of the connection that the transaction is associated with. |
| `created_at` | `string` | The time at which the transaction was retrieved by Akahu. Formatted as an ISO 8601 timestamp. |
| `updated_at` | `string` | The time at which the transaction was last updated by Akahu. Formatted as an ISO 8601 timestamp. |
| `date` | `string` | The date that the transaction was posted as reported by the bank integration. Formatted as an ISO 8601 timestamp. |
| `hash` | `string` | An identification string based on the contents of the transaction and the account from which the transaction was fetched.  **`deprecated`** Prefer {@link RawTransaction._id `_id`} to uniquely identify transactions. |
| `description` | `string` | The transaction description as reported by the bank integration. |
| `amount` | `number` | The monetary value of the transaction. |
| `type` | [`TransactionType`](README.md#transactiontype) | The type of the transaction. |
| `balance?` | `number` | The account balance after receipt of this transaction (when available). |

___

### PendingTransaction

Ƭ **PendingTransaction**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `_user` | `string` | The unique id of the user that the pending transaction is associated with. |
| `_account` | `string` | The unique id of the account that the pending transaction is associated with. |
| `_connection` | `string` | The unique id of the account that the pending transaction is associated with. |
| `updated_at` | `string` | The time at which the transaction was updated by Akahu. Formatted as an ISO 8601 timestamp. |
| `date` | `string` | The date that the transaction was posted as reported by the bank integration. Formatted as an ISO 8601 timestamp. |
| `description` | `string` | - |
| `amount` | `number` | - |
| `type` | [`TransactionType`](README.md#transactiontype) | - |

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
| `coordinates.lon` | `number` |
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

Ƭ **EnrichedTransaction**: [`RawTransaction`](README.md#rawtransaction) & { `outlet`: { `_id`: `string` ; `name`: `string` ; `location?`: [`PhysicalOutletAddress`](README.md#physicaloutletaddress) \| [`WebOutletAddress`](README.md#weboutletaddress)  } ; `merchant`: { `_id`: `string` ; `name`: `string`  } ; `category`: { `_id`: `string` ; `components`: { `name`: `string` ; `type`: `string`  }[]  } ; `meta`: { `particulars?`: `string` ; `code?`: `string` ; `reference?`: `string` ; `other_account?`: `string` ; `conversion?`: `string` ; `logo?`: `string`  }  }

___

### Transaction

Ƭ **Transaction**: [`RawTransaction`](README.md#rawtransaction) \| [`EnrichedTransaction`](README.md#enrichedtransaction)

___

### TransactionQueryParams

Ƭ **TransactionQueryParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `string` | The start date of the query as an ISO 8601 string.  **`defaultvalue`** `30 days ago` |
| `end?` | `string` | The end date of the query as an ISO 8601 string.  **`defaultvalue`** `today` |
| `cursor?` | [`Cursor`](README.md#cursor) | The pagination cursor received as part of a previous paginated response.  If this query parameter is omitted, only the first page of transaction results will be retrieved. The cursor to fetch the next page of results can be retrieved from a given `page` of response data, nested under `page.cursor.next`. If this value is `undefined`, it means that the last page has been reached. |

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
| `status` | [`TransferStatus`](README.md#transferstatus) |
| `status_text` | `string` |
| `final` | `boolean` |
| `cross_bank` | `boolean` |
| `timeline` | { `status`: [`TransferStatus`](README.md#transferstatus) ; `time`: `string`  }[] |
| `created_at` | `string` |
| `updated_at` | `string` |

___

### TransferCreateParams

Ƭ **TransferCreateParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `from` | `string` | The Akahu account id from which the transfer will be made. The `from` account id **must** refer to an account that has been linked by the user for which this request is authenticated.  An account id starts with `acc_...`. |
| `to` | `string` | The Akahu account id to which the transfer will be made. The `to` account id **must** refer to an account that has been linked by the user for which this request is authenticated.  An account id starts with `acc_...`. |
| `amount` | `number` | The dollar amount for the transfer. This must be a numeric value with no more than 2 decimal places. |

___

### TransferQueryParams

Ƭ **TransferQueryParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `start?` | `string` | The start date of the query as an ISO 8601 string.  **`defaultvalue`** `30 days ago` |
| `end?` | `string` | The end date of the query as an ISO 8601 string.  **`defaultvalue`** `today` |

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
| `type` | [`WebhookType`](README.md#webhooktype) |
| `state` | `string` |
| `url` | `string` |
| `created_at` | `string` |
| `updated_at` | `string` |
| `last_called_at` | `string` |

___

### WebhookCreateParams

Ƭ **WebhookCreateParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `webhook_type` | [`WebhookType`](README.md#webhooktype) | - |
| `state?` | `string` | The `state` value will be This value should allow you to uniquely iden |

___

### BasePayload

Ƭ **BasePayload**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `webhook_type` | [`WebhookType`](README.md#webhooktype) |
| `webhook_code` | `string` |
| `state` | `string` |

___

### CancelledPayload

Ƭ **CancelledPayload**: [`BasePayload`](README.md#basepayload) & { `webhook_code`: ``"WEBHOOK_CANCELLED"``  }

___

### TokenPayload

Ƭ **TokenPayload**: [`BasePayload`](README.md#basepayload) & { `webhook_type`: ``"TOKEN"`` ; `webhook_code`: ``"DELETE"`` ; `item_id`: `string`  }

___

### IdentityPayload

Ƭ **IdentityPayload**: [`BasePayload`](README.md#basepayload) & { `webhook_type`: ``"IDENTITY"`` ; `webhook_code`: ``"CREATE"`` \| ``"UPDATE"`` \| ``"DELETE"`` ; `item_id`: `string`  }

___

### AccountPayload

Ƭ **AccountPayload**: [`BasePayload`](README.md#basepayload) & { `webhook_type`: ``"ACCOUNT"``  } & { `webhook_code`: ``"CREATE"`` \| ``"DELETE"`` ; `item_id`: `string`  } \| { `webhook_code`: ``"UPDATE"`` ; `item_id`: `string` ; `updated_fields`: `string`[]  }

___

### TransactionPayload

Ƭ **TransactionPayload**: [`BasePayload`](README.md#basepayload) & { `webhook_type`: ``"TRANSACTION"``  } & { `webhook_code`: ``"INITIAL_UPDATE"`` \| ``"DEFAULT_UPDATE"`` ; `item_id`: `string` ; `new_transactions`: `number` ; `new_transaction_ids`: `string`[]  } \| { `webhook_code`: ``"DELETE"`` ; `item_id`: `string` ; `removed_transactions`: `string`[]  }

___

### TransferPayload

Ƭ **TransferPayload**: [`BasePayload`](README.md#basepayload) & { `webhook_type`: ``"TRANSFER"``  } & { `webhook_code`: ``"UPDATE"`` ; `item_id`: `string` ; `status`: [`TransferStatus`](README.md#transferstatus) ; `status_text?`: `string`  } \| { `webhook_code`: ``"RECEIVED"`` ; `item_id`: `string` ; `received_at`: `string`  }

___

### PaymentPayload

Ƭ **PaymentPayload**: [`BasePayload`](README.md#basepayload) & { `webhook_type`: ``"PAYMENT"``  } & { `webhook_code`: ``"UPDATE"`` ; `item_id`: `string` ; `status`: [`TransferStatus`](README.md#transferstatus) ; `status_text?`: `string`  } \| { `webhook_code`: ``"RECEIVED"`` ; `item_id`: `string` ; `received_at`: `string`  }

___

### WebhookPayload

Ƭ **WebhookPayload**: [`CancelledPayload`](README.md#cancelledpayload) \| [`TokenPayload`](README.md#tokenpayload) \| [`IdentityPayload`](README.md#identitypayload) \| [`AccountPayload`](README.md#accountpayload) \| [`TransactionPayload`](README.md#transactionpayload) \| [`TransferPayload`](README.md#transferpayload) \| [`PaymentPayload`](README.md#paymentpayload)

___

### WebhookEvent

Ƭ **WebhookEvent**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `_id` | `string` | The unique identifier for this webhook event. |
| `_hook` | `string` | The unique identifier for this webhook subscription. This can be used with the `unsubscribe` method to remove this webhook subscription if it is no longer required. |
| `status` | [`WebhookStatus`](README.md#webhookstatus) | The delivery status of this webhook event. |
| `payload` | [`WebhookPayload`](README.md#webhookpayload) | The main payload of the webhook event. |
| `created_at` | `string` | The timestamp at which this webhook event was created. |
| `updated_at` | `string` | The timestamp at which this webhook event was last updated. |
| `last_failed_at?` | `string` | If the webhook event has at any point failed to send, the timestamp at which the last attempt was made. |

___

### WebhookEventQueryParams

Ƭ **WebhookEventQueryParams**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `status` | [`WebhookStatus`](README.md#webhookstatus) | **Required:** The webhook delivery status. |
| `start?` | `string` | The start date of the query as an ISO 8601 string.  **`defaultvalue`** `30 days ago` |
| `end?` | `string` | The end date of the query as an ISO 8601 string.  **`defaultvalue`** `today` |
