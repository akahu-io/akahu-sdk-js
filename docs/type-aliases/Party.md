[**akahu v2.0.0**](../README.md) • **Docs**

***

[akahu v2.0.0](../README.md) / Party

# Type alias: Party

> **Party**: `object`

Identity data relating to the party that the user has logged-in to their
institution as when connecting accounts to Akahu. i.e. the user's "profile"
information at the connected institution.

All keys are optional depending on the scopes granted to your app.

## Type declaration

### \_id

> **\_id**: `string`

### \_authorisation

> **\_authorisation**: `string`

The authorisation identifier. Financial accounts are connected to Akahu via
an authorisation with the user's financial institution. This identifier can
be used to link specific financial accounts to the party who completed the
authorisation by matching records with the same `_authorisation` value.

### \_connection

> **\_connection**: `string`

The connection id identifying the institution that the data was sourced from

### \_user

> **\_user**: `string`

### type

> **type**: `"INDIVIDUAL"` \| `"JOINT"` \| `"TRUST"` \| `"LLC"`

### name?

> `optional` **name**: [`PartyName`](PartyName.md)

### dob?

> `optional` **dob**: [`PartyDob`](PartyDob.md)

### tax\_number?

> `optional` **tax\_number**: [`PartyTaxNumber`](PartyTaxNumber.md)

### phone\_numbers?

> `optional` **phone\_numbers**: [`PartyPhoneNumber`](PartyPhoneNumber.md)[]

### email\_addresses?

> `optional` **email\_addresses**: [`PartyEmail`](PartyEmail.md)[]

### addresses?

> `optional` **addresses**: [`PartyAddress`](PartyAddress.md)[]
