[**akahu v2.4.0**](../README.md) • **Docs**

***

[akahu v2.4.0](../README.md) / Cursor

# Type alias: Cursor

> **Cursor**: `string` \| `null` \| `undefined`

Convenience type alias, useful when paging through multiple pages of results.

## Example

```typescript
import type { Cursor, Transaction } from "akahu";
const transactions: Transaction[] = [];
let cursor: Cursor;

do {
  const page = await akahu.transactions.list(userToken, { cursor });
  transactions.push(...page.items);
  cursor = page.cursor.next;
} while (cursor !== null);
```
