[akahu - v1.3.0](../README.md) / AuthResource

# Class: AuthResource

Utilities for authorizing users using OAuth2.

[https://developers.akahu.nz/docs/authorizing-with-oauth2](https://developers.akahu.nz/docs/authorizing-with-oauth2)

## Hierarchy

- `BaseResource`

  ↳ **`AuthResource`**

## Table of contents

### Methods

- [buildAuthorizationUrl](AuthResource.md#buildauthorizationurl)
- [exchange](AuthResource.md#exchange)
- [revoke](AuthResource.md#revoke)

## Methods

### buildAuthorizationUrl

▸ **buildAuthorizationUrl**(`options`): `string`

Build the OAuth Authorization URL

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Object` | Options for customising the generated URL.  [https://developers.akahu.nz/docs/authorizing-with-oauth2#the-authorization-request](https://developers.akahu.nz/docs/authorizing-with-oauth2#the-authorization-request) |
| `options.redirect_uri` | `string` | Where to redirect the user once they have accepted or rejected the access request. This **must** match one of your app's Redirect URIs. |
| `options.response_type?` | `string` | The type of OAuth response. Currently `code` is the only supported option.  **`default`** `code` |
| `options.scope?` | `string` | - |
| `options.email?` | `string` | - |
| `options.connection?` | `string` | - |
| `options.state?` | `string` | - |
| `options.protocol?` | [`Protocol`](../README.md#protocol) | - |
| `options.host?` | `string` | - |
| `options.port?` | `number` | - |
| `options.path?` | `string` | - |

#### Returns

`string`

___

### exchange

▸ **exchange**(`code`, `redirect_uri`, `grant_type?`): `Promise`<[`AuthorizationToken`](../README.md#authorizationtoken)\>

Exchange an OAuth authorization code for an access token.

[https://developers.akahu.nz/docs/authorizing-with-oauth2#exchanging-the-authorization-code](https://developers.akahu.nz/docs/authorizing-with-oauth2#exchanging-the-authorization-code)
[https://developers.akahu.nz/reference/post_token](https://developers.akahu.nz/reference/post_token)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `code` | `string` | `undefined` |
| `redirect_uri` | `string` | `undefined` |
| `grant_type` | `string` | `"authorization_code"` |

#### Returns

`Promise`<[`AuthorizationToken`](../README.md#authorizationtoken)\>

___

### revoke

▸ **revoke**(`token`): `Promise`<`void`\>

Revoke the specified user auth token:

[https://developers.akahu.nz/reference/delete_token](https://developers.akahu.nz/reference/delete_token)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<`void`\>
