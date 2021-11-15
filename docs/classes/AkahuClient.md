[akahu - v1.2.0](../README.md) / AkahuClient

# Class: AkahuClient

The AkahuClient provides a simple interface to the Akahu API and utilities
that assist with common usage patterns.

AkahuClient uses [axios](https://axios-http.com/docs/intro) under the hood to make
API requests. A subset of axios request options can be passed through to the underlying axios
instance using the options available in [AkahuClientConfig](../README.md#akahuclientconfig).

In the case of an error while making an API request, you can expect to handle one of the
following two exceptions:

- [AkahuErrorResponse](AkahuErrorResponse.md) When an error response is returned from the API
- [AxiosError](https://github.com/axios/axios/blob/v0.21.1/index.d.ts#L85) when an error
   occurred during the request process, but no response was received (i.e. due to network issues).

## Table of contents

### Constructors

- [constructor](AkahuClient.md#constructor)

### Resource Properties

- [auth](AkahuClient.md#auth)
- [identities](AkahuClient.md#identities)
- [users](AkahuClient.md#users)
- [connections](AkahuClient.md#connections)
- [accounts](AkahuClient.md#accounts)
- [payments](AkahuClient.md#payments)
- [transfers](AkahuClient.md#transfers)
- [transactions](AkahuClient.md#transactions)
- [webhooks](AkahuClient.md#webhooks)

## Constructors

### constructor

• **new AkahuClient**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`AkahuClientConfig`](../README.md#akahuclientconfig) |

## Resource Properties

### auth

• **auth**: [`AuthResource`](AuthResource.md)

Utilities for authorizing users using OAuth2.

[https://developers.akahu.nz/docs/authorizing-with-oauth2](https://developers.akahu.nz/docs/authorizing-with-oauth2)

___

### identities

• **identities**: [`IdentitiesResource`](IdentitiesResource.md)

Utilities for requesting identity verification using OAuth2.

[https://developers.akahu.nz/docs/identity-verification](https://developers.akahu.nz/docs/identity-verification)

___

### users

• **users**: [`UsersResource`](UsersResource.md)

Utilities for retrieving information about the Akahu user.

___

### connections

• **connections**: [`ConnectionsResource`](ConnectionsResource.md)

Utilities to view connections that are available to your app, and refresh
accounts under a given connection.

___

### accounts

• **accounts**: [`AccountsResource`](AccountsResource.md)

Utilities for managing Akahu accounts that have been linked by users.

[https://developers.akahu.nz/docs/accessing-account-data](https://developers.akahu.nz/docs/accessing-account-data)

___

### payments

• **payments**: [`PaymentsResource`](PaymentsResource.md)

Utilities for managing bank account payments on behalf of users.

[https://developers.akahu.nz/docs/making-a-payment](https://developers.akahu.nz/docs/making-a-payment)

___

### transfers

• **transfers**: [`TransfersResource`](TransfersResource.md)

Utilities for managing bank account transfers on behalf of users.

[https://developers.akahu.nz/docs/making-a-transfer](https://developers.akahu.nz/docs/making-a-transfer)

___

### transactions

• **transactions**: [`TransactionsResource`](TransactionsResource.md)

Utilities for retrieving bank transactions from connected user accounts.

[https://developers.akahu.nz/docs/accessing-transactional-data](https://developers.akahu.nz/docs/accessing-transactional-data)

___

### webhooks

• **webhooks**: [`WebhooksResource`](WebhooksResource.md)

Utilities for managing, retrieving, and validating webhooks.

[https://developers.akahu.nz/docs/reference-webhooks](https://developers.akahu.nz/docs/reference-webhooks)
