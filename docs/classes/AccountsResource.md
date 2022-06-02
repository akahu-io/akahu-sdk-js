[akahu - v1.6.0](../README.md) / AccountsResource

# Class: AccountsResource

Utilities for managing Akahu accounts that have been linked by users.

[https://developers.akahu.nz/docs/accessing-account-data](https://developers.akahu.nz/docs/accessing-account-data)

## Hierarchy

- `BaseResource`

  ↳ **`AccountsResource`**

## Table of contents

### Methods

- [list](AccountsResource.md#list)
- [get](AccountsResource.md#get)
- [listTransactions](AccountsResource.md#listtransactions)
- [listPendingTransactions](AccountsResource.md#listpendingtransactions)
- [revoke](AccountsResource.md#revoke)
- [refresh](AccountsResource.md#refresh)
- [refreshAll](AccountsResource.md#refreshall)

## Methods

### list

▸ **list**(`token`): `Promise`<[`Account`](../README.md#account)[]\>

List all accounts that have been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_accounts](https://developers.akahu.nz/reference/get_accounts)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<[`Account`](../README.md#account)[]\>

___

### get

▸ **get**(`token`, `accountId`): `Promise`<[`Account`](../README.md#account)\>

Get a single account that has been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_accounts-id](https://developers.akahu.nz/reference/get_accounts-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<[`Account`](../README.md#account)\>

___

### listTransactions

▸ **listTransactions**(`token`, `accountId`, `query?`): `Promise`<[`Paginated`](../README.md#paginated)<[`Transaction`](../README.md#transaction)\>\>

List transactions for a specified account.

[https://developers.akahu.nz/reference/get_accounts-id-transactions](https://developers.akahu.nz/reference/get_accounts-id-transactions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `accountId` | `string` |
| `query` | [`TransactionQueryParams`](../README.md#transactionqueryparams) |

#### Returns

`Promise`<[`Paginated`](../README.md#paginated)<[`Transaction`](../README.md#transaction)\>\>

___

### listPendingTransactions

▸ **listPendingTransactions**(`token`, `accountId`): `Promise`<[`PendingTransaction`](../README.md#pendingtransaction)[]\>

List pending transactions for a specified account.

[https://developers.akahu.nz/reference/get_accounts-id-transactions-pending](https://developers.akahu.nz/reference/get_accounts-id-transactions-pending)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<[`PendingTransaction`](../README.md#pendingtransaction)[]\>

___

### revoke

▸ **revoke**(`token`, `accountId`): `Promise`<`void`\>

Revoke a single account from the specified `token`.

After this call the token will no longer have access to the specified account or it's associated data,
including transactions.

[https://developers.akahu.nz/reference/delete_accounts-id](https://developers.akahu.nz/reference/delete_accounts-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<`void`\>

___

### refresh

▸ **refresh**(`token`, `accountId`): `Promise`<`void`\>

Refresh a single account that has been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/post_refresh-id](https://developers.akahu.nz/reference/post_refresh-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<`void`\>

___

### refreshAll

▸ **refreshAll**(`token`): `Promise`<`void`\>

Refresh all accounts that have been connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/post_refresh](https://developers.akahu.nz/reference/post_refresh)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<`void`\>
