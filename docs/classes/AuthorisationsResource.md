[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / AuthorisationsResource

# Class: AuthorisationsResource

Utilities for managing Akahu authorisations that have been linked by users.

## Extends

- `BaseResource`

## Methods

### revoke()

> **revoke**(`token`, `authorisationId`): `Promise`\<`void`\>

Revoke a single authorisation from the specified `token`.

After this call the token will no longer have access to the specified authorisation or it's associated data,
including accounts and transactions.

[https://developers.akahu.nz/reference/delete_authorisations-id](https://developers.akahu.nz/reference/delete_authorisations-id)

#### Parameters

• **token**: `string`

• **authorisationId**: `string`

#### Returns

`Promise`\<`void`\>
