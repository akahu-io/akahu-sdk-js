import * as readline from "readline";
import * as open from "open";
import * as dotenv from "dotenv";
import { promises as fs } from "fs";

import { AkahuClient } from "akahu";
import type {
  Account,
  Transaction,
  WebhookEvent,
  Transfer,
  Payment,
  User,
  Cursor,
} from "akahu";

// Load from .env
dotenv.config();
const appToken = getRequiredEnv("AKAHU_APP_TOKEN");
const appSecret = getRequiredEnv("AKAHU_APP_SECRET");

// Globals
const startTimestamp = new Date();
const akahu = new AkahuClient({ appToken, appSecret });

/**
 * Top-level test execution.
 * Comment out what you wish to exclude from your tests.
 */
(async function () {
  let userToken = process.env.PREFETCHED_USER_TOKEN;
  // userToken = await auth(); // Comment this out to skip manual auth

  if (typeof userToken === "undefined") {
    throw new Error(
      "env.PREFETCHED_USER_TOKEN is required if you do not include the auth() flow."
    );
  }

  const user = await users(userToken);
  await webhooksInit(userToken, user);
  // await identities(); // Comment this out to skip manual identity auth
  await parties(userToken);
  await connections();
  await categories();
  const userAccounts = await accounts(userToken);
  // await transfers(userToken, userAccounts); // WARNING: THIS EXECUTES TRANSFERS
  // await payments(userToken, userAccounts); // WARNING: THIS EXECUTES PAYMENTS
  await transactions(userToken);
  await webhooks_final(userToken);
})().catch((e) => console.error(e));

/**
 * User input prompt utility
 */
const prompt = async (query: string): Promise<string> => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const result = await new Promise((resolve) => rl.question(query, resolve));
  rl.close();
  return result as string;
};

/**
 * Async compatible delay
 */
const delay = async (ms: number) =>
  await new Promise((res) => setTimeout(res, ms));

/**
 * Get required environment variable
 */
function getRequiredEnv(key: string) {
  const value = process.env[key];

  if (typeof value === "undefined") {
    throw new Error(
      `Configuration error: missing required ${key} environment variable.`
    );
  }

  return value;
}

async function auth() {
  console.log("** Testing AkahuClient.auth **");
  console.log("Authorize with the following link:");

  const redirect_uri = getRequiredEnv("AKAHU_OAUTH_REDIRECT_URI");

  const url = akahu.auth.buildAuthorizationUrl({
    // protocol: "http",
    // host: "localhost",
    // port: 3000,
    email: process.env.AKAHU_OAUTH_EMAIL || undefined,
    redirect_uri,
  });

  console.log("Opening " + url + "\n");
  await open(url);

  const code = await prompt("Enter auth code: ");

  const { access_token } = await akahu.auth.exchange(code, redirect_uri);
  console.log(`Logged in. Got user token ${access_token} ✔️`);
  return access_token;
}

async function users(userToken: string) {
  console.log("\n** Testing AkahuClient.users **");
  const user = await akahu.users.get(userToken);
  console.log(`Got user with email: ${user.email} ✔️`);
  return user;
}

async function identities() {
  console.log("\n** Testing AkahuClient.identities **");
  const redirect_uri = getRequiredEnv("AKAHU_OAUTH_REDIRECT_URI");
  const url = akahu.identities.buildAuthorizationUrl({ redirect_uri });

  console.log("Opening " + url + "\n");
  await open(url);

  const code = await prompt("Enter code: ");
  const idResult = await akahu.identities.get(code);
  console.log(`Got identity : ${idResult.identities?.[0]?.name} ✔️`);
  await fs.writeFile("./identity.json", JSON.stringify(idResult, null, 2));
}

async function parties(userToken: string) {
  console.log("\n** Testing AkahuClient.parties **");
  const parties = await akahu.parties.list(userToken);

  if (parties.length === 0) {
    console.warn("No party data available for this user ❌");
  } else {
    console.log(`Got ${parties.length} parties for this user ✔️`);
    console.log("For example: ");
    console.log(JSON.stringify(parties[0], null, 2));
  }
}

async function connections() {
  console.log("\n** Testing AkahuClient.connections **");
  const connections = await akahu.connections.list();
  console.log(`This app has access to ${connections.length} connections ✔️`);

  const connectionId = connections[0]._id;
  const connection = await akahu.connections.get(connectionId);
  console.log(`For example, ${connection.name} ✔️`);
}

async function categories() {
  console.log("\n** Testing AkahuClient.categories **");
  const categories = await akahu.categories.list();
  console.log(`This app has access to ${categories.length} categories ✔️`);

  const categoryId = categories[0]._id;
  const category = await akahu.categories.get(categoryId);
  console.log(`For example, ${category.name} ✔️`);
}

