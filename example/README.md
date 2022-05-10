# akahu-sdk-example

This project serves as a full integration test of the SDK as well as example code for SDK usage. Before running the script you will need to configure a `.env` file in this directory with your credentials as follows:

**`.env`**
```sh
# Your Akahu App Token
AKAHU_APP_TOKEN=app_token_xxxxxx
# Your Akahu App Secret
AKAHU_APP_SECRET=xxxxxx
# Email address to use to prefill the OAuth flow (optional)
AKAHU_OAUTH_EMAIL=john.smith@example.com
# The OAuth redirect location. Must be specified if you wish to test either of the auth flows.
AKAHU_OAUTH_REDIRECT_URI=https://example.com/auth/akahu
# If you don't include the manual auth flow, you must provide a valid PREFETCHED_USER_TOKEN instead
# If you wish to test transfers, the user token must have at least 2x connected accounts with the TRANSFER attribute.
# If you wish to test payments, the user token must have at least 1 connected account with the PAYMENT_FROM attribute.
PREFETCHED_USER_TOKEN=user_token_xxxxxx
# Holder name of the bank account that a test payment ($0.01) will be made to
TEST_PAYEE_NAME=John Smith
# Account number of the bank account that a test payment ($0.01) will be made to
# WARNING: Make sure this is an account number that you control.
TEST_PAYEE_ACCOUNT=XX-XXXX-XXXXXXX-XX
```

Once you have all that sorted, run the test with:

```sh
npm run it
```
