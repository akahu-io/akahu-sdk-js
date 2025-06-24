[**akahu v2.2.0**](../README.md) • **Docs**

***

[akahu v2.2.0](../README.md) / AkahuClient

# Class: AkahuClient

The AkahuClient provides a simple interface to the Akahu API and utilities
that assist with common usage patterns.

AkahuClient uses [axios](https://axios-http.com/docs/intro) under the hood to make
API requests. A subset of axios request options can be passed through to the underlying axios
instance using the options available in [AkahuClientConfig](../type-aliases/AkahuClientConfig.md).

In the case of an error while making an API request, you can expect to handle one of the
following two exceptions:

- [AkahuErrorResponse](AkahuErrorResponse.md) When an error response is returned from the API
- [AxiosError](https://github.com/axios/axios/blob/v0.21.1/index.d.ts#L85) when an error
   occurred during the request process, but no response was received (i.e. due to network issues).

## Constructors

### new AkahuClient()

> **new AkahuClient**(`config`): [`AkahuClient`](AkahuClient.md)

#### Parameters

• **config**: [`AkahuClientConfig`](../type-aliases/AkahuClientConfig.md)

#### Returns

[`AkahuClient`](AkahuClient.md)

## Properties

### Resource

#### auth

> **auth**: [`AuthResource`](AuthResource.md)

Utilities for authorizing users using OAuth2.

[https://developers.akahu.nz/docs/authorizing-with-oauth2](https://developers.akahu.nz/docs/authorizing-with-oauth2)

***

#### identities

> **identities**: [`IdentitiesResource`](IdentitiesResource.md)

Utilities for requesting identity verification using OAuth2.

[https://developers.akahu.nz/docs/identity-verification](https://developers.akahu.nz/docs/identity-verification)

***

#### users

> **users**: [`UsersResource`](UsersResource.md)

Utilities for retrieving information about the Akahu user.

***

#### connections

> **connections**: [`ConnectionsResource`](ConnectionsResource.md)

Utilities to view connections that are available to your app, and refresh
accounts under a given connection.

***

#### categories

> **categories**: [`CategoriesResource`](CategoriesResource.md)

Utilities to view categories that are available to your app.

***

#### accounts

> **accounts**: [`AccountsResource`](AccountsResource.md)

Utilities for managing Akahu accounts that have been linked by users.

[https://developers.akahu.nz/docs/accessing-account-data](https://developers.akahu.nz/docs/accessing-account-data)

***

#### authorisations

> **authorisations**: [`AuthorisationsResource`](AuthorisationsResource.md)

Utilities for managing Akahu authorisations that have been linked by users.

***

#### payments

> **payments**: [`PaymentsResource`](PaymentsResource.md)

Utilities for managing bank account payments on behalf of users.

[https://developers.akahu.nz/docs/making-a-payment](https://developers.akahu.nz/docs/making-a-payment)

***

#### transfers

> **transfers**: [`TransfersResource`](TransfersResource.md)

Utilities for managing bank account transfers on behalf of users.

[https://developers.akahu.nz/docs/making-a-transfer](https://developers.akahu.nz/docs/making-a-transfer)

***

#### transactions

> **transactions**: [`TransactionsResource`](TransactionsResource.md)

Utilities for retrieving bank transactions from connected user accounts.

[https://developers.akahu.nz/docs/accessing-transactional-data](https://developers.akahu.nz/docs/accessing-transactional-data)

***

#### webhooks

> **webhooks**: [`WebhooksResource`](WebhooksResource.md)

Utilities for managing, retrieving, and validating webhooks.

[https://developers.akahu.nz/docs/reference-webhooks](https://developers.akahu.nz/docs/reference-webhooks)

***

#### parties

> **parties**: [`PartiesResource`](PartiesResource.md)

Fetch identity data relating to the party that the user has logged-in to
their institution as when connecting accounts to Akahu. i.e. the user's
"profile" information at the connected institution.
