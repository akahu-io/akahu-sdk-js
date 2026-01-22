[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / TransfersResource

# Class: TransfersResource

Utilities for managing bank account transfers on behalf of users.

[https://developers.akahu.nz/docs/making-a-transfer](https://developers.akahu.nz/docs/making-a-transfer)

## Extends

- `BaseResource`

## Methods

### get()

> **get**(`token`, `transferId`): `Promise`\<[`Transfer`](../type-aliases/Transfer.md)\>

Get a single transfer made by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_transfers-id](https://developers.akahu.nz/reference/get_transfers-id)

#### Parameters

• **token**: `string`

• **transferId**: `string`

#### Returns

`Promise`\<[`Transfer`](../type-aliases/Transfer.md)\>

***

### list()

> **list**(`token`, `query`): `Promise`\<[`Transfer`](../type-aliases/Transfer.md)[]\>

List all transfers made in the provided date range by the user associated
with the specified `token`. Defaults to the last 30 days if no date range
is provided.

[https://developers.akahu.nz/reference/get_transfers](https://developers.akahu.nz/reference/get_transfers)

#### Parameters

• **token**: `string`

• **query**: [`TransferQueryParams`](../type-aliases/TransferQueryParams.md)= `{}`

#### Returns

`Promise`\<[`Transfer`](../type-aliases/Transfer.md)[]\>

***

### create()

> **create**(`token`, `transfer`, `requestOptions`?): `Promise`\<[`Transfer`](../type-aliases/Transfer.md)\>

Initiate a transfer between two of the users bank accounts.

[https://developers.akahu.nz/reference/post_transfers](https://developers.akahu.nz/reference/post_transfers)

#### Parameters

• **token**: `string`

• **transfer**: [`TransferCreateParams`](../type-aliases/TransferCreateParams.md)

• **requestOptions?**: [`PostRequestOptions`](../type-aliases/PostRequestOptions.md)

#### Returns

`Promise`\<[`Transfer`](../type-aliases/Transfer.md)\>
