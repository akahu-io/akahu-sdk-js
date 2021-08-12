[akahu - v1.0.0](../README.md) / TransactionsResource

# Class: TransactionsResource

Utilities for retrieving bank transactions from connected user accounts.

[https://developers.akahu.nz/docs/accessing-transactional-data](https://developers.akahu.nz/docs/accessing-transactional-data)

## Hierarchy

- `BaseResource`

  ↳ **`TransactionsResource`**

## Table of contents

### Methods

- [list](TransactionsResource.md#list)
- [get](TransactionsResource.md#get)
- [getMany](TransactionsResource.md#getmany)

## Methods

### list

▸ **list**(`token`, `query?`): `Promise`<[`Paginated`](../README.md#paginated)<[`Transaction`](../README.md#transaction)\>\>

List all transactions for all accounts that have been connected by the user associated with the
specified `token`.

[https://developers.akahu.nz/reference/get_transactions](https://developers.akahu.nz/reference/get_transactions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `query` | [`TransactionQueryParams`](../README.md#transactionqueryparams) |

#### Returns

`Promise`<[`Paginated`](../README.md#paginated)<[`Transaction`](../README.md#transaction)\>\>

___

### get

▸ **get**(`token`, `transactionId`): `Promise`<[`Transaction`](../README.md#transaction)\>

Get a single transaction from an account that has been connected by the user associated with
the specified `token`.

[https://developers.akahu.nz/reference/get_transactions-id](https://developers.akahu.nz/reference/get_transactions-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transactionId` | `string` |

#### Returns

`Promise`<[`Transaction`](../README.md#transaction)\>

___

### getMany

▸ **getMany**(`token`, `transactionIds`): `Promise`<[`Transaction`](../README.md#transaction)[]\>

Get multiple transactions by id.

All transactions must belong to the user associated with the specified `token`.

This method may be useful to bulk refresh changed transaction data
in response to a webhook event.

[https://developers.akahu.nz/reference/post_transactions-ids](https://developers.akahu.nz/reference/post_transactions-ids)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transactionIds` | `string`[] |

#### Returns

`Promise`<[`Transaction`](../README.md#transaction)[]\>
