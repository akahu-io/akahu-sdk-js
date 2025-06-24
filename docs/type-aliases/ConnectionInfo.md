[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / ConnectionInfo

# Type alias: ConnectionInfo

> **ConnectionInfo**: `object`

Akahu connection metadata returned when attached to other resources.

## Type declaration

### \_id

> **\_id**: `string`

The connected financial institution's unique identifier.
This will always be prefixed with `conn_`.

### name

> **name**: `string`

Display name for the connected institution.

### logo

> **logo**: `string`

A URL pointing to an image of the institution's logo.

### connection\_type

> **connection\_type**: `ConnectionType`

The type of integration used to connect to this institution.

This will be one of:
- `classic` → A classic Akahu connection, which uses Akahu's custom
built integration to connect to the institution.
- `official` → An official open banking connection, which uses the
institution's official open banking APIs.
