[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / PostRequestOptions

# Type alias: PostRequestOptions

> **PostRequestOptions**: `object`

Additional options for a POST request

## Type declaration

### idempotencyKey?

> `optional` **idempotencyKey**: `string`

Specifying this key allows you to safely retry POST requests without the
risk of taking the same action twice. This is useful when an API call is
disrupted in transit and you do not receive a response or you wish to
protect against your application issuing duplicate requests.

#### Default

```ts
auto generated uuid
```
