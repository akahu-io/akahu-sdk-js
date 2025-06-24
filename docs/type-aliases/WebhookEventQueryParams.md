[**akahu v2.2.0**](../README.md) • **Docs**

***

[akahu v2.2.0](../README.md) / WebhookEventQueryParams

# Type alias: WebhookEventQueryParams

> **WebhookEventQueryParams**: `object`

Query parameters to filter results from the /webhook-events endpoint.

## Type declaration

### status

> **status**: [`WebhookStatus`](WebhookStatus.md)

**Required:** The webhook delivery status.

### start?

> `optional` **start**: `string`

The start date of the query as an ISO 8601 string.

#### Default Value

`30 days ago`

### end?

> `optional` **end**: `string`

The end date of the query as an ISO 8601 string.

#### Default Value

`today`
