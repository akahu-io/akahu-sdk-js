[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / IrdPaymentCreateParams

# Type alias: IrdPaymentCreateParams

> **IrdPaymentCreateParams**: `object`

Parameters for initiating a new payment from a bank account to IRD.

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

### meta

> **meta**: `object`

Required tax payment metadata to send with the payment.

### meta.tax\_number

> **tax\_number**: `string`

The IRD/GST number associated with the payment.

### meta.tax\_type

> **tax\_type**: `string`

The 3 character IRD tax type code that tells IRD what type of tax the
payment is for.
[https://www.ird.govt.nz/managing-my-tax/make-a-payment/choosing-the-right-account-type](https://www.ird.govt.nz/managing-my-tax/make-a-payment/choosing-the-right-account-type)

### meta.tax\_period?

> `optional` **tax\_period**: `string`

The end date of the tax period which this payment is for, formatted as an
ISO 8601 date e.g. 1970-01-01.

This is required by IRD for _most_ tax payments, however there are certain
payment types that do not require it (e.g. ARR, KSS, LGL). For the complete
list of exclusions see:
[https://www.ird.govt.nz/managing-my-tax/make-a-payment/ways-of-paying/paying-electronically](https://www.ird.govt.nz/managing-my-tax/make-a-payment/ways-of-paying/paying-electronically)
