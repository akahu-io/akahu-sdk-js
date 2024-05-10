[**akahu v1.15.3**](../README.md) • **Docs**

***

[akahu v1.15.3](../README.md) / AkahuClientConfig

# Type alias: AkahuClientConfig

> **AkahuClientConfig**: `object`

Authentication and API endpoint configuration for [AkahuClient](../classes/AkahuClient.md).

## Type declaration

### appToken

> **appToken**: `string`

appToken is required to access the Akahu API.

### appSecret?

> `optional` **appSecret**: `string`

appSecret is only required for completing an OAuth code exchange, or to
access app-specific endpoints.

For security reasons, this option must not be used client-side in the browser.

[https://developers.akahu.nz/reference/api_index](https://developers.akahu.nz/reference/api_index)

#### Default Value

`undefined`

### apiVersion?

> `optional` **apiVersion**: `ApiVersion`

The Akahu API version. Currently the only supported value is "v1".

#### Default Value

`v1`

### protocol?

> `optional` **protocol**: [`Protocol`](Protocol.md)

The protocol used for Akahu API calls.
The Akahu API only supports connections over HTTPS, so this option is only
useful for test environments etc.

#### Default Value

`https`

### host?

> `optional` **host**: `string`

The Akahu API hostname.
It may be useful to override this in staging / testing environments.

#### Default Value

`api.akahu.io`

### port?

> `optional` **port**: `number`

The Akahu API port.
It may be useful to override this in staging / testing environments.

#### Default Value

`undefined`

### headers?

> `optional` **headers**: `Record`\<`string`, `string`\>

Additional headers that will be included in each request.

### timeout?

> `optional` **timeout**: `number`

Timeout in ms for each request to the Akahu API.

If used in combination with `retries`, the timeout will be applied to
each retried request. This means that the total time until an error is
thrown due to a timeout will be `timeout * (retries + 1)` milliseconds.

#### Default Value

`0` (no timeout)

### retries?

> `optional` **retries**: `number`

The number of times that API requests will be retried in the case of
network errors. Error responses from the Akahu API will not result in
a retry.

#### Default Value

`0`

### proxy?

> `optional` **proxy**: `object`

Optional configuration for an HTTP proxy.

See the proxy section of the axios [request config](https://axios-http.com/docs/req_config)
for more details.

### proxy.host

> **host**: `string`

### proxy.port

> **port**: `number`

### proxy.auth?

> `optional` **auth**: `object`

### proxy.auth.username

> **username**: `string`

### proxy.auth.password

> **password**: `string`

### proxy.protocol?

> `optional` **protocol**: `string`

### adapter?

> `optional` **adapter**: `AxiosAdapter`

Optional adapter function which will be passed through to the underlying
Axios instance.

See [https://github.com/axios/axios/tree/v1.x/lib/adapters](https://github.com/axios/axios/tree/v1.x/lib/adapters).
