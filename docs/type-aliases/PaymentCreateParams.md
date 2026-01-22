[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / PaymentCreateParams

# Type alias: PaymentCreateParams

> **PaymentCreateParams**: `object`

Parameters for initiating a new bank account payment using Akahu.

## Type declaration

### from

> **from**: `string`

The Akahu account id from which the payment will be made. The `from`
account id **must** refer to an account that has been linked by the user
for which this request is authenticated.

An account id starts with `acc_...`.

### amount

> **amount**: `number`

The dollar amount for the payment. This must be a numeric value with no more
than 2 decimal places.

### to

> **to**: `object`

The details of the payee bank account to which the payment will be made.

### to.name

> **name**: `string`

The payee account holder name

### to.account\_number

> **account\_number**: `string`

The full payee account number.

### meta?

> `optional` **meta**: `object`

Optional metadata to send with the payment.

### meta.source?

> `optional` **source**: `object`

Metadata which will appear on the payers account statement.

#### Remarks

**Note:** `particulars` is not an accepted field. Akahu reserves this
field on the source/payer statement for support and transaction verification.

### meta.source.code?

> `optional` **code**: `string`

### meta.source.reference?

> `optional` **reference**: `string`

### meta.destination?

> `optional` **destination**: `object`

Metadata which will appear on the payees account statement

### meta.destination.particulars?

> `optional` **particulars**: `string`

### meta.destination.code?

> `optional` **code**: `string`

### meta.destination.reference?

> `optional` **reference**: `string`
