# akahu-nodejs-sdk

## Getting Started

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

## Objectives

### Features

- API client
  - ~~Identity~~
    - Generate identity request URL?
    - Exchange identity result code for result object
  - ~~Authorisation~~
    - Generate authorisation request URL?
    - Auth code exchange for user token
  - ~~Users~~
    - Get (current user)
  - ~~Accounts~~
    - List
    - Detail
    - Refresh (all or single)
    - List transactions
  - ~~Connections~~
    - List
    - Detail
    - Refresh (single)
  - ~~Transactions~~
    - List
    - List subset by id
    - Detail
  - ~~Payments~~
    - List
    - Detail
    - Create
  - ~~Transfers~~
    - List
    - Detail
    - Create
  - Webhooks
    - List
    - Create (Register)
    - Delete (Unregister)
    - List events

- Webhook validator
- Idempotent requests:
  - Helpers to generate and cache idempotency keys
  - 
  - Include idempotency keys in Error objects so they can be used to retry
- Simplified error handling

### Design

- Simplicity - light wrapper around API endpoints
- Extensible - behaviour can be overridden and extended
- Configurable - simple but flexible configuration
- Utility - provide utilities to simplify common patterns

### Compatibility

- ES module compatible
- CommonJS compatible
- Bundled with Typescript stubs
- node.js >= 12.0.0
