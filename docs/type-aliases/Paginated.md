[**akahu v1.15.3**](../README.md) • **Docs**

***

[akahu v1.15.3](../README.md) / Paginated

# Type alias: Paginated\<T\>

> **Paginated**\<`T`\>: `object`

A "page" of results returned by paginated API endpoints.

Each page contains an array of zero-or-more returned objects nested under the
`items` key. In some cases - even if the returned `items` array is empty -
there may still be further pages available. Because if this it is important
to always check the value of `cursor.next` in the response.

The cursor pointing to the next page of results can be found nested under
`cursor.next`. If there are no further results available, `cursor.next` will
be `null`.

## Type parameters

• **T**

## Type declaration

### items

> **items**: `T`[]

### cursor

> **cursor**: `object`

### cursor.next

> **next**: `string` \| `null`
