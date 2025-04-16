[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / AuthResource

# Class: AuthResource

Utilities for authorizing users using OAuth2.

[https://developers.akahu.nz/docs/authorizing-with-oauth2](https://developers.akahu.nz/docs/authorizing-with-oauth2)

## Extends

- `BaseResource`

## Methods

### buildAuthorizationUrl()

> **buildAuthorizationUrl**(`options`): `string`

Build the OAuth Authorization URL

#### Parameters

• **options**

Options for customising the generated URL.

[https://developers.akahu.nz/docs/authorizing-with-oauth2#the-authorization-request](https://developers.akahu.nz/docs/authorizing-with-oauth2#the-authorization-request)

• **options.redirect\_uri**: `string`

Where to redirect the user once they have accepted or rejected the access request.
This **must** match one of your app's Redirect URIs.

• **options.response\_type?**: `string`

The type of OAuth response. Currently `code` is the only supported option.

**Default**
`code`

• **options.scope?**: `string`

• **options.email?**: `string`

• **options.connection?**: `string`

• **options.state?**: `string`

• **options.protocol?**: [`Protocol`](../type-aliases/Protocol.md)

• **options.host?**: `string`

• **options.port?**: `number`

• **options.path?**: `string`

#### Returns

`string`

***

### exchange()

> **exchange**(`code`, `redirect_uri`, `grant_type`): `Promise`\<[`AuthorizationToken`](../type-aliases/AuthorizationToken.md)\>

Exchange an OAuth authorization code for an access token.

[https://developers.akahu.nz/docs/authorizing-with-oauth2#exchanging-the-authorization-code](https://developers.akahu.nz/docs/authorizing-with-oauth2#exchanging-the-authorization-code)
[https://developers.akahu.nz/reference/post_token](https://developers.akahu.nz/reference/post_token)

#### Parameters

• **code**: `string`

• **redirect\_uri**: `string`

• **grant\_type**: `string`= `"authorization_code"`

#### Returns

`Promise`\<[`AuthorizationToken`](../type-aliases/AuthorizationToken.md)\>

***

### revoke()

> **revoke**(`token`): `Promise`\<`void`\>

Revoke the specified user auth token:

[https://developers.akahu.nz/reference/delete_token](https://developers.akahu.nz/reference/delete_token)

#### Parameters

• **token**: `string`

#### Returns

`Promise`\<`void`\>
