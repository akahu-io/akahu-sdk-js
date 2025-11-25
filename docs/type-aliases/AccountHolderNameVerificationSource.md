[**akahu v2.3.0**](../README.md) • **Docs**

***

[akahu v2.3.0](../README.md) / AccountHolderNameVerificationSource

# Type alias: AccountHolderNameVerificationSource

> **AccountHolderNameVerificationSource**: `object`

Name verification match where the source data is the account holder name.

## Type declaration

### type

> **type**: `"HOLDER_NAME"`

### match\_result

> **match\_result**: `"MATCH"` \| `"PARTIAL_MATCH"`

### meta

> **meta**: `object`

Metadata from the matched account

### meta.name

> **name**: `string`

The account name

### meta.holder

> **holder**: `string`

The account holder name

### meta.account\_number

> **account\_number**: `string`

Formatted account number

### meta.bank

> **bank**: `string`

The name of the bank

### meta.address?

> `optional` **address**: `string`

The address associated with the account

### meta.branch?

> `optional` **branch**: `object`

Branch details (if available)

### meta.branch.\_id

> **\_id**: `string`

### meta.branch.description

> **description**: `string`

### meta.branch.phone

> **phone**: `string`

### meta.branch.address

> **address**: `object`

### meta.branch.address.line1

> **line1**: `string`

### meta.branch.address.city

> **city**: `string`

### meta.branch.address.country

> **country**: `"New Zealand"`

### meta.branch.address.postcode

> **postcode**: `string`

### meta.branch.address.line2?

> `optional` **line2**: `string`

### meta.branch.address.line3?

> `optional` **line3**: `string`

### verification

> **verification**: `object`

### verification.given\_name

> **given\_name**: `boolean`

### verification.given\_initial

> **given\_initial**: `boolean`

### verification.middle\_name

> **middle\_name**: `boolean`

### verification.middle\_initial

> **middle\_initial**: `boolean`

### verification.family\_name

> **family\_name**: `boolean`