async function accounts(userToken: string): Promise<Account[]> {
  console.log("\n** Testing AkahuClient.accounts **");

  const userAccounts = await akahu.accounts.list(userToken);
  console.log(`User has linked ${userAccounts.length} accounts ✔️`);

  if (userAccounts.length === 0) {
    console.warn("Skipping accounts tests ❌");
    return [];
  }

  const account = await akahu.accounts.get(userToken, userAccounts[0]._id);

  await akahu.accounts.refresh(userToken, account._id);
  console.log("Account refresh triggered ✔️");

  const allTransactions: Transaction[] = [];
  let pageCount = 0;
  let cursor: Cursor;

  do {
    const {
      items,
      cursor: { next },
    } = await akahu.accounts.listTransactions(userToken, account._id, {
      cursor,
    });
    cursor = next;
    allTransactions.push(...items);
    pageCount += 1;
  } while (cursor !== null);

  console.log(
    `Account ${account.name} has ${allTransactions.length} transactions in the last 30 ` +
      `days (retrieved ${pageCount} page(s)) ✔️`
  );

  if (allTransactions.length) {
    const { amount, description, type } = allTransactions[0];
    console.log(`For example: ${type} "${description}" for $${amount}) ✔️`);
  }

  return userAccounts;
}

async function await_transfer(userToken: string, transfer: Transfer) {
  const { status: initStatus, _id } = transfer;
  let status: string;
  let polls = 0;

  console.log(
    `Waiting for transfer ${_id} to progress from ${initStatus} state...`
  );

  do {
    if (polls > 20) {
      console.error(`Transfer ${_id} timed out waiting for state change ❌`);
      return;
    }

    ({ status } = await akahu.transfers.get(userToken, _id));
    await delay(500);
  } while (status === initStatus);

  console.log(`Transfer progressed to ${status} ✔️`);
}

async function transfers(userToken: string, userAccounts: Account[]) {
  console.log("\n** Testing AkahuClient.transfers **");

  const allTransfers = await akahu.transfers.list(userToken);
  console.log(
    `User has ${allTransfers.length} transfers from the past 30 days ✔️`
  );

  if (allTransfers.length) {
    const { amount, from, to, status } = await akahu.transfers.get(
      userToken,
      allTransfers[0]._id
    );
    console.log(`For example, $${amount} from ${from} to ${to} (${status}) ✔️`);
  } else {
    console.warn("Skipping transfers.get() test ❌");
  }

  if (userAccounts.length < 2) {
    console.warn(
      "Skipping transfers.create(): requires at least two connected accounts ❌"
    );
    return;
  }

  const [{ _id: from }, { _id: to }] = userAccounts;
  const tf_1 = await akahu.transfers.create(userToken, {
    from,
    to,
    amount: 0.01,
  });
  console.log(`Initiated transfer of $${tf_1.amount} from ${from} to ${to} ✔️`);
  await await_transfer(userToken, tf_1);

  const tf_2 = await akahu.transfers.create(userToken, {
    from: to,
    to: from,
    amount: 0.01,
  });
  console.log(`Initiated transfer of $${tf_2.amount} from ${to} to ${from} ✔️`);
  await await_transfer(userToken, tf_2);
}

async function await_payment(userToken: string, payment: Payment) {
  const { status: initStatus, _id } = payment;
  let status: string;
  let polls = 0;

  console.log(
    `Waiting for payment ${_id} to progress from ${initStatus} state...`
  );

  do {
    if (polls > 20) {
      console.error(`Payment ${_id} timed out waiting for state change ❌`);
      return;
    }

    ({ status } = await akahu.payments.get(userToken, _id));
    await delay(500);
  } while (status === initStatus);

  console.log(`Payment progressed to ${status} ✔️`);
}

async function payments(userToken: string, userAccounts: Account[]) {
  console.log("\n** Testing AkahuClient.payments **");

  const allPayments = await akahu.payments.list(userToken);
  console.log(
    `User has ${allPayments.length} payments from the past 30 days ✔️`
  );

  if (allPayments.length) {
    const { amount, from, to, status } = await akahu.payments.get(
      userToken,
      allPayments[0]._id
    );
    console.log(
      `For example, $${amount} from ${from} to ${to.account_number} (${status}) ✔️`
    );
  } else {
    console.warn("Skipping payments.get() test ❌");
  }

  const payerAccount = userAccounts.find((a) =>
    (a.attributes ?? []).includes("PAYMENT_FROM")
  );

  if (typeof payerAccount === "undefined") {
    console.warn(
      "No eligible payer accounts. Skipping payments.create() test. ❌"
    );
    return;
  }

  // Add urself to receive $$$
  let payeeName: string;
  let payeeAccount: string;

  try {
    payeeName = getRequiredEnv("TEST_PAYEE_NAME");
    payeeAccount = getRequiredEnv("TEST_PAYEE_ACCOUNT");
  } catch (e) {
    console.warn(`${e} Skipping payments.create() test ❌`);
    return;
  }

  const pmt = await akahu.payments.create(userToken, {
    to: { name: payeeName, account_number: payeeAccount },
    from: payerAccount._id,
    amount: 0.01,
  });

  console.log(
    `Initiated payment of $${pmt.amount} from ${pmt.from} to ${pmt.to.account_number} ✔️`
  );
  await await_payment(userToken, pmt);
}

