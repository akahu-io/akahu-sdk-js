[**akahu v2.4.1**](../README.md) • **Docs**

***

[akahu v2.4.1](../README.md) / AccountPaymentConsent

# Type alias: AccountPaymentConsent

> **AccountPaymentConsent**: `object`

A payment consent for an account, which may be used to initiate payments from that account.

## Type declaration

### single\_limit

> **single\_limit**: `number`

The single payment limit for this consent, e.g. no more than $1000 per payment.

### periodic\_limit

> **periodic\_limit**: `PaymentConsentPeriodicLimit`

The periodic payment limit for a consent, e.g. no more than $50 daily

### payees

> **payees**: [`PaymentConsentPayee`](PaymentConsentPayee.md)[]

The list of payees that payments using this consent can be sent to, the to account for a payment must match the name and account number exactly.
