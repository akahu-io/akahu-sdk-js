[**akahu v2.2.0**](../README.md) • **Docs**

***

[akahu v2.2.0](../README.md) / PartyNameVerificationSource

# Type alias: PartyNameVerificationSource

> **PartyNameVerificationSource**: `object`

Name verification match where the source data is the registered name of the
party who has authenticated with the financial institution.

This data is sourced from the profile information held by connected institution
rather than any specific account held within.

## Type declaration

### type

> **type**: `"PARTY_NAME"`

### match\_result

> **match\_result**: `"MATCH"` \| `"PARTIAL_MATCH"`

### meta

> **meta**: `object`

The matched party name data

### meta.type

> **type**: `"INDIVIDUAL"` \| `"JOINT"` \| `"TRUST"` \| `"LLC"`

### meta.family\_name

> **family\_name**: `string`

### meta.full\_name

> **full\_name**: `string`

### meta.initials?

> `optional` **initials**: `string`[]

### meta.given\_name?

> `optional` **given\_name**: `string`

### meta.middle\_name?

> `optional` **middle\_name**: `string`

### meta.prefix?

> `optional` **prefix**: `string`

### meta.gender?

> `optional` **gender**: `string`

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
