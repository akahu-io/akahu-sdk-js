import { createSign } from 'crypto';
import { readFileSync } from "fs";
import MockAdapter from "axios-mock-adapter";

import { AkahuClient } from '@/client';
import { WebhookPayload } from '@/models/webhooks';

/* Initialize fixtures */
const testPrivKey = readFileSync(`${__dirname}/resources/test_webhook_rsa`, 'utf-8')
const testPubKey = readFileSync(`${__dirname}/resources/test_webhook_rsa.pub`, 'utf-8')

const sign = (payload: string) => {
  const signer = createSign("sha256");
  signer.update(payload).end();
  return signer.sign(testPrivKey, 'base64');
}

const testWebhookPayload: WebhookPayload = {
  webhook_type: 'TOKEN',
  webhook_code: 'DELETE',
  state: '',
  item_id: 'user_token_1234',
}

const testWebhookBody = JSON.stringify(testWebhookPayload);
const testWebhookSignature = sign(testWebhookBody);


describe("AkahuClient.webhooks.validateWebhook()", () => {
  let client: AkahuClient;
  let mockApi: MockAdapter;
  const testKeyId = 2;

  beforeEach(() => {
    // Setup a new AkahuClient instance and attach an adapter to mock out axios calls.
    client = new AkahuClient({ appToken: 'app_token_123', appSecret: 'hunter2' });
    mockApi = new MockAdapter((client as any).axios);

    // Mock API response with public key
    mockApi.onGet(`/keys/${testKeyId}`)
      .reply(200, { success: true, item: testPubKey });
  });

  test("validateWebhook() returns deserialized payload for valid webhook request", async () => {
    const result = await client.webhooks.validateWebhook(testKeyId,
                                                         testWebhookSignature,
                                                         testWebhookBody);
    expect(result).toEqual(testWebhookPayload);
  });

  test("validateWebhook() returns false for invalid webhook signature", async () => {
    const result = await client.webhooks.validateWebhook(testKeyId,
                                                         sign('abcd'),
                                                         testWebhookBody);
    expect(result).toBe(false);
  });

  test("validateWebhook() caches the public key using the default cache", async () => {
    // WebhooksResource caches using a local object by default
    const cacheStore = (client.webhooks as any).defaultKeyCache._cache;
    
    // Cache is initially empty
    expect(cacheStore.akahu__webhook_key).toBeUndefined()

    // Perform webhook validation
    await client.webhooks.validateWebhook(testKeyId, testWebhookSignature, testWebhookBody);

    // The public key was retrieved from API
    expect(mockApi.history.get.length).toBe(1);

    // Cache is populated with key data
    const { id, key } = JSON.parse(cacheStore.akahu__webhook_key);
    expect(id).toEqual(testKeyId);
    expect(key).toEqual(testPubKey);

    // Perform webhook validation a second time
    await client.webhooks.validateWebhook(testKeyId, testWebhookSignature, testWebhookBody);

    // The public key was retrieved from cache (no increase in request count)
    expect(mockApi.history.get.length).toBe(1);
  });

  test("validateWebhook() caches the public key using the configured cache", async () => {
    // Implement our own cache
    let cachedValue: string | undefined;
    
    // Keep track of get and set calls
    const calls: Record<string, string[][]> = {
      get: [],
      set: [],
    }

    // Custom cache interface
    const cache = {
      get: (k: string) => {
        calls.get.push([k]);
        return cachedValue;
      },
      set: (k: string, v: string) => {
        calls.set.push([k, v]);
        cachedValue = v
      },
    };

    const testCacheConfig = { cache, key: 'customCacheKey' };

    // Perform webhook validation passing in custom cache
    await client.webhooks.validateWebhook(
      testKeyId,
      testWebhookSignature,
      testWebhookBody,
      testCacheConfig
    );

    // The public key was retrieved from API
    expect(mockApi.history.get.length).toBe(1);

    // Verify that our custom cache is populated with key data
    let id, key;
    if (typeof cachedValue !== 'undefined') {
      ({ id, key } = JSON.parse(cachedValue));
    }

    expect(id).toEqual(testKeyId);
    expect(key).toEqual(testPubKey);
    expect(calls.get).toEqual([['customCacheKey']])
    expect(calls.set).toEqual([['customCacheKey', cachedValue]])

    // Perform webhook validation a second time
    await client.webhooks.validateWebhook(
      testKeyId,
      testWebhookSignature,
      testWebhookBody,
      testCacheConfig
    );

    // API was not hit (no increase in request count)
    expect(mockApi.history.get.length).toBe(1);

    // Key was retreived from cache
    expect(calls.get).toEqual([['customCacheKey'], ['customCacheKey']])
  });


  test("validateWebhook() throws an error if requested key id is older than cached key id", async () => {
    const cache = {
      // get() returns key with id > than testKeyId
      get: (_: string) => JSON.stringify({ id: 3, key: 'abc', lastRefreshed: new Date() }),
      // set() is a no-op
      set: (_: string, __: string) => undefined,
    };

    await expect(
      () =>
        client.webhooks.validateWebhook(
          testKeyId,
          testWebhookSignature,
          testWebhookBody,
          { cache }
        )
    ).rejects.toThrow(/Webhook signing key \(id: 2\) has expired\..+/);
  });


  test("validateWebhook() ignores cached keys more than maxAgeMs old", async () => {
    const maxAgeMs = 1000 * 60 * 60;  // 1 hour
    const justExpired = new Date(Date.now() - maxAgeMs - 1).toISOString();
    let wasGetCalled = false;

    // Cached value is 'expired': lastRefreshed timestamp is more than maxAgeMs ago.
    let cachedValue = JSON.stringify({ id: 2, key: 'test', lastRefreshed: justExpired });

    const testCacheConfig = {
      cache: {
        get: (_: string) => { wasGetCalled = true; return cachedValue },
        // set() is a no-op
        set: (_: string, v: string) => { cachedValue = v },
      },
      maxAgeMs,
    }

    // Run webhook validation - pass in our custom cacheConfig
    await client.webhooks.validateWebhook(testKeyId, testWebhookSignature,
                                          testWebhookBody, testCacheConfig);
    
    // Sanity check - cache.get() was called
    expect(wasGetCalled).toBe(true);
    // But key was rejected and instead updated from the API
    expect(mockApi.history.get.length).toBe(1);
    // Then the cache was updated with the refreshed value
    const { id, key, lastRefreshed } = JSON.parse(cachedValue);
    expect(id).toBe(testKeyId);
    expect(key).toEqual(testPubKey);
    expect(Date.now() - Date.parse(lastRefreshed)).toBeLessThan(10);
  });
});