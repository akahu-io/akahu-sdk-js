[akahu - v1.15.0](../README.md) / CategoriesResource

# Class: CategoriesResource

Utilities to view categories that are available to your app.

## Hierarchy

- `BaseResource`

  ↳ **`CategoriesResource`**

## Table of contents

### Methods

- [list](CategoriesResource.md#list)
- [get](CategoriesResource.md#get)

## Methods

### list

▸ **list**(): `Promise`<[`Category`](../README.md#category)[]\>

List all categories that the app has access to.

[https://developers.akahu.nz/reference/get_categories](https://developers.akahu.nz/reference/get_categories)

#### Returns

`Promise`<[`Category`](../README.md#category)[]\>

___

### get

▸ **get**(`categoryId`): `Promise`<[`Category`](../README.md#category)\>

Get an individual category.

[https://developers.akahu.nz/reference/get_categories-id](https://developers.akahu.nz/reference/get_categories-id)

#### Parameters

| Name | Type |
| :------ | :------ |
| `categoryId` | `string` |

#### Returns

`Promise`<[`Category`](../README.md#category)\>
