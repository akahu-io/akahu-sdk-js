[akahu - v1.12.0](../README.md) / PaymentsResource

# Class: PaymentsResource

Utilities for managing bank account payments on behalf of users.

[https://developers.akahu.nz/docs/making-a-payment](https://developers.akahu.nz/docs/making-a-payment)

## Hierarchy

- `BaseResource`

  ↳ **`PaymentsResource`**

## Table of contents

### Methods

- [get](PaymentsResource.md#get)
- [list](PaymentsResource.md#list)
- [create](PaymentsResource.md#create)
- [createToIrd](PaymentsResource.md#createtoird)
- [cancel](PaymentsResource.md#cancel)

## Methods

### get

▸ **get**(`token`, `paymentId`): `Promise`<[`Payment`](../README.md#payment)\>

Get a single payment made by the user associated with the specified `token`.

[https://developers.akahu.nz/reference/get_payments-id](https://developers.akahu.nz/reference/get_payments-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `paymentId` | `string` |

#### Returns

`Promise`<[`Payment`](../README.md#payment)\>

___

### list

▸ **list**(`token`, `query?`): `Promise`<[`Payment`](../README.md#payment)[]\>

List all payments made in the provided date range by the user associated
with the specified `token`. Defaults to the last 30 days if no date range
is provided.

[https://developers.akahu.nz/reference/get_payments](https://developers.akahu.nz/reference/get_payments)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `query` | [`PaymentQueryParams`](../README.md#paymentqueryparams) |

#### Returns

`Promise`<[`Payment`](../README.md#payment)[]\>

___

### create

▸ **create**(`token`, `payment`): `Promise`<[`Payment`](../README.md#payment)\>

Initiate a payment to an external bank account on behalf of the user associated
with the specified `token`.

[https://developers.akahu.nz/reference/post_payments](https://developers.akahu.nz/reference/post_payments)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `payment` | [`PaymentCreateParams`](../README.md#paymentcreateparams) |

#### Returns

`Promise`<[`Payment`](../README.md#payment)\>

___

### createToIrd

▸ **createToIrd**(`token`, `payment`): `Promise`<[`Payment`](../README.md#payment)\>

Initiate a payment to the Inland Revenue Department on behalf of the user
associated with the specified `token`.

[https://developers.akahu.nz/reference/post_payments-ird](https://developers.akahu.nz/reference/post_payments-ird)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `payment` | [`IrdPaymentCreateParams`](../README.md#irdpaymentcreateparams) |

#### Returns

`Promise`<[`Payment`](../README.md#payment)\>

___

### cancel

▸ **cancel**(`token`, `paymentId`): `Promise`<`void`\>

Cancel a payment that has a status of `PENDING_APPROVAL`.

[https://developers.akahu.nz/reference/put_payments-id-cancel](https://developers.akahu.nz/reference/put_payments-id-cancel)
[https://developers.akahu.nz/docs/making-a-payment#manual-payment-approval](https://developers.akahu.nz/docs/making-a-payment#manual-payment-approval)

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `paymentId` | `string` |

#### Returns

`Promise`<`void`\>
