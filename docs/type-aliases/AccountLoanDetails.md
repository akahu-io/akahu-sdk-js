[**akahu v2.5.1**](../README.md) • **Docs**

***

[akahu v2.5.1](../README.md) / AccountLoanDetails

# Type alias: AccountLoanDetails

> **AccountLoanDetails**: `object`

## Type declaration

### purpose

> **purpose**: `"HOME"` \| `"PERSONAL"` \| `"BUSINESS"` \| `"UNKNOWN"`

The purpose of the loan, if we can't determine the purpose, this will be `UNKNOWN`

### type

> **type**: `"TABLE"` \| `"REDUCING"` \| `"REVOLVING"` \| `"UNKNOWN"`

The type of loan, if we can't determine the type, this will be `UNKNOWN`

### interest

> **interest**: `object`

Interest rate information for the loan.

### interest.rate

> **rate**: `number`

The interest rate on the loan.

### interest.type

> **type**: `"FIXED"` \| `"FLOATING"`

The type of interest rate.

### interest.expires\_at?

> `optional` **expires\_at**: `string`

When this interest rate expires, if available.

### is\_interest\_only

> **is\_interest\_only**: `boolean`

Is the loan currently in an interest only period?

### interest\_only\_expires\_at?

> `optional` **interest\_only\_expires\_at**: `string`

When the interest only period expires, if available.

### term?

> `optional` **term**: `object`

The duration/term of the loan for it to be paid to completion from the start date of the loan.

### term.years?

> `optional` **years**: `number`

The number of years the loan is for.

### term.months?

> `optional` **months**: `number`

The number of months the loan is for.

### matures\_at?

> `optional` **matures\_at**: `string`

When the loan matures, if available.

### initial\_principal?

> `optional` **initial\_principal**: `number`

The loan initial principal amount, this was the original amount borrowed.

### repayment?

> `optional` **repayment**: `object`

Loan repayment information if available.

### repayment.next\_amount

> **next\_amount**: `number`

The next instalment amount.

### repayment.frequency?

> `optional` **frequency**: `"WEEKLY"` \| `"FORTNIGHTLY"` \| `"MONTHLY"` \| `"QUARTERLY"` \| `"BIANNUALLY"` \| `"ANNUALLY"`

The frequency of the loan repayment.

### repayment.next\_date?

> `optional` **next\_date**: `string`

The next repayment date, if available.
