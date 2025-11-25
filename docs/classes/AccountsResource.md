[**akahu v2.3.0**](../README.md) • **Docs**

***

[akahu v2.3.0](../README.md) / AccountsResource

# Class: AccountsResource

Utilities for managing Akahu accounts that have been linked by users.

[https://developers.akahu.nz/docs/accessing-account-data](https://developers.akahu.nz/docs/accessing-account-data)

## Extends

- `BaseResource`

## Methods

### list()

> **list**(`token`): `Promise`\<[`Account`](../type-aliases/Account.md)[]\>

List all accounts that have been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_accounts](https://developers.akahu.nz/reference/get_accounts)

#### Parameters

• **token**: `string`

#### Returns

`Promise`\<[`Account`](../type-aliases/Account.md)[]\>

***

### get()

> **get**(`token`, `accountId`): `Promise`\<[`Account`](../type-aliases/Account.md)\>

Get a single account that has been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_accounts-id](https://developers.akahu.nz/reference/get_accounts-id)

#### Parameters

• **token**: `string`

• **accountId**: `string`

#### Returns

`Promise`\<[`Account`](../type-aliases/Account.md)\>

***

### listTransactions()

> **listTransactions**(`token`, `accountId`, `query`): `Promise`\<[`Paginated`](../type-aliases/Paginated.md)\<[`Transaction`](../type-aliases/Transaction.md)\>\>

List transactions for a specified account.

[https://developers.akahu.nz/reference/get_accounts-id-transactions](https://developers.akahu.nz/reference/get_accounts-id-transactions)

#### Parameters

• **token**: `string`

• **accountId**: `string`

• **query**: [`TransactionQueryParams`](../type-aliases/TransactionQueryParams.md)= `{}`

#### Returns

`Promise`\<[`Paginated`](../type-aliases/Paginated.md)\<[`Transaction`](../type-aliases/Transaction.md)\>\>

***

### listPendingTransactions()

> **listPendingTransactions**(`token`, `accountId`): `Promise`\<[`PendingTransaction`](../type-aliases/PendingTransaction.md)[]\>

List pending transactions for a specified account.

[https://developers.akahu.nz/reference/get_accounts-id-transactions-pending](https://developers.akahu.nz/reference/get_accounts-id-transactions-pending)

#### Parameters

• **token**: `string`

• **accountId**: `string`

#### Returns

`Promise`\<[`PendingTransaction`](../type-aliases/PendingTransaction.md)[]\>

***

### ~~revoke()~~

> **revoke**(`token`, `accountId`): `Promise`\<`void`\>

Revoke a single account from the specified `token`.

After this call the token will no longer have access to the specified account or it's associated data,
including transactions.

[https://developers.akahu.nz/reference/delete_accounts-id](https://developers.akahu.nz/reference/delete_accounts-id)

#### Parameters

• **token**: `string`

• **accountId**: `string`

#### Returns

`Promise`\<`void`\>

#### Deprecated

Use [`authorisations.revoke`](AuthorisationsResource.md#revoke) instead.

***

### refresh()

> **refresh**(`token`, `accountId`): `Promise`\<`void`\>

Refresh a single account that has been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/post_refresh-id](https://developers.akahu.nz/reference/post_refresh-id)

#### Parameters

• **token**: `string`

• **accountId**: `string`

#### Returns

`Promise`\<`void`\>

***

### refreshAll()

> **refreshAll**(`token`): `Promise`\<`void`\>

Refresh all accounts that have been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/post_refresh](https://developers.akahu.nz/reference/post_refresh)

#### Parameters

• **token**: `string`

#### Returns

`Promise`\<`void`\>
