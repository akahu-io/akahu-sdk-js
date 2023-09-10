[akahu - v1.14.0](../README.md) / ConnectionsResource

# Class: ConnectionsResource

Utilities to view connections that are available to your app, and refresh
accounts under a given connection.

## Hierarchy

- `BaseResource`

  ↳ **`ConnectionsResource`**

## Table of contents

### Methods

- [list](ConnectionsResource.md#list)
- [get](ConnectionsResource.md#get)
- [refresh](ConnectionsResource.md#refresh)

## Methods

### list

▸ **list**(): `Promise`<[`Connection`](../README.md#connection)[]\>

List all connections that the app has access to.

[https://developers.akahu.nz/reference/get_connections](https://developers.akahu.nz/reference/get_connections)

#### Returns

`Promise`<[`Connection`](../README.md#connection)[]\>

___

### get

▸ **get**(`connectionId`): `Promise`<[`Connection`](../README.md#connection)\>

Get an individual connection detail.

[https://developers.akahu.nz/reference/get_connections-id](https://developers.akahu.nz/reference/get_connections-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `connectionId` | `string` |

#### Returns

`Promise`<[`Connection`](../README.md#connection)\>

___

### refresh

▸ **refresh**(`token`, `connectionId`): `Promise`<`void`\>

Refresh all accounts that are made using the given connection and have been
connected by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/post_refresh-id](https://developers.akahu.nz/reference/post_refresh-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `connectionId` | `string` |

#### Returns

`Promise`<`void`\>
