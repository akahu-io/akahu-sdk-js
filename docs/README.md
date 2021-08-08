akahu - v0.0.1

# akahu - v0.0.1

## Table of contents

### API client config Type aliases

- [AkahuApiConfig](README.md#akahuapiconfig)
- [AkahuRequestConfig](README.md#akahurequestconfig)
- [WebhookCacheConfig](README.md#webhookcacheconfig)

### API client config Classes

- [AkahuClient](classes/AkahuClient.md)

### Resource Classes

- [AccountsResource](classes/AccountsResource.md)
- [AuthResource](classes/AuthResource.md)
- [ConnectionsResource](classes/ConnectionsResource.md)
- [IdentitiesResource](classes/IdentitiesResource.md)
- [PaymentsResource](classes/PaymentsResource.md)
- [TransactionsResource](classes/TransactionsResource.md)
- [TransfersResource](classes/TransfersResource.md)
- [UsersResource](classes/UsersResource.md)
- [WebhooksResource](classes/WebhooksResource.md)

### Namespaces

- [models](modules/models.md)

### API client Interfaces

- [WebhookKeyCache](interfaces/WebhookKeyCache.md)

## API client config Type aliases

### AkahuApiConfig

Ƭ **AkahuApiConfig**: `Object`

Akahu API and authentication configuration.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `appToken` | `string` | appToken is required to access the Akahu API. |
| `appSecret?` | `string` | appSecret is only required for completing an OAuth code exchange, or to access app-specific endpoints.  For security reasons, this option must not be used client-side in the browser.  [https://developers.akahu.nz/reference/api_index](https://developers.akahu.nz/reference/api_index)   **`defaultvalue`** `undefined` |
| `apiVersion?` | `ApiVersion` | The Akahu API version. Currently the only supported value is "v1".  **`defaultvalue`** `v1` |
| `protocol?` | `Protocol` | The protocol used for Akahu API calls. The Akahu API only supports connections over HTTPS, so this option is only useful for test environments etc.  **`defaultvalue`** `https` |
| `host?` | `string` | The Akahu API hostname. It may be useful to override this in staging / testing enviroments.  **`defaultvalue`** `api.akahu.io` |
| `port?` | `number` | The Akahu API port. It may be useful to override this in staging / testing enviroments.  **`defaultvalue`** `undefined` |

___

### AkahuRequestConfig

Ƭ **AkahuRequestConfig**: `Object`

Config that will be passed though to axios when making API requests.
Only a subset of axios configuration parameters are supported.

[https://axios-http.com/docs/req_config](https://axios-http.com/docs/req_config)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `headers?` | `Record`<`string`, `string`\> |
| `timeout?` | `number` |
| `proxy?` | `Object` |
| `proxy.host` | `string` |
| `proxy.port` | `number` |
| `proxy.auth?` | `Object` |
| `proxy.auth.username` | `string` |
| `proxy.auth.password` | `string` |
| `proxy.protocol?` | `string` |

___

### WebhookCacheConfig

Ƭ **WebhookCacheConfig**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `cache` | [`WebhookKeyCache`](interfaces/WebhookKeyCache.md) |
| `key` | `string` |
| `maxAgeMs` | `number` |
