[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / Payment

# Type alias: Payment

> **Payment**: `object`

Payment object returned by the /payments endpoint.

## Type declaration

### \_id

> **\_id**: `string`

### from

> **from**: `string`

### to

> **to**: `object`

### to.name

> **name**: `string`

### to.account\_number

> **account\_number**: `string`

### amount

> **amount**: `number`

### meta

> **meta**: `object`

### meta.source

> **source**: `object`

### meta.source.code?

> `optional` **code**: `string`

### meta.source.reference?

> `optional` **reference**: `string`

### meta.destination

> **destination**: `object`

### meta.destination.particulars?

> `optional` **particulars**: `string`

### meta.destination.code?

> `optional` **code**: `string`

### meta.destination.reference?

> `optional` **reference**: `string`

### sid

> **sid**: `string`

### status

> **status**: [`PaymentStatus`](PaymentStatus.md)

### final

> **final**: `boolean`

### timeline

> **timeline**: `object`[]

### created\_at

> **created\_at**: `string`

### updated\_at

> **updated\_at**: `string`

### status\_code?

> `optional` **status\_code**: [`PaymentStatusCode`](PaymentStatusCode.md)

### status\_text?

> `optional` **status\_text**: `string`

### approval\_type?

> `optional` **approval\_type**: `"BANK"` \| `"USER"`

### received\_at?

> `optional` **received\_at**: `string`

### ~~timeout\_at?~~

> `optional` **timeout\_at**: `string`

#### Deprecated

this field is unused
