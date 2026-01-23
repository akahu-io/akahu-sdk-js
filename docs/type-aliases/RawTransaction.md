[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / RawTransaction

# Type alias: RawTransaction

> **RawTransaction**: `object`

A raw, unenriched transaction object returned by /transactions

## Type declaration

### \_id

> **\_id**: `string`

The unique id for the transaction

### \_user

> **\_user**: `string`

The unique id of the user that the transaction is associated with.

### \_account

> **\_account**: `string`

The unique id of the account that the transaction is associated with.

### \_connection

> **\_connection**: `string`

The unique id of the connection that the transaction is associated with.

### created\_at

> **created\_at**: `string`

The time at which the transaction was retrieved by Akahu. Formatted as an ISO 8601 timestamp.

### updated\_at

> **updated\_at**: `string`

The time at which the transaction was last updated by Akahu. Formatted as an ISO 8601 timestamp.

### date

> **date**: `string`

The date that the transaction was posted as reported by the bank integration. Formatted as an
ISO 8601 timestamp.

### ~~hash~~

> **hash**: `string`

An identification string based on the contents of the transaction and the account from
which the transaction was fetched.

#### Deprecated

Prefer `_id` to uniquely identify transactions.

### description

> **description**: `string`

The transaction description as reported by the bank integration.

### amount

> **amount**: `number`

The monetary value of the transaction.

### type

> **type**: [`TransactionType`](TransactionType.md)

The type of the transaction.

### \_migrated?

> `optional` **\_migrated**: `string`

The unique id of the original transaction that this transaction was migrated from (if part of a migration to official open banking).

### \_migrated\_account?

> `optional` **\_migrated\_account**: `string`

The unique id of the account that this transaction was migrated from (if part of a migration to official open banking).

### balance?

> `optional` **balance**: `number`

The account balance after receipt of this transaction (when available).
