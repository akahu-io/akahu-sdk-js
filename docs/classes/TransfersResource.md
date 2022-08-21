[akahu - v1.9.0](../README.md) / TransfersResource

# Class: TransfersResource

Utilities for managing bank account transfers on behalf of users.

[https://developers.akahu.nz/docs/making-a-transfer](https://developers.akahu.nz/docs/making-a-transfer)

## Hierarchy

- `BaseResource`

  ↳ **`TransfersResource`**

## Table of contents

### Methods

- [get](TransfersResource.md#get)
- [list](TransfersResource.md#list)
- [create](TransfersResource.md#create)

## Methods

### get

▸ **get**(`token`, `transferId`): `Promise`<[`Transfer`](../README.md#transfer)\>

Get a single transfer made by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_transfers-id](https://developers.akahu.nz/reference/get_transfers-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transferId` | `string` |

#### Returns

`Promise`<[`Transfer`](../README.md#transfer)\>

___

### list

▸ **list**(`token`, `query?`): `Promise`<[`Transfer`](../README.md#transfer)[]\>

List all transfers made in the provided date range by the user associated
with the specified `token`. Defaults to the last 30 days if no date range
is provided.

[https://developers.akahu.nz/reference/get_transfers](https://developers.akahu.nz/reference/get_transfers)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `query` | [`TransferQueryParams`](../README.md#transferqueryparams) |

#### Returns

`Promise`<[`Transfer`](../README.md#transfer)[]\>

___

### create

▸ **create**(`token`, `transfer`): `Promise`<[`Transfer`](../README.md#transfer)\>

Initiate a transfer between two of the users bank accounts.

[https://developers.akahu.nz/reference/post_transfers](https://developers.akahu.nz/reference/post_transfers)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transfer` | [`TransferCreateParams`](../README.md#transfercreateparams) |

#### Returns

`Promise`<[`Transfer`](../README.md#transfer)\>
