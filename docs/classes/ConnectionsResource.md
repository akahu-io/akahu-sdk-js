[**akahu v2.0.0**](../README.md) • **Docs**

***

[akahu v2.0.0](../README.md) / ConnectionsResource

# Class: ConnectionsResource

Utilities to view connections that are available to your app, and refresh
accounts under a given connection.

## Extends

- `BaseResource`

## Methods

### list()

> **list**(): `Promise`\<[`Connection`](../type-aliases/Connection.md)[]\>

List all connections that the app has access to.

[https://developers.akahu.nz/reference/get_connections](https://developers.akahu.nz/reference/get_connections)

#### Returns

`Promise`\<[`Connection`](../type-aliases/Connection.md)[]\>

***

### get()

> **get**(`connectionId`): `Promise`\<[`Connection`](../type-aliases/Connection.md)\>

Get an individual connection detail.

[https://developers.akahu.nz/reference/get_connections-id](https://developers.akahu.nz/reference/get_connections-id)

#### Parameters

• **connectionId**: `string`

#### Returns

`Promise`\<[`Connection`](../type-aliases/Connection.md)\>

***

### refresh()

> **refresh**(`token`, `connectionId`): `Promise`\<`void`\>

Refresh all accounts that are made using the given connection and have been
connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/post_refresh-id](https://developers.akahu.nz/reference/post_refresh-id)

#### Parameters

• **token**: `string`

• **connectionId**: `string`

#### Returns

`Promise`\<`void`\>
