[**akahu v2.6.0**](../README.md) • **Docs**

***

[akahu v2.6.0](../README.md) / PendingTransaction

# Type alias: PendingTransaction

> **PendingTransaction**: `object`

A raw, unenriched pending transaction as returned by /transactions/pending

## Type declaration

### \_user

> **\_user**: `string`

The unique id of the user that the pending transaction is associated with.

### \_account

> **\_account**: `string`

The unique id of the account that the pending transaction is associated with.

### \_connection

> **\_connection**: `string`

The unique id of the account that the pending transaction is associated with.

### updated\_at

> **updated\_at**: `string`

The time at which the transaction was updated by Akahu. Formatted as an ISO 8601 timestamp.

### date

> **date**: `string`

The date that the transaction was posted as reported by the bank integration. Formatted as an
ISO 8601 timestamp.

### description

> **description**: `string`

### amount

> **amount**: `number`

### type

> **type**: [`TransactionType`](TransactionType.md)

### meta?

> `optional` **meta**: `object`

### meta.particulars?

> `optional` **particulars**: `string`

### meta.code?

> `optional` **code**: `string`

### meta.reference?

> `optional` **reference**: `string`

### meta.other\_account?

> `optional` **other\_account**: `string`

### meta.conversion?

> `optional` **conversion**: [`CurrencyConversion`](CurrencyConversion.md)

### meta.card\_suffix?

> `optional` **card\_suffix**: `string`

If this transaction was made with a credit or debit card, this field may
contain the last four digits of the card number.
