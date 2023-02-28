[akahu - v1.11.0](../README.md) / PartiesResource

# Class: PartiesResource

Fetch identity data relating to the party that the user has logged-in to
their institution as when connecting accounts to Akahu. i.e. the user's
"profile" information at the connected institution.

## Hierarchy

- `BaseResource`

  ↳ **`PartiesResource`**

## Table of contents

### Methods

- [list](PartiesResource.md#list)

## Methods

### list

▸ **list**(`token`): `Promise`<[`Party`](../README.md#party)[]\>

List all parties related to accounts which the user has shared with your
app.

[https://developers.akahu.nz/reference/get_parties](https://developers.akahu.nz/reference/get_parties)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<[`Party`](../README.md#party)[]\>
