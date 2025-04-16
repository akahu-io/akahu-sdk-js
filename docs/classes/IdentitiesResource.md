[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / IdentitiesResource

# Class: IdentitiesResource

Utilities for requesting identity verification using OAuth2.

[https://developers.akahu.nz/docs/identity-verification](https://developers.akahu.nz/docs/identity-verification)

## Extends

- `BaseResource`

## Methods

### buildAuthorizationUrl()

> **buildAuthorizationUrl**(`params`): `string`

Build the Identity OAuth Authorization URL.

[https://developers.akahu.nz/docs/identity-verification#the-authorization-request](https://developers.akahu.nz/docs/identity-verification#the-authorization-request)

#### Parameters

• **params**

• **params.redirect\_uri**: `string`

• **params.protocol?**: [`Protocol`](../type-aliases/Protocol.md)

• **params.host?**: `string`

• **params.port?**: `number`

• **params.path?**: `string`

• **params.response\_type?**: `string`

• **params.scope?**: `string`

• **params.state?**: `string`

#### Returns

`string`

***

### get()

> **get**(`code`): `Promise`\<[`IdentityResult`](../type-aliases/IdentityResult.md)\>

Retrieve an identity result using the code/id returned after successful authorization using the
OAuth identity verification flow.

[https://developers.akahu.nz/docs/identity-verification#retrieving-identity-results-with-the-oauth-result-code](https://developers.akahu.nz/docs/identity-verification#retrieving-identity-results-with-the-oauth-result-code)

#### Parameters

• **code**: `string`

#### Returns

`Promise`\<[`IdentityResult`](../type-aliases/IdentityResult.md)\>

***

### verifyName()

> **verifyName**(`code`, `query`): `Promise`\<[`IdentityVerifyNameResult`](../type-aliases/IdentityVerifyNameResult.md)\>

(**BETA**) Verify the user's name against an identity result.

[https://developers.akahu.nz/docs/oneoff-verify-name](https://developers.akahu.nz/docs/oneoff-verify-name)

#### Parameters

• **code**: `string`

• **query**: [`IdentityVerifyNameQuery`](../type-aliases/IdentityVerifyNameQuery.md)

#### Returns

`Promise`\<[`IdentityVerifyNameResult`](../type-aliases/IdentityVerifyNameResult.md)\>