async function transactions(userToken: string) {
  console.log("\n** Testing AkahuClient.transactions **");

  const allTransactions: Transaction[] = [];
  let pageCount = 0;

  // Custom start date 90 days ago
  const start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
  let cursor: Cursor;

  do {
    const {
      items,
      cursor: { next },
    } = await akahu.transactions.list(userToken, { cursor, start });
    cursor = next;
    allTransactions.push(...items);
    pageCount += 1;
  } while (cursor !== null && pageCount < 5);

  console.log(
    `Retrieved ${allTransactions.length} transactions for all connected accounts in the last 90 days ` +
      `(${pageCount} pages) ✔️`
  );

  const pending = await akahu.transactions.listPending(userToken);
  console.log(
    `Retrieved ${pending.length} pending transactions for the user ✔️`
  );

  if (allTransactions.length === 0) {
    console.warn("Skipping transactions get and getMany test ❌");
    return;
  }

  const { amount, description, type } = await akahu.transactions.get(
    userToken,
    allTransactions[0]._id
  );
  console.log(`For example: ${type} "${description}" for $${amount} ✔️`);

  const many = await akahu.transactions.getMany(
    userToken,
    allTransactions.slice(0, 5).map((t) => t._id)
  );
  console.log(`Selected ${many.length} transactions by id using getMany ✔️`);
}

async function webhooksInit(userToken: string, user: User) {
  console.log("\n** Initializing AkahuClient.webhooks **");

  // List any existing webhook subscriptions
  const webhookSubscriptions = await akahu.webhooks.list(userToken);
  console.log(
    `Found ${webhookSubscriptions.length} webhook subscriptions for this user ✔️`
  );

  // Unsubscribe from existing webhook subscriptions
  if (webhookSubscriptions.length !== 0) {
    console.log("Unsubscribing from existing webhooks...");
    for (const { _id } of webhookSubscriptions) {
      await akahu.webhooks.unsubscribe(userToken, _id);
      console.log(`Unsubscribed from webhook id: ${_id} ✔️`);
    }
  }

  // Subscribe to some webhooks that we may trigger during this test
  const state = JSON.stringify({
    source: "sdk-integration-test",
    userId: user._id,
  });

  for (const webhook_type of ["TRANSFER", "PAYMENT"] as const) {
    await akahu.webhooks.subscribe(userToken, { webhook_type, state });
    console.log(`Subscribed to webhook type: ${webhook_type} ✔️`);
  }
}

async function webhooks_final(userToken: string) {
  console.log("\n** Testing AkahuClient.webhooks **");

  // Fetch webhook events that were triggered during this test run
  console.log("Waiting 2 seconds for webhook resolution...");
  await delay(2000);

  console.log("Fetching webhook events triggered during testing...");
  const events: WebhookEvent[] = [];

  const dateRange = {
    start: startTimestamp.toISOString(),
    end: new Date().toISOString(),
  };

  // Fetch all events regardless of status
  for (const status of ["FAILED", "RETRY", "SENT"] as const) {
    const evts = await akahu.webhooks.listEvents({ status, ...dateRange });
    console.log(`Fetched ${evts.length} webhook events in ${status} state ✔️`);
    events.push(...evts);
  }

  if (events.length !== 0) {
    console.log("Retrieved events:");
    for (const { payload, status } of events) {
      const {
        webhook_type: type,
        webhook_code: code,
        state,
        ...params
      } = payload;
      const res = status === "SENT" ? "✔️" : "❗";
      console.log(
        `  (${status}) ${type} ${code}: ${JSON.stringify(params)} ${res}`
      );
    }
  } else {
    console.warn("No webhook events found ❌");
  }

  // Unsubscribe from previously created webhook subscriptions
  const webhookSubscriptions = await akahu.webhooks.list(userToken);
  if (webhookSubscriptions.length !== 0) {
    console.log("Unsubscribing from registered webhooks...");
    for (const { _id } of webhookSubscriptions) {
      await akahu.webhooks.unsubscribe(userToken, _id);
    }
    console.log(`Unsubscribed from ${webhookSubscriptions.length} webhooks ✔️`);
  } else {
    console.warn("No webhook subscriptions found ❌");
  }
}
