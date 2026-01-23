[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / Connection

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

This may be `false` if your app is configured to migrate users to the official open banking connection for this provider.

### \_classic?

> `optional` **\_classic**: `string`

The id of the corresponding classic connection for this institution.

This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).

### mode?

> `optional` **mode**: `ConnectionMigrationMode`

The migration mode of this connection.

This is only present for official open banking connections (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).

The `mode` will be one of:
- `strict` → The classic equivalent of this connection is not available to your users. This mode can only be configured for new apps or apps that have successfully migrated all users away from their existing classic connections for this provider.
- `migration` → Any existing classic connections to this provider will continue to operate, but users will be unable to set up a new classic connection for this provider. New connections can only be established using this official open banking connection.
- `side_by_side` → Your users will be able to choose when setting up a new connection whether they wish to use the classic or official open banking connection for this provider. This mode is useful for apps that want to enable an official open banking connection where possible, but provide a fallback for users with account types that are not yet supported by the official open banking connection.
- `developer` → This is like migration mode, but will allow developers to continue to connect classic connections, so that they can test the migration process. This mode can only be enabled in non-production environments.

### deadline?

> `optional` **deadline**: `string`

The deadline date for users to migrate from classic to official open banking connections.

This is only present for official open banking connections in `migration` or `developer` mode (Read more [here](https://developers.akahu.nz/docs/official-open-banking)).

#### Example

```ts
"2025-12-31"
```
