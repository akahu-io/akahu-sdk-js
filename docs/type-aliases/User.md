[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / User

# Type alias: User

> **User**: `object`

User data as returned from the /users/me endpoint

## Type declaration

### \_id

> **\_id**: `string`

Akahu's unique identifier for this user.

### access\_granted\_at

> **access\_granted\_at**: `string`

The timestamp that the user first granted your app access to their accounts
(i.e. the time at which your user token was issued). Formatted as an ISO
8601 timestamp.

### email?

> `optional` **email**: `string`

The email address that this user used to register with Akahu.

This will always be present if your app has the `AKAHU` scope.

### preferred\_name?

> `optional` **preferred\_name**: `string`

The user's preferred name, if they have provided it by updating their
profile at https://my.akahu.nz. This will not be available for most users.

### ~~first\_name?~~

> `optional` **first\_name**: `string`

The user's first name, if they have provided it.

#### Deprecated

Only present on some legacy users. You probably want
[party](https://developers.akahu.nz/reference/get_parties) data instead,
which is sourced from the user's connected financial institution(s).

### ~~last\_name?~~

> `optional` **last\_name**: `string`

The user's last name, if they have provided it.

#### Deprecated

Only present on some legacy users. You probably want
[party](https://developers.akahu.nz/reference/get_parties) data instead,
which is sourced from the user's connected financial institution(s).

### ~~mobile?~~

> `optional` **mobile**: `undefined`

#### Deprecated

This field is unused. You probably want
[party](https://developers.akahu.nz/reference/get_parties) data instead,
which is sourced from the user's connected financial institution(s).
