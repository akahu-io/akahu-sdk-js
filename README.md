# Akahu Javascript SDK

[Akahu](https://akahu.io) is New Zealand’s open finance platform.

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
- [Resources](#resources)


## Access to Akahu

Before you can get started using Akahu APIs, you will first need to register your application with
Akahu. If you do not yet have an application registered with Akahu, use the
[Contact Us](https://www.akahu.io/contact-us/) form to get in touch.

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

accounts.forEach(account => {
  const { connection, name, formatted_account, balance } = account;

  console.log(`  ${connection.name} account "${name}" (${formatted_account}) ` +
              `with available balance $${balance.available}.`);
});

// Example output:
// user@example.com has linked 2 accounts:
//   ANZ account "Main (Go)" (01-0137-0000000-00) with available balance $447.75.
//   ANZ account "Savings" (01-0137-0000000-01) with available balance $17019.34.
```

> **Note:** If you are trialling Akahu using a [Personal App](https://developers.akahu.nz/docs/personal-apps),
> you will be able to find your **App Token** and **User Token** at https://my.akahu.io/developers.
> Otherwise, the user token must first be obtained by completing the **OAuth Authorization** flow.


## Reference

- [AkahuClient](./docs/classes/AkahuClient.md)
  - [auth](./docs/classes/AuthResource.md)
    - [buildAuthorizationUrl](./docs/classes/AuthResource.md#buildAuthorizationUrl)
    - [exchange](./docs/classes/AuthResource.md#exchange)
    - [revoke](./docs/classes/AuthResource.md#revoke)
  - [identities](./docs/classes/IdentitiesResource.md)
    - [buildAuthorizationUrl](./docs/classes/IdentitiesResource.md#buildauthorizationurl)
    - [list](./docs/classes/IdentitiesResource.md#list)
    - [get](./docs/classes/IdentitiesResource.md#get)
  - [users](./docs/classes/UsersResource.md)
    - [get](./docs/classes/UsersResource.md#get)
  - [accounts](./docs/classes/AccountsResource.md)
    - [list](./docs/classes/AccountsResource.md#list)
    - [get](./docs/classes/AccountsResource.md#get)
    - [listTransactions](./docs/classes/AccountsResource.md#listTransactions)
    - [refresh](./docs/classes/AccountsResource.md#refresh)
    - [refreshAll](./docs/classes/AccountsResource.md#refreshall)
  - [connections](./docs/classes/ConnectionsResource.md)
    - [list](./docs/classes/ConnectionsResource.md#list)
    - [get](./docs/classes/ConnectionsResource.md#get)
    - [refresh](./docs/classes/ConnectionsResource.md#refresh)
  - [payments](./docs/classes/PaymentsResource.md)
    - [get](./docs/classes/PaymentsResource.md#get)
    - [list](./docs/classes/PaymentsResource.md#list)
    - [create](./docs/classes/PaymentsResource.md#create)
  - [transfers](./docs/classes/TransfersResource.md)
    - [get](./docs/classes/TransfersResource.md#get)
    - [list](./docs/classes/TransfersResource.md#list)
    - [create](./docs/classes/TransfersResource.md#create)
  - [transactions](./docs/classes/TransactionsResource.md)
    - [list](./docs/classes/TransactionsResource.md#list)
    - [get](./docs/classes/TransactionsResource.md#get)
    - [getMany](./docs/classes/TransactionsResource.md#getMany)
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

### Webhook validator
This example demonstrates a basic Express.js endpoint to receive and validate Akahu webhook events.

This endpoint follows the recommended webhook verification process as documented at
https://developers.akahu.nz/docs/reference-webhooks#verifying-a-webhook.

By default, `AkahuClient` uses an internal in-memory cache to avoid downloading
the webhook signing key each time a webhook is received. See
[webhook validator with external cache](#webhook-validator-with-external-cache) for more advanced
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

### Webhook validator with external cache
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

- [Akahu API reference](https://developers.akahu.nz/reference/api_index)
- [Akahu API guides](https://developers.akahu.nz/docs)

<!--
### OAuth Redirect Endpoint
```javascript
import express from 'express';

import { AkahuClient } from 'akahu-node';

const akahu = AkahuClient(process.env.AKAHU_APP_TOKEN);

const app = express();

app.get(
  '/auth/akahu',
  async (req: express.Request, res: express.Response): void => {

    const authToken = await akahu.auth.exchange({
      appSecret: process.env.AKAHU_APP_SECRET,
      code: req.query.code,
      redirectUri: process.env.AKAHU_REDIRECT_URI,
      grantType: 'authorization_code',  // Default if not specified
    });

    const user = await akahu.users.getCurrent(authToken.accessToken);

    // Return a response containing the auth token and user object
    res.json({ authToken, user });
  }
);
```
-->
