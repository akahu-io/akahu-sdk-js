[**akahu v2.0.0**](../README.md) • **Docs**

***

[akahu v2.0.0](../README.md) / WebhooksResource

# Class: WebhooksResource

Utilities for managing, retrieving, and validating webhooks.

[https://developers.akahu.nz/docs/reference-webhooks](https://developers.akahu.nz/docs/reference-webhooks)

## Extends

- `BaseResource`

## Methods

### list()

> **list**(`token`): `Promise`\<[`Webhook`](../type-aliases/Webhook.md)[]\>

Gets active webhooks for the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_webhooks](https://developers.akahu.nz/reference/get_webhooks)

#### Parameters

• **token**: `string`

#### Returns

`Promise`\<[`Webhook`](../type-aliases/Webhook.md)[]\>

***

### subscribe()

> **subscribe**(`token`, `webhook`, `requestOptions`?): `Promise`\<`string`\>

Subscribe to a webhook.

#### Parameters

• **token**: `string`

• **webhook**: [`WebhookCreateParams`](../type-aliases/WebhookCreateParams.md)

• **requestOptions?**: [`PostRequestOptions`](../type-aliases/PostRequestOptions.md)

#### Returns

`Promise`\<`string`\>

The newly created webhook id.

[https://developers.akahu.nz/reference/post_webhooks](https://developers.akahu.nz/reference/post_webhooks)

***

### unsubscribe()

> **unsubscribe**(`token`, `webhookId`): `Promise`\<`void`\>

Unsubscribe from a previously created webhook.

[https://developers.akahu.nz/reference/delete_webhooks-id](https://developers.akahu.nz/reference/delete_webhooks-id)

#### Parameters

• **token**: `string`

• **webhookId**: `string`

#### Returns

`Promise`\<`void`\>

***

### listEvents()

> **listEvents**(`query`): `Promise`\<[`WebhookEvent`](../type-aliases/WebhookEvent.md)[]\>

List all webhook events with the specified status in the specified date
range (defaults to last 30 days).

[https://developers.akahu.nz/reference/get_webhook-events](https://developers.akahu.nz/reference/get_webhook-events)

#### Parameters

• **query**: [`WebhookEventQueryParams`](../type-aliases/WebhookEventQueryParams.md)

#### Returns

`Promise`\<[`WebhookEvent`](../type-aliases/WebhookEvent.md)[]\>

***

### getPublicKey()

> **getPublicKey**(`keyId`): `Promise`\<`string`\>

Get a webhook signing public-key by id.

[https://developers.akahu.nz/reference/get_keys-id](https://developers.akahu.nz/reference/get_keys-id)

#### Parameters

• **keyId**: `string` \| `number`

#### Returns

`Promise`\<`string`\>

***

### validateWebhook()

> **validateWebhook**(`keyId`, `signature`, `webhookRequestBody`, `cacheConfig`): `Promise`\<[`WebhookPayload`](../type-aliases/WebhookPayload.md)\>

Helper to validate a webhook request payload.

See the project README for example usage.

#### Parameters

• **keyId**: `string` \| `number`

• **signature**: `string`

• **webhookRequestBody**: `string`

• **cacheConfig**: `Partial`\<[`WebhookCacheConfig`](../type-aliases/WebhookCacheConfig.md)\>= `{}`

#### Returns

`Promise`\<[`WebhookPayload`](../type-aliases/WebhookPayload.md)\>

The deserialized webhook payload after successful validation

#### Throws

[AkahuWebhookValidationError](AkahuWebhookValidationError.md)
if validation of the webhook fails due to invalid signature or expired signing key.

#### Throws

[AkahuErrorResponse](AkahuErrorResponse.md)
if the client fails to fetch the specified signing key from the Akahu API.

[https://developers.akahu.nz/docs/reference-webhooks](https://developers.akahu.nz/docs/reference-webhooks)
