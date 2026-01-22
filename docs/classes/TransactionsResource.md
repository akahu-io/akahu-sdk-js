[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / TransactionsResource

# Class: TransactionsResource

Utilities for retrieving bank transactions from connected user accounts.

[https://developers.akahu.nz/docs/accessing-transactional-data](https://developers.akahu.nz/docs/accessing-transactional-data)

## Extends

- `BaseResource`

## Methods

### list()

> **list**(`token`, `query`): `Promise`\<[`Paginated`](../type-aliases/Paginated.md)\<[`Transaction`](../type-aliases/Transaction.md)\>\>

List all transactions for all accounts that have been connected by the user associated with the
specified `token`.

[https://developers.akahu.nz/reference/get_transactions](https://developers.akahu.nz/reference/get_transactions)

#### Parameters

• **token**: `string`

• **query**: [`TransactionQueryParams`](../type-aliases/TransactionQueryParams.md)= `{}`

#### Returns

`Promise`\<[`Paginated`](../type-aliases/Paginated.md)\<[`Transaction`](../type-aliases/Transaction.md)\>\>

***

### listPending()

> **listPending**(`token`): `Promise`\<[`PendingTransaction`](../type-aliases/PendingTransaction.md)[]\>

List all pending transactions for all accounts that have been connected by the user associated with the
specified `token`.

[https://developers.akahu.nz/reference/get_transactions-pending](https://developers.akahu.nz/reference/get_transactions-pending)

#### Parameters

• **token**: `string`

#### Returns

`Promise`\<[`PendingTransaction`](../type-aliases/PendingTransaction.md)[]\>

***

### get()

> **get**(`token`, `transactionId`): `Promise`\<[`Transaction`](../type-aliases/Transaction.md)\>

Get a single transaction from an account that has been connected by the user associated with
the specified `token`.

[https://developers.akahu.nz/reference/get_transactions-id](https://developers.akahu.nz/reference/get_transactions-id)

#### Parameters

• **token**: `string`

• **transactionId**: `string`

#### Returns

`Promise`\<[`Transaction`](../type-aliases/Transaction.md)\>

***

### getMany()

> **getMany**(`token`, `transactionIds`): `Promise`\<[`Transaction`](../type-aliases/Transaction.md)[]\>

Get multiple transactions by id.

All transactions must belong to the user associated with the specified `token`.

This method may be useful to bulk refresh changed transaction data
in response to a webhook event.

[https://developers.akahu.nz/reference/post_transactions-ids](https://developers.akahu.nz/reference/post_transactions-ids)

#### Parameters

• **token**: `string`

• **transactionIds**: `string`[]

#### Returns

`Promise`\<[`Transaction`](../type-aliases/Transaction.md)[]\>
