[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / TransactionQueryParams

# Type alias: TransactionQueryParams

> **TransactionQueryParams**: `object`

Query parameters that will be used to filter transaction results.

## Type declaration

### start?

> `optional` **start**: `string`

The start date of the query as an ISO 8601 string.

#### Default Value

`30 days ago`

### end?

> `optional` **end**: `string`

The end date of the query as an ISO 8601 string.

#### Default Value

`today`

### cursor?

> `optional` **cursor**: [`Cursor`](Cursor.md)

The pagination cursor received as part of a previous paginated response.

If this query parameter is omitted, only the first page of transaction
results will be retrieved. The cursor to fetch the next page of results can
be retrieved from a given `page` of response data, nested under
`page.cursor.next`. If this value is `undefined`, it means that the last
page has been reached.
