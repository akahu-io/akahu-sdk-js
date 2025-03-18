[**akahu v1.15.3**](../README.md) • **Docs**

***

[akahu v1.15.3](../README.md) / PartiesResource

# Class: PartiesResource

Fetch identity data relating to the party that the user has logged-in to
their institution as when connecting accounts to Akahu. i.e. the user's
"profile" information at the connected institution.

## Extends

- `BaseResource`

## Methods

### list()

> **list**(`token`): `Promise`\<[`Party`](../type-aliases/Party.md)[]\>

List all parties related to accounts which the user has shared with your
app.

[https://developers.akahu.nz/reference/get_parties](https://developers.akahu.nz/reference/get_parties)

#### Parameters

• **token**: `string`

#### Returns

`Promise`\<[`Party`](../type-aliases/Party.md)[]\>
