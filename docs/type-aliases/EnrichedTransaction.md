[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / EnrichedTransaction

# Type alias: EnrichedTransaction

> **EnrichedTransaction**: [`RawTransaction`](RawTransaction.md) & `object`

A basic transaction with additional enrichment data.

An enriched transaction includes structured data describing the merchant
that was party to the transaction.

## Type declaration

### merchant

> **merchant**: `object`

### merchant.\_id

> **\_id**: `string`

### merchant.name

> **name**: `string`

### merchant.website?

> `optional` **website**: `string`

### category

> **category**: `object`

### category.\_id

> **\_id**: `string`

### category.name

> **name**: `string`

### category.groups

> **groups**: `object`

#### Index signature

 \[`groupKey`: `string`\]: `object`

### meta

> **meta**: `object`

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

### meta.logo?

> `optional` **logo**: `string`

### meta.card\_suffix?

> `optional` **card\_suffix**: `string`

If this transaction was made with a credit or debit card, this field may
contain the last four digits of the card number.
