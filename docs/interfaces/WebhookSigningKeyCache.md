[akahu - v1.11.1](../README.md) / WebhookSigningKeyCache

# Interface: WebhookSigningKeyCache

Setter and getter interface to enable external/shared caching of webhook
signing keys.

Accessor functions may be async (by returning a Promise) or sync (by returning a value).

See the project README for example usage.

## Table of contents

### Methods

- [get](WebhookSigningKeyCache.md#get)
- [set](WebhookSigningKeyCache.md#set)

## Methods

### get

▸ **get**(`key`): ``null`` \| `string` \| `Promise`<``null`` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

``null`` \| `string` \| `Promise`<``null`` \| `string`\>

___

### set

▸ **set**(`key`, `value`): `void` \| `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `string` |

#### Returns

`void` \| `Promise`<`void`\>
