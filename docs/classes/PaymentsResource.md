[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / PaymentsResource

# Class: PaymentsResource

Utilities for managing bank account payments on behalf of users.

[https://developers.akahu.nz/docs/making-a-payment](https://developers.akahu.nz/docs/making-a-payment)

## Extends

- `BaseResource`

## Methods

### get()

> **get**(`token`, `paymentId`): `Promise`\<[`Payment`](../type-aliases/Payment.md)\>

Get a single payment made by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_payments-id](https://developers.akahu.nz/reference/get_payments-id)

#### Parameters

• **token**: `string`

• **paymentId**: `string`

#### Returns

`Promise`\<[`Payment`](../type-aliases/Payment.md)\>

***

### list()

> **list**(`token`, `query`): `Promise`\<[`Payment`](../type-aliases/Payment.md)[]\>

List all payments made in the provided date range by the user associated
with the specified `token`. Defaults to the last 30 days if no date range
is provided.

[https://developers.akahu.nz/reference/get_payments](https://developers.akahu.nz/reference/get_payments)

#### Parameters

• **token**: `string`

• **query**: [`PaymentQueryParams`](../type-aliases/PaymentQueryParams.md)= `{}`

#### Returns

`Promise`\<[`Payment`](../type-aliases/Payment.md)[]\>

***

### create()

> **create**(`token`, `payment`, `requestOptions`?): `Promise`\<[`Payment`](../type-aliases/Payment.md)\>

Initiate a payment to an external bank account on behalf of the user associated
with the specified `token`.

[https://developers.akahu.nz/reference/post_payments](https://developers.akahu.nz/reference/post_payments)

#### Parameters

• **token**: `string`

• **payment**: [`PaymentCreateParams`](../type-aliases/PaymentCreateParams.md)

• **requestOptions?**: [`PostRequestOptions`](../type-aliases/PostRequestOptions.md)

#### Returns

`Promise`\<[`Payment`](../type-aliases/Payment.md)\>

***

### createToIrd()

> **createToIrd**(`token`, `payment`, `requestOptions`?): `Promise`\<[`Payment`](../type-aliases/Payment.md)\>

Initiate a payment to the Inland Revenue Department on behalf of the user
associated with the specified `token`.

[https://developers.akahu.nz/reference/post_payments-ird](https://developers.akahu.nz/reference/post_payments-ird)

#### Parameters

• **token**: `string`

• **payment**: [`IrdPaymentCreateParams`](../type-aliases/IrdPaymentCreateParams.md)

• **requestOptions?**: [`PostRequestOptions`](../type-aliases/PostRequestOptions.md)

#### Returns

`Promise`\<[`Payment`](../type-aliases/Payment.md)\>

***

### cancel()

> **cancel**(`token`, `paymentId`): `Promise`\<`void`\>

Cancel a payment that has a status of `PENDING_APPROVAL`.

[https://developers.akahu.nz/reference/put_payments-id-cancel](https://developers.akahu.nz/reference/put_payments-id-cancel)
[https://developers.akahu.nz/docs/making-a-payment#manual-payment-approval](https://developers.akahu.nz/docs/making-a-payment#manual-payment-approval)

#### Parameters

• **token**: `string`

• **paymentId**: `string`

#### Returns

`Promise`\<`void`\>
