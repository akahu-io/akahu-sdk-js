[akahu - v0.0.1](../README.md) / TransfersResource

# Class: TransfersResource

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

▸ **get**(`token`, `transferId`): `Promise`<[`Transfer`](../modules/models.md#transfer)\>

Get a single transfer made by the user associated with the specified `token`.
https://developers.akahu.nz/reference/get_transfers-id

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transferId` | `string` |

#### Returns

`Promise`<[`Transfer`](../modules/models.md#transfer)\>

___

### list

▸ **list**(`token`, `query?`): `Promise`<[`Transfer`](../modules/models.md#transfer)\>

List all transfers made in the provided date range by the user associated
with the specified `token`. Defaults to the last 30 days if no date range
is provided.
https://developers.akahu.nz/reference/get_transfers

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `query` | [`TransferQueryParams`](../modules/models.md#transferqueryparams) |

#### Returns

`Promise`<[`Transfer`](../modules/models.md#transfer)\>

___

### create

▸ **create**(`token`, `transfer`): `Promise`<[`Transfer`](../modules/models.md#transfer)\>

Initiate a transfer between two of the user's accounts.
https://developers.akahu.nz/reference/post_transfers

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `transfer` | [`TransferCreateParams`](../modules/models.md#transfercreateparams) |

#### Returns

`Promise`<[`Transfer`](../modules/models.md#transfer)\>
