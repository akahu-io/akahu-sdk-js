[**akahu v2.4.1**](../README.md) • **Docs**

***

[akahu v2.4.1](../README.md) / AccountBalance

# Type alias: AccountBalance

> **AccountBalance**: `object`

## Type declaration

### currency

> **currency**: `string`

The (3 letter ISO 4217 currency code)[https://www.xe.com/iso4217.php] that this balance is in.

### current

> **current**: `number`

The current account balance.

### available?

> `optional` **available**: `number`

The balance that is currently available to the account holder.

### limit?

> `optional` **limit**: `number`

The credit limit for this account. For example a credit card limit or an overdraft limit. This value is only present when provided directly by the connected financial institution.

### overdrawn?

> `optional` **overdrawn**: `boolean`

A boolean indicating whether this account is in unarranged overdraft.
