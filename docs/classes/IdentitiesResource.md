[akahu - v0.0.1](../README.md) / IdentitiesResource

# Class: IdentitiesResource

## Hierarchy

- `BaseResource`

  ↳ **`IdentitiesResource`**

## Table of contents

### Methods

- [buildAuthorizationUrl](IdentitiesResource.md#buildauthorizationurl)
- [list](IdentitiesResource.md#list)
- [get](IdentitiesResource.md#get)

## Methods

### buildAuthorizationUrl

▸ **buildAuthorizationUrl**(`params`): `string`

Build the Identity OAuth Authorization URL
https://developers.akahu.nz/docs/identity-verification#the-authorization-request

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.redirect_uri` | `string` |
| `params.protocol?` | `Protocol` |
| `params.host?` | `string` |
| `params.port?` | `number` |
| `params.path?` | `string` |
| `params.response_type?` | `string` |
| `params.scope?` | `string` |
| `params.state?` | `string` |

#### Returns

`string`

___

### list

▸ **list**(): `Promise`<[`IdentityResult`](../modules/models.md#identityresult)[]\>

#### Returns

`Promise`<[`IdentityResult`](../modules/models.md#identityresult)[]\>

___

### get

▸ **get**(`code`): `Promise`<[`IdentityResult`](../modules/models.md#identityresult)\>

Retreive an identity result
https://developers.akahu.nz/docs/identity-verification#retrieving-identity-results-with-the-oauth-result-code

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | `string` |

#### Returns

`Promise`<[`IdentityResult`](../modules/models.md#identityresult)\>
