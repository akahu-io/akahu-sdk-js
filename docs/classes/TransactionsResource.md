[akahu - v0.0.1](../README.md) / TransactionsResource

# Class: TransactionsResource

## Hierarchy

- `BaseResource`

  ↳ **`TransactionsResource`**

## Table of contents

### Methods

- [list](TransactionsResource.md#list)
- [listSubset](TransactionsResource.md#listsubset)
- [get](TransactionsResource.md#get)

## Methods

### list

▸ **list**(`token`, `query?`): `Promise`<[`Paginated`](../interfaces/Paginated.md)<[`Transaction`](../modules/models.md#transaction)\>\>

List all transactions for all accounts that have been connected by the user associated with the
specified `token`.
https://developers.akahu.nz/reference/get_transactions

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `query` | [`TransactionQueryParams`](../modules/models.md#transactionqueryparams) |

#### Returns

`Promise`<[`Paginated`](../interfaces/Paginated.md)<[`Transaction`](../modules/models.md#transaction)\>\>

___

### listSubset

▸ **listSubset**(`token`, `transactionIds`): `Promise`<[`Transaction`](../modules/models.md#transaction)[]\>

List a subset of transactions - filtered by id - for all accounts that have been connected by
the user associated with the specified `token`.
https://developers.akahu.nz/reference/post_transactions-ids

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transactionIds` | `string`[] |

#### Returns

`Promise`<[`Transaction`](../modules/models.md#transaction)[]\>

___

### get

▸ **get**(`token`, `transactionId`): `Promise`<[`Transaction`](../modules/models.md#transaction)\>

Get a single transaction from an account that has been connected by the user associated with
the specified `token`.
https://developers.akahu.nz/reference/get_transactions-id

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transactionId` | `string` |

#### Returns

`Promise`<[`Transaction`](../modules/models.md#transaction)\>
