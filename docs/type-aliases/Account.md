[**akahu v1.15.3**](../README.md) • **Docs**

***

[akahu v1.15.3](../README.md) / Account

# Type alias: Account

> **Account**: `object`

Account data returned by Akahu /account endpoints.

## Type declaration

### \_id

> **\_id**: `string`

A unique identifier for the account in the Akahu system. It is always be prefixed by `acc_` so that you can tell that it belongs to an account.

### \_credentials

> **\_credentials**: `string`

When you connect accounts to Akahu you have to log in. Akahu keeps track of all of the accounts in that login session and gives them all a unique `_credentials` key, prefixed by `creds_`.

### connection

> **connection**: [`Connection`](Connection.md)

Information about the financial institution where the account is held (eg. ANZ bank).

### name

> **name**: `string`

The name of this account. If the connection allows customisation, the name will be the custom name (or nickname), eg. "Spending Account". Otherwise Akahu falls back to the product name, eg. "Super Saver".

### status

> **status**: `"ACTIVE"` \| `"INACTIVE"`

This tells you whether Akahu can currently sign in to the account to refresh it's data. It can be one of:

- `ACTIVE` → Akahu can sign in and refresh this account.

- `INACTIVE` → Akahu no longer has access to this account. This may be caused by the user revoking Akahu's access at the institution or changing their login credentials. When an account becomes `INACTIVE` your application should direct the the user back to the OAuth flow or to my.akahu.nz where they will be prompted to to re-establish this connection.

### type

> **type**: `AccountType`

Type of account, Akahu provides specific bank account types, and falls back to more general types for other types of connection.
- `CHECKING` → An everyday spending account.
- `SAVINGS` → A savings account.
- `CREDITCARD` → A credit card.
- `LOAN` → A loan account.
- `KIWISAVER` → A KiwiSaver investment product.
- `INVESTMENT` → A general investment product.
- `TERMDEPOSIT` → A term deposit.
- `FOREIGN` → An account holding a foreign currency.
- `TAX` → An account with tax authorities.
- `REWARDS` → An account for rewards points, e.g. Fly Buys or True Rewards.
- `WALLET` → Available cash for investment or withdrawal from an investment provider.

### attributes

> **attributes**: `AccountAttribute`[]

The list of attributes indicates which abilities an account has. A list of:
- `TRANSACTIONS` → account has transactions and supports retrieval of these via Akahu.
- `TRANSFER_TO` → account can receive transfers from other accounts belonging to same set of credentials.
- `TRANSFER_FROM` → account can initiate transfers to other accounts belonging to the same set of credentials.
- `PAYMENT_TO` → account can receive payments from any Akahu account with the `PAYMENT_FROM` attribute.
- `PAYMENT_FROM` → account can initiate payments to any Akahu account with the `PAYMENT_TO` attribute.

### formatted\_account?

> `optional` **formatted\_account**: `string`

If the account has a well defined account number (eg. a bank account number, or credit card number) this will be defined here with a standard format across connections. Credit cards will have at least 8 digits redacted.

### balance?

> `optional` **balance**: `AccountBalance`

The account balance

### refreshed?

> `optional` **refreshed**: `AccountRefreshState`

Akahu can refresh different parts of an account's data at different rates. The timestamps in the `refreshed` object tell you when that account data was last updated. This can be thought of as "Akahu's view of the account (balance/metadata/transactions) is up to date as of \$TIME".

### meta?

> `optional` **meta**: `AccountMeta`

Metadata regarding this account
