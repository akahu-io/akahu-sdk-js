# Akahu Javascript SDK

> **Note:** This SDK is still under development. It will be made available for general
> usage and installation using `npm` over the coming weeks.

[Akahu](https://akahu.io) is New Zealand’s open finance platform.

Akahu builds and maintains data integrations with banks and other financial institutions.
We bundle those integrations into a simple API for developers.

This SDK provides utilities for both node.js and client applications to simplify and enhance the
usage of Akahu APIs.


## Table of contents

- [Access to Akahu](#access-to-akahu)
- [Installation](#installation)
- [Usage](#usage)
- [Akahu client reference](#akahu-client-reference)
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

 **This is a placeholder. This package is not yet available on npm**

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

// Replace with an OAuth user access token. See not above for details.
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


## Akahu client reference
- [AkahuClient](./docs/classes/AkahuClient.md)
  - [auth](./docs/classes/AuthResource.md)
    - [buildAuthorizationUrl](./docs/classes/AuthResource.md#buildAuthorizationUrl)
    - [exchange](./docs/classes/AuthResource.md#exchange)
    - [revoke](./docs/classes/AuthResource.md#revoke)
  - [identities](./docs/classes/IdentitiesResource.md)
    - [buildAuthorizationUrl](./docs/classes/IdentityResource.md#buildauthorizationurl)
    - [list](./docs/classes/IdentitiesResource.md#list)
    - [get](./docs/classes/IdentitiesResource.md#get)
  - [users](./docs/classes/UsersResource.md)
    - [get](./docs/classes/UsersResource.md#get)
  - [accounts](./docs/classes/AccountsResource.md)
    - [list](./docs/classes/AccountsResource.md#list)
    - [get](./docs/classes/AccountsResource.md#get)
    - [transactions](./docs/classes/AccountsResource.md#transactions)
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
    - [listSubset](./docs/classes/TransactionsResource.md#listsubset)
    - [get](./docs/classes/TransactionsResource.md#get)
  - [webhooks](./docs/classes/WebhooksResource.md)
    - [list](./docs/classes/WebhooksResource.md#list)
    - [subscribe](./docs/classes/WebhooksResource.md#subscribe)
    - [unsubscribe](./docs/classes/WebhooksResource.md#unsubscribe)
    - [listEvents](./docs/classes/WebhooksResource.md#listevents)
    - [getPublicKey](./docs/classes/WebhooksResource.md#getpublickey)
    - [validateWebhook](./docs/classes/WebhooksResource.md#validatewebhook)

## Examples

```js
// TODO
```

## Resources

- [Akahu API reference](https://developers.akahu.nz/reference/api_index)
- [Akahu API guides](https://developers.akahu.nz/docs)

## TODO

 - Better errors

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