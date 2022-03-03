[akahu - v1.3.0](../README.md) / IncomeResource

# Class: IncomeResource

Utilities for retrieving income from connected user accounts.

TODO: Link to docs

## Hierarchy

- `BaseResource`

  ↳ **`IncomeResource`**

## Table of contents

### Methods

- [list](IncomeResource.md#list)
- [get](IncomeResource.md#get)

## Methods

### list

▸ **list**(`token`, `query?`): `Promise`<[`Income`](../README.md#income)[]\>

List all income for all accounts that have been connected by the user associated with the
specified `token`.

TODO: Link to docs

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `query` | [`IncomeQueryParams`](../README.md#incomequeryparams) |

#### Returns

`Promise`<[`Income`](../README.md#income)[]\>

___

### get

▸ **get**(`token`, `incomeId`, `query?`): `Promise`<[`Income`](../README.md#income)\>

Get a single income object from an account that has been connected by the user associated with
the specified `token`.

TODO: Link to docs

#### Parameters

| Name | Type |
| :------ | :------ |
| `token` | `string` |
| `incomeId` | `string` |
| `query` | [`IncomeQueryParams`](../README.md#incomequeryparams) |

#### Returns

`Promise`<[`Income`](../README.md#income)\>
