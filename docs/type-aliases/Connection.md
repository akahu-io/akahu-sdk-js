[**akahu v2.1.0**](../README.md) • **Docs**

***

[akahu v2.1.0](../README.md) / Connection

# Type alias: Connection

> **Connection**: `object`

Akahu connection metadata returned by /connections endpoints.

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

### new\_connections\_enabled

> **new\_connections\_enabled**: `boolean`

Whether new connections to this institution are allowed.

This may be false if the institution is migrating to an official open banking connection.

### \_classic?

> `optional` **\_classic**: `string`

The id of the corresponding classic connection for this institution.

This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).

### mode?

> `optional` **mode**: `ConnectionMigrationMode`

The migration mode of this connection.

This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).

The `mode` will be one of:
- `strict` → Only official open banking connections will be enabled. Any pre-existing classic connections that were not migrated will be removed.
- `migration` → Existing classic connections will continue to function, but users will be unable to set up a new classic connection if there is an equivalent official open banking connection available. New connections can only be established using the official open banking integration.
- `side_by_side` → Your users will be able to choose when setting up a new connection whether they wish to use a classic or official open banking integration.
- `developer` → This is like migration mode, but will allow developers to continue to connect classic connections, so that they can test the migration process.

### deadline?

> `optional` **deadline**: `string`

The deadline date for users to migrate from classic to official open banking connections.

This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).

#### Example

```ts
"2025-12-31"
```
