[**akahu v2.0.0**](../README.md) • **Docs**

***

[akahu v2.0.0](../README.md) / WebhookSigningKeyCache

# Interface: WebhookSigningKeyCache

Setter and getter interface to enable external/shared caching of webhook
signing keys.

Accessor functions may be async (by returning a Promise) or sync (by returning a value).

See the project README for example usage.

## Methods

### get()

> **get**(`key`): `null` \| `string` \| `Promise`\<`null` \| `string`\>

#### Parameters

• **key**: `string`

#### Returns

`null` \| `string` \| `Promise`\<`null` \| `string`\>

***

### set()

> **set**(`key`, `value`): `void` \| `Promise`\<`void`\>

#### Parameters

• **key**: `string`

• **value**: `string`

#### Returns

`void` \| `Promise`\<`void`\>
