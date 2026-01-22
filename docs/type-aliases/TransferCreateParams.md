[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / TransferCreateParams

# Type alias: TransferCreateParams

> **TransferCreateParams**: `object`

Parameters for initiating a new bank account transfer using Akahu.

## Type declaration

### from

> **from**: `string`

The Akahu account id from which the transfer will be made. The `from`
account id **must** refer to an account that has been linked by the user
for which this request is authenticated.

An account id starts with `acc_...`.

### to

> **to**: `string`

The Akahu account id to which the transfer will be made. The `to`
account id **must** refer to an account that has been linked by the user
for which this request is authenticated.

An account id starts with `acc_...`.

### amount

> **amount**: `number`

The dollar amount for the transfer. This must be a numeric value with no more
than 2 decimal places.
