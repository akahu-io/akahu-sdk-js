[akahu - v0.0.1](../README.md) / WebhooksResource

# Class: WebhooksResource

Utilities for managing, retreiving, and validating webhooks.

[https://developers.akahu.nz/docs/reference-webhooks](https://developers.akahu.nz/docs/reference-webhooks)

## Hierarchy

- `BaseResource`

  ↳ **`WebhooksResource`**

## Table of contents

### Methods

- [list](WebhooksResource.md#list)
- [subscribe](WebhooksResource.md#subscribe)
- [unsubscribe](WebhooksResource.md#unsubscribe)
- [listEvents](WebhooksResource.md#listevents)
- [getPublicKey](WebhooksResource.md#getpublickey)
- [validateWebhook](WebhooksResource.md#validatewebhook)

## Methods

### list

▸ **list**(`token`): `Promise`<[`Webhook`](../README.md#webhook)[]\>

Gets active webhooks for the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_webhooks](https://developers.akahu.nz/reference/get_webhooks)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |

#### Returns

`Promise`<[`Webhook`](../README.md#webhook)[]\>

___

### subscribe

▸ **subscribe**(`token`, `webhook`): `Promise`<`string`\>

Subscribe to a webhook.

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `webhook` | [`WebhookCreateParams`](../README.md#webhookcreateparams) |

#### Returns

`Promise`<`string`\>

The newly created webhook id.

[https://developers.akahu.nz/reference/post_webhooks](https://developers.akahu.nz/reference/post_webhooks)

___

### unsubscribe

▸ **unsubscribe**(`token`, `webhookId`): `Promise`<`void`\>

Unsubscribe from a previously created webhook.

[https://developers.akahu.nz/reference/delete_webhooks-id](https://developers.akahu.nz/reference/delete_webhooks-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `webhookId` | `string` |

#### Returns

`Promise`<`void`\>

___

### listEvents

▸ **listEvents**(`query`): `Promise`<[`WebhookEvent`](../README.md#webhookevent)[]\>

List all webhook events with the specified status in the specified date
range (defaults to last 30 days).

[https://developers.akahu.nz/reference/get_webhook-events](https://developers.akahu.nz/reference/get_webhook-events)

#### Parameters

| Name | Type |
| :------ | :------ |
| `query` | [`WebhookEventQueryParams`](../README.md#webhookeventqueryparams) |

#### Returns

`Promise`<[`WebhookEvent`](../README.md#webhookevent)[]\>

___

### getPublicKey

▸ **getPublicKey**(`keyId`): `Promise`<`string`\>

Get a webhook signing public-key by id.

[https://developers.akahu.nz/reference/get_keys-id](https://developers.akahu.nz/reference/get_keys-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyId` | `string` \| `number` |

#### Returns

`Promise`<`string`\>

___

### validateWebhook

▸ **validateWebhook**(`keyId`, `signature`, `webhookRequestBody`, `cacheConfig?`): `Promise`<[`WebhookPayload`](../README.md#webhookpayload)\>

Helper to validate a webhook request payload.

See the project README for example usage.

**`throws`** [AkahuWebhookValidationError](AkahuWebhookValidationError.md)
if validation of the webhook fails due to invalid signature or expired signing key.

**`throws`** [AkahuErrorResponse](AkahuErrorResponse.md)
if the client fails to fetch the specified signing key from the Akahu API.

[https://developers.akahu.nz/docs/reference-webhooks](https://developers.akahu.nz/docs/reference-webhooks)

#### Parameters

| Name | Type |
| :------ | :------ |
| `keyId` | `string` \| `number` |
| `signature` | `string` |
| `webhookRequestBody` | `string` |
| `cacheConfig` | `Partial`<[`WebhookCacheConfig`](../README.md#webhookcacheconfig)\> |

#### Returns

`Promise`<[`WebhookPayload`](../README.md#webhookpayload)\>

The deserialized webhook payload after successful validation
