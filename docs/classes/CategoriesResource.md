[**akahu v2.2.0**](../README.md) • **Docs**

***

[akahu v2.2.0](../README.md) / CategoriesResource

# Class: CategoriesResource

Utilities to view categories that are available to your app.

## Extends

- `BaseResource`

## Methods

### list()

> **list**(): `Promise`\<[`Category`](../type-aliases/Category.md)[]\>

List all categories that the app has access to.

[https://developers.akahu.nz/reference/get_categories](https://developers.akahu.nz/reference/get_categories)

#### Returns

`Promise`\<[`Category`](../type-aliases/Category.md)[]\>

***

### get()

> **get**(`categoryId`): `Promise`\<[`Category`](../type-aliases/Category.md)\>

Get an individual category.

[https://developers.akahu.nz/reference/get_categories-id](https://developers.akahu.nz/reference/get_categories-id)

#### Parameters

• **categoryId**: `string`

#### Returns

`Promise`\<[`Category`](../type-aliases/Category.md)\>
