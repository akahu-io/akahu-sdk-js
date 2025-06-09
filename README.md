# Akahu Javascript SDK

[Akahu](https://akahu.nz) is New Zealand’s open finance platform.

Akahu builds and maintains data integrations with banks and other financial institutions.
We bundle those integrations into a simple API for developers.

This SDK provides utilities for both node.js and client applications to simplify and enhance the
usage of Akahu APIs.


## Table of contents

- [Access to Akahu](#access-to-akahu)
- [Installation](#installation)
- [Usage](#usage)
- [Reference](#reference)
- [Examples](#examples)
  - [OAuth2 authorization](#oauth2-authorization)
  - [Listing transactions](#listing-transactions)
  - [Making a transfer](#making-a-transfer)
  - [Receiving webhooks](#receiving-webhooks)
  - [Caching webhook signing keys](#caching-webhook-signing-keys)
- [Resources](#resources)
- [Changelog](#changelog)


## Access to Akahu

Before you can get started using Akahu APIs, you will first need to register your application with
Akahu. If you do not yet have an application registered with Akahu, use the
[Contact Us](https://www.akahu.nz/contact/) form to get in touch.

Once you have registered your Akahu application, you will be issued with the following:

 - Your Akahu **App ID Token**
 - Your Akahu **App Secret**

You will need to use these credentials when interacting with Akahu API endpoints.

> **Important:** It is extremely important that you keep your **App Secret** secure.
> This means that it must not be used in client applications, which may expose the secret in their
> source code. Akahu API endpoints that require the use of your App Secret for authentication must
> only be accessed from server applications.


## Installation

Using `npm`:

```
npm install akahu
```


Using `yarn`:

```
yarn add akahu
```


## Usage
**As an ES Module:**
```js
import { AkahuClient } from 'akahu';
```

**As a CommonJS module:**
```js
const { AkahuClient } = require('akahu');
```

**Fetching user and account data:**
```js
// Replace appToken with your App Token
const appToken = 'app_token_...';

// Replace with an OAuth user access token. See note below for details.
const userToken = 'user_token_...';

// Create an instance of the AkahuClient and fetch some information
const akahu = new AkahuClient({ appToken });
const user = await akahu.users.get(userToken);
const accounts = await akahu.accounts.list(userToken);

// Let's have a look at what we got back
console.log(`${user.email} has linked ${accounts.length} accounts:`);

for (const account of accounts) {
  const { connection, name, formatted_account, balance } = account;

  console.log(`  ${connection.name} account "${name}" (${formatted_account}) ` +
              `with available balance $${balance.available}.`);
}

// Example output:
// user@example.com has linked 2 accounts:
//   Westpac account "Westpac Choice" (01-0137-0000000-00) with available balance $447.75.
//   Westpac account "Westpac eSaver" (01-0137-0000000-01) with available balance $17019.34.
```

> **Note:** If you are trialling Akahu using a [Personal App](https://developers.akahu.nz/docs/personal-apps),
> you will be able to find your **App Token** and **User Token** at https://my.akahu.nz/developers.
> Otherwise, the user token must first be obtained by completing the [OAuth2 authorization](#oauth2-authorization) flow.


## Reference

- [AkahuClient](./docs/classes/AkahuClient.md)
  - [auth](./docs/classes/AuthResource.md)
    - [buildAuthorizationUrl](./docs/classes/AuthResource.md#buildAuthorizationUrl)
    - [exchange](./docs/classes/AuthResource.md#exchange)
    - [revoke](./docs/classes/AuthResource.md#revoke)
  - [identities](./docs/classes/IdentitiesResource.md)
    - [buildAuthorizationUrl](./docs/classes/IdentitiesResource.md#buildauthorizationurl)
    - [get](./docs/classes/IdentitiesResource.md#get)
    - [verifyName](./docs/classes/IdentitiesResource.md#verifyName)
  - [users](./docs/classes/UsersResource.md)
    - [get](./docs/classes/UsersResource.md#get)
  - [parties](./docs/classes/PartiesResource.md)
    - [list](./docs/classes/PartiesResource.md#list)
  - [accounts](./docs/classes/AccountsResource.md)
    - [get](./docs/classes/AccountsResource.md#get)
    - [list](./docs/classes/AccountsResource.md#list)
    - [refresh](./docs/classes/AccountsResource.md#refresh)
    - [revoke](./docs/classes/AccountsResource.md#revoke)
    - [listTransactions](./docs/classes/AccountsResource.md#listTransactions)
    - [listPendingTransactions](./docs/classes/AccountsResource.md#listPendingTransactions)
    - [refreshAll](./docs/classes/AccountsResource.md#refreshAll)
  - [connections](./docs/classes/ConnectionsResource.md)
    - [get](./docs/classes/ConnectionsResource.md#get)
    - [list](./docs/classes/ConnectionsResource.md#list)
  - [categories](./docs/classes/CategoriesResource.md)
    - [get](./docs/classes/CategoriesResource.md#get)
    - [list](./docs/classes/CategoriesResource.md#list)
  - [payments](./docs/classes/PaymentsResource.md)
    - [get](./docs/classes/PaymentsResource.md#get)
    - [list](./docs/classes/PaymentsResource.md#list)
    - [create](./docs/classes/PaymentsResource.md#create)
    - [createToIrd](./docs/classes/PaymentsResource.md#createToIrd)
    - [cancel](./docs/classes/PaymentsResource.md#cancel)
  - [transfers](./docs/classes/TransfersResource.md)
    - [get](./docs/classes/TransfersResource.md#get)
    - [list](./docs/classes/TransfersResource.md#list)
    - [create](./docs/classes/TransfersResource.md#create)
  - [transactions](./docs/classes/TransactionsResource.md)
    - [get](./docs/classes/TransactionsResource.md#get)
    - [list](./docs/classes/TransactionsResource.md#list)
    - [getMany](./docs/classes/TransactionsResource.md#getMany)
    - [listPending](./docs/classes/TransactionsResource.md#listPending)
  - [webhooks](./docs/classes/WebhooksResource.md)
    - [list](./docs/classes/WebhooksResource.md#list)
    - [subscribe](./docs/classes/WebhooksResource.md#subscribe)
    - [unsubscribe](./docs/classes/WebhooksResource.md#unsubscribe)
    - [listEvents](./docs/classes/WebhooksResource.md#listevents)
    - [getPublicKey](./docs/classes/WebhooksResource.md#getpublickey)
    - [validateWebhook](./docs/classes/WebhooksResource.md#validatewebhook)
- Errors
  - [AkahuErrorResponse](./docs/classes/AkahuErrorResponse.md)
  - [AkahuWebhookValidationError](./docs/classes/AkahuWebhookValidationError.md)

## Examples

### OAuth2 authorization
Akahu uses the [OAuth2 authorization flow](https://developers.akahu.nz/docs/authorizing-with-oauth2)
to allow your application to request authorization from users to access Akahu APIs on their behalf. This
authorization flow consists of the following steps:

1. Your application directs the user to the Akahu authorization page.
2. The user logs in to Akahu and chooses which accounts they wish to authorize your application to access.
3. The user is redirected back to your application along with a short-lived **authorization code** included in the URL
    query parameters.
4. Your application server exchanges this authorization code with Akahu for a longer-lived **user access token**, which
    you can then use to authorize API requests on their behalf.

This SDK provides utilities to simplify integration of this authorization flow into your application.

#### Generating the authorization url (client)
The [`auth.buildAuthorizationUrl`](./docs/classes/AuthResource.md#buildAuthorizationUrl) helper simplifies generating
the link to direct the user to the Akahu authorization page. This helper can be run on either client or server.

The below example demonstrates a simple React component that will link the user to the Akahu authorization page when
clicked.
```jsx
import React from 'react';
import { AkahuClient } from 'akahu';

const akahu = new AkahuClient({
  // Configure your app token here.
  // App secret is not required and should not be included client-side.
  appToken: process.env.AKAHU_APP_TOKEN,
});

// Configure your redirect uri (for step 3) here
const akahuOAuthRedirectUri = 'https://my.app.domain/auth/akahu';

export default LoginWithAkahuLink = () => {
  const authUrl = akahu.auth.buildAuthorizationUrl({
    redirect_uri: akahuOAuthRedirectUri,
    email: '...',  // Optionally prefill the users email address
  });

  return <a href={authUrl}>Login with Akahu</a>;
};
```

#### Authorization code exchange (server)
The authorization code exchange can be performed using the
[`auth.exchange`](./docs/classes/AuthResource.md#exchange) helper.

The below example shows a basic Express.js endpoint to handle the OAuth redirect (step 3) and
complete the auth code exchange (step 4) to retrieve a user access token.

```typescript
import express from 'express';
import { AkahuClient } from 'akahu';

const akahu = new AkahuClient({
  // Configure your app token here and secret here.
  // Both app token and secret are required to complete the auth code exchange
  appToken: process.env.AKAHU_APP_TOKEN,
  appSecret: process.env.AKAHU_APP_SECRET
});

const app = express();

// The redirect URI that was included as a parameter in the authorization request
// must also be included in the auth code exchange request to validate its authenticity.
const akahuOAuthRedirectUri = 'https://my.app.domain/auth/akahu';

app.get('/auth/akahu', async (req: express.Request, res: express.Response): void => {
  // Exchange the auth code - this is included as a query parameter in the request
  const tokenResponse =  await akahu.auth.exchange(req.query.code, akahuOAuthRedirectUri);
  const { access_token } = tokenResponse;

  /*
  ...
  Save access_token against your application user in the database.
  ...
  */

  // Success! You can now use access_token to authorize Akahu API requests on behalf of the user.
  res.sendStatus(200);
});
```

> 🧹 **Best Practice**
>
> To ensure that your application does not retain unnecessary access to user data, [revoke](./docs/classes/AuthResource.md#revoke) access tokens in the event that they are no longer required (e.g. the user deletes their account).

### Listing transactions
The [`transactions.list`](./docs/classes/TransactionsResource.md#list) method can be used to retrieve transactions
from accounts that the user has authorized your application to access.

Transaction responses are paginated (Akahu only returns small batches at a time), so we must page through them to
get all of them.

```typescript
import { AkahuClient } from "akahu";
// Optional type defs for Typescript
import type { Transaction, TransactionQueryParams } from "akahu";

const akahu = new AkahuClient({
  appToken: process.env.AKAHU_APP_TOKEN,
});

// Replace with an OAuth user access token
const userToken = "user_token_...";

// Specify a start and end timestamp to filter by a date range. If no date range
// is provided, transactions from the last 30 days will be returned.
const query: TransactionQueryParams = {
  // start: "2021-01-01T00:00:00.000Z",
  // end: "2021-01-02T00:00:00.000Z",
};

const transactions: Transaction[] = [];

do {
  // Transactions are returned one page at a time
  const page = await akahu.transactions.list(userToken, query);
  // Store the returned transaction `items` from each page
  transactions.push(...page.items);
  // Update the cursor to point to the next page
  query.cursor = page.cursor.next;
  // Continue until the server returns a null cursor
} while (query.cursor !== null);

console.log(`Retrieved ${transactions.length} transactions:`);
for (const transaction of transactions) {
  console.log(transaction.description);
}
```

### Making a transfer
The [`transfers.create`](./docs/classes/TransfersResource.md#create) method can be used to initiate
a bank transfer between two of a users connected bank accounts:

```typescript
// Make a $5 transfer between these two accounts
const transfer = await akahu.transfers.create(
  userToken,
  {
    from: "acc_1111111111111111111111111",
    to: "acc_2222222222222222222222222",
    amount: 5
  }
);
console.log("Transfer Initiated:", transfer._id);
```

### Receiving webhooks
This example demonstrates a basic Express.js endpoint to receive and validate Akahu webhook events.

This endpoint follows the recommended webhook verification process as documented at
https://developers.akahu.nz/docs/reference-webhooks#verifying-a-webhook.

By default, `AkahuClient` uses an internal in-memory cache to avoid downloading
the webhook signing key each time a webhook is received. See
[caching webhook signing keys](#caching-webhook-signing-keys) for more advanced
caching options.

For a complete reference of the different webhook payloads that your application
may receive, see https://developers.akahu.nz/docs/reference-webhooks#what-a-webhook-looks-like.

```typescript
import express from "express";
import { AkahuClient } from 'akahu';

// Optional type defs for Typescript
import type { WebhookPayload } from 'akahu';

// IMPORTANT: initialize the client globally to make use of built in public key
// caching. Initializing a new client per-request would cause the public key to
// be downloaded from Akahu servers for every webhook that is received.
const akahu = new AkahuClient({
  appToken: process.env.AKAHU_APP_TOKEN,
  appSecret: process.env.AKAHU_APP_SECRET
});

// Initialize the express app
const app = express();

// Use `express.raw({type: 'application/json'})` to get the raw request body.
// The raw, unparsed body is required to validate the webhook signature.
app.post('/akahu-webhook', express.raw({type: 'application/json'}), async (req, res) => {

  // This signature will be used to validate the authenticity of the webhook payload.
  const signature = req.headers['X-Akahu-Signature'];

  // This is the ID of the signing key that was used to generate the signature
  const keyId = req.headers['X-Akahu-Signing-Key']

  let payload: WebhookPayload;

  // The AkahuClient will lookup the public key that matches `keyId` and use this
  // key to validate the webhook signature.
  try {
    // If validation is successful, the JSON payload is deserialized and returned.
    payload = await akahu.webhooks.validateWebhook(keyId, signature, req.body);
  } catch (e) {
    console.log(`Webhook validation failed: ${e.message}`);
    return res.status(400).send(e.message);
  }

  // Do something with the webhook payload.
  const { webhook_type, webhook_code, ...params } = payload;
  console.log(`Received webhook type: '${webhook_type}', code: ${webhook_code}:`);
  console.log(params);

  // Return a 200 response to acknowledge receipt of the webhook
  res.sendStatus(200);
});
```

### Caching webhook signing keys
The previous example makes use of the in-memory caching of the webhook signing key by `AkahuClient`
to avoid making excessive requests to the Akahu API. However, this caching may not be effective if
your application is deployed as a stateless/ephemeral function (e.g. using AWS Lambda). In such
cases, it is recommended to use an external cache such as **redis** or **memcached** to allow shared
caching between invocations of your application.

To make use of an external cache to store the webhook signing key, supply the optional `cacheConfig`
config object to [`validateWebhook()`](./docs/classes/WebhooksResource.md#validateWebhook).
The `cache` attribute of this object must implement the [`WebhookSigningKeyCache`](./docs/interfaces/WebhookSigningKeyCache.md)
interface to provide access to the external cache. See [`WebhookCacheConfig`](./docs/README.md#WebhookCacheConfig)
for the complete set of caching configuration that is available.

The below example wraps an instance of the [`node-redis`](https://github.com/NodeRedis/node-redis)
client `get` and `set` methods to provide this interface:

```javascript
import { promisify } from "util";
import { createClient } from 'redis';

const redis = createClient(/* ... */);

const cacheConfig = {
  cache: {
    // Convert redis client methods to promise friendly implementations
    get: promisify(redis.get).bind(redis),
    set: promisify(redis.set).bind(redis),
  }
};

/* ... */

try {
  payload = await akahu.webhooks.validateWebhook(keyId, signature, req.body, cacheConfig);
} catch (e) {
  /* ... */
}
```

## Resources

- [Akahu API reference](https://developers.akahu.nz/reference)
- [Akahu API guides](https://developers.akahu.nz/docs)


## Changelog

### [2.1.0] - 2025-04-16
Added typings for new API fields.


### [2.0.0] - 2025-03-18
This release updates the `axios` dependency to v1.8.3.

We don't expect that this will be a breaking change for most, however we have incremented the major version because the commonly used [`axios-fetch-adapter`](https://github.com/haverstack/axios-fetch-adapter) library is incompatible with this version of Axios. If your app is deployed on Cloudflare workers, you can now use the [built-in fetch adapter](https://github.com/axios/axios/pull/6371) by passing `adapter: "fetch"` when initialising the `AkahuClient`.
