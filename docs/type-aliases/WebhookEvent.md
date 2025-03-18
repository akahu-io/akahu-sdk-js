[**akahu v1.15.3**](../README.md) • **Docs**

***

[akahu v1.15.3](../README.md) / WebhookEvent

# Type alias: WebhookEvent

> **WebhookEvent**: `object`

Metadata about a past webhook event, as retreived from /webhook-events

[https://developers.akahu.nz/reference/get_webhook-events](https://developers.akahu.nz/reference/get_webhook-events)

## Type declaration

### \_id

> **\_id**: `string`

The unique identifier for this webhook event.

### \_hook

> **\_hook**: `string`

The unique identifier for this webhook subscription.
This can be used with the `unsubscribe` method to remove this webhook
subscription if it is no longer required.

### status

> **status**: [`WebhookStatus`](WebhookStatus.md)

The delivery status of this webhook event.

### payload

> **payload**: [`WebhookPayload`](WebhookPayload.md)

The main payload of the webhook event.

### created\_at

> **created\_at**: `string`

The timestamp at which this webhook event was created.

### updated\_at

> **updated\_at**: `string`

The timestamp at which this webhook event was last updated.

### last\_failed\_at?

> `optional` **last\_failed\_at**: `string`

If the webhook event has at any point failed to send, the timestamp at
which the last attempt was made.
