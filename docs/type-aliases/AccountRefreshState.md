[**akahu v2.5.0**](../README.md) • **Docs**

***

[akahu v2.5.0](../README.md) / AccountRefreshState

# Type alias: AccountRefreshState

> **AccountRefreshState**: `object`

## Type declaration

### balance?

> `optional` **balance**: `string`

The ISO 8601 timestamp when the balance was last retrieved

### meta?

> `optional` **meta**: `string`

The ISO 8601 timestamp when other account metadata was last retrieved (any property apart from balance)

### transactions?

> `optional` **transactions**: `string`

The ISO 8601 timestamp when we last checked for and processed any new transactions. This flag may be missing when an account has first connected, as it takes a few seconds for new transactions to be processed.

### party?

> `optional` **party**: `string`

The ISO 8601 timestamp when we last fetched identity data about the party who has authenticated with the financial institution when connecting this account.
