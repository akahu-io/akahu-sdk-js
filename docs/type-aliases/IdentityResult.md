[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / IdentityResult

# Type alias: IdentityResult

> **IdentityResult**: `object`

The result of an Akahu identity verification request.

## Type declaration

### \_id

> **\_id**: `string`

### status

> **status**: `"PROCESSING"` \| `"COMPLETE"` \| `"ERROR"`

### created\_at

> **created\_at**: `string`

### updated\_at

> **updated\_at**: `string`

### expires\_at

> **expires\_at**: `string`

### source

> **source**: `Record`\<`string`, `any`\>

### errors?

> `optional` **errors**: `string`[]

### identities?

> `optional` **identities**: `Record`\<`string`, `any`\>[]

### addresses?

> `optional` **addresses**: `Record`\<`string`, `any`\>[]

### accounts?

> `optional` **accounts**: `Record`\<`string`, `any`\>[]
