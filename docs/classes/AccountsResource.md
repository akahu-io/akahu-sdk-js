[akahu - v0.0.1](../README.md) / AccountsResource

# Class: AccountsResource

## Hierarchy

- `BaseResource`

  ↳ **`AccountsResource`**

## Table of contents

### Methods

- [list](AccountsResource.md#list)
- [get](AccountsResource.md#get)
- [transactions](AccountsResource.md#transactions)
- [refresh](AccountsResource.md#refresh)
- [refreshAll](AccountsResource.md#refreshall)

## Methods

### list

▸ **list**(`token`): `Promise`<[`Account`](../modules/models.md#account)[]\>

List all accounts that have been connected by the user associated with the specified `token`.
https://developers.akahu.nz/reference/get_accounts

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<[`Account`](../modules/models.md#account)[]\>

___

### get

▸ **get**(`token`, `accountId`): `Promise`<[`Account`](../modules/models.md#account)\>

Get a single account that has been connected by the user associated with the specified `token`.
https://developers.akahu.nz/reference/get_accounts-id

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `accountId` | `string` |

#### Returns

`Promise`<[`Account`](../modules/models.md#account)\>

___

### transactions

▸ **transactions**(`token`, `accountId`, `query?`): `Promise`<[`Paginated`](../modules/models.md#paginated)<[`Transaction`](../modules/models.md#transaction)\>\>

List transactions for a specified account.
https://developers.akahu.nz/reference/get_accounts-id-transactions

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `accountId` | `string` |
| `query` | [`TransactionQueryParams`](../modules/models.md#transactionqueryparams) |

#### Returns

`Promise`<[`Paginated`](../modules/models.md#paginated)<[`Transaction`](../modules/models.md#transaction)\>\>

___

### refresh

▸ **refresh**(`token`, `accountId`): `Promise`<`void`\>

Refresh a single account that has been connected by the user associated with the specified `token`.
https://developers.akahu.nz/reference/post_refresh-id

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
https://developers.akahu.nz/reference/post_refresh

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<`void`\>
