import { BaseResource } from "./base";
import { AkahuWebhookValidationError } from "../errors";

import type {
  Webhook,
  WebhookPayload,
  WebhookEvent,
  WebhookCreateParams,
  WebhookEventQueryParams,
} from "../models/webhooks";

type CryptoModule = typeof import("crypto");

// crypto may not be available on all platforms (e.g React Native).
// This is ok as we only need it server side. We just need to handle the import conditionally.
let crypto: CryptoModule | undefined;

try {
  crypto = require("crypto");
} catch (e) {}

/**
 * Setter and getter interface to enable external/shared caching of webhook
 * signing keys.
 *
 * Accessor functions may be async (by returning a Promise) or sync (by returning a value).
 *
 * See the project README for example usage.
 *
 * @category API client
 */
export interface WebhookSigningKeyCache {
  get(key: string): string | null | Promise<string | null>;
  set(key: string, value: string): void | Promise<void>;
}

/**
 * @category API client config
 */
export type WebhookCacheConfig = {
  cache: WebhookSigningKeyCache;
  key: string;
  maxAgeMs: number;
};

type CachedKeyData = {
  id: number;
  key: string;
  lastRefreshed: string;
};

/**
 * Default in-memory cache for caching the webhook signing key.
 */
class DefaultKeyCache implements WebhookSigningKeyCache {
  private readonly _cache: Record<string, string> = {};

  async get(key: string): Promise<string | null> {
    return this._cache[key] ?? null;
  }

  async set(key: string, value: string): Promise<void> {
    this._cache[key] = value;
  }
}

/**
 * Utilities for managing, retrieving, and validating webhooks.
 *
 * {@link https://developers.akahu.nz/docs/reference-webhooks}
 *
 * @category Resource
 */
export class WebhooksResource extends BaseResource {
  private defaultKeyCache = new DefaultKeyCache();

  /**
   * Gets active webhooks for the user associated with the specified `token`.
   *
   * {@link https://developers.akahu.nz/reference/get_webhooks}
   */
  public async list(token: string): Promise<Webhook[]> {
    return await this._client._apiCall<Webhook[]>({
      path: "/webhooks",
      auth: { token },
    });
  }

  /**
   * Subscribe to a webhook.
   *
   * @returns The newly created webhook id.
   *
   * {@link https://developers.akahu.nz/reference/post_webhooks}
   */
  public async subscribe(
    token: string,
    webhook: WebhookCreateParams
  ): Promise<string> {
    return await this._client._apiCall<string>({
      path: "/webhooks",
      method: "POST",
      auth: { token },
      data: webhook,
    });
  }

  /**
   * Unsubscribe from a previously created webhook.
   *
   * {@link https://developers.akahu.nz/reference/delete_webhooks-id}
   */
  public async unsubscribe(token: string, webhookId: string): Promise<void> {
    return await this._client._apiCall<void>({
      path: `/webhooks/${webhookId}`,
      method: "DELETE",
      auth: { token },
    });
  }

  /**
   * List all webhook events with the specified status in the specified date
   * range (defaults to last 30 days).
   *
   * {@link https://developers.akahu.nz/reference/get_webhook-events}
   */
  public async listEvents(
    query: WebhookEventQueryParams
  ): Promise<WebhookEvent[]> {
    return await this._client._apiCall<WebhookEvent[]>({
      path: "/webhook-events",
      auth: { basic: true },
      query,
    });
  }

  /**
   * Get a webhook signing public-key by id.
   *
   * {@link https://developers.akahu.nz/reference/get_keys-id}
   */
  public async getPublicKey(keyId: string | number): Promise<string> {
    return await this._client._apiCall<string>({
      path: `/keys/${keyId}`,
      auth: { basic: true },
    });
  }

  /**
   * Helper to validate a webhook request payload.
   *
   * See the project README for example usage.
   *
   * @returns The deserialized webhook payload after successful validation
   *
   * @throws {@link AkahuWebhookValidationError}
   * if validation of the webhook fails due to invalid signature or expired signing key.
   *
   * @throws {@link AkahuErrorResponse}
   * if the client fails to fetch the specified signing key from the Akahu API.
   *
   * {@link https://developers.akahu.nz/docs/reference-webhooks}
   */
  public async validateWebhook(
    keyId: string | number,
    signature: string,
    webhookRequestBody: string,
    cacheConfig: Partial<WebhookCacheConfig> = {}
  ): Promise<WebhookPayload> {
    // Coerce keyId as a number
    const _keyId = Number(keyId);

    // Validate that keyId is an integer. Includes null check because Number(null) === 0
    if (!Number.isInteger(_keyId) || keyId === null) {
      throw new AkahuWebhookValidationError(
        `Can't validate webhook request. keyId must be an integer (received ${keyId}).`
      );
    }

    // Initialize cache config with defaults
    const _cacheConfig = {
      cache: this.defaultKeyCache,
      key: "akahu__webhook_key",
      maxAgeMs: 24 * 60 * 60 * 1000, // 24 hours
      ...cacheConfig,
    };

    // Get the public key matching keyId - either from cache or API lookup
    const publicKey = await this._getPublicKey(_keyId, _cacheConfig);

    // Validate the webhook signature using the retreived public key
    const isValid = this._validateWebhookSignature(
      publicKey,
      signature,
      webhookRequestBody
    );

    if (!isValid) {
      throw new AkahuWebhookValidationError(
        "Webhook signature verificaton failed."
      );
    }

    return JSON.parse(webhookRequestBody) as WebhookPayload;
  }

  /**
   * Get the public key (by id) to validate a webhook signature.
   * The key will be retrieved from cache if possible, falling back to API lookup.
   * If a cached key exists with a newer id, an error will be thrown, as the existence of a newer
   * key implies that the key has been rotated and the requested key is no longer valid.
   *
   * {@link https://developers.akahu.nz/docs/reference-webhooks#caching}
   */
  private async _getPublicKey(
    keyId: number,
    cacheConfig: WebhookCacheConfig
  ): Promise<string> {
    // Attempt to lookup key from cache
    const keyDataFromCache = await this._getPublicKeyFromCache(cacheConfig);

    // Validate the cached key matches
    if (keyDataFromCache !== null) {
      const { id, key } = keyDataFromCache;

      // Validate that the cached key has same id as requested key
      if (keyId === id) {
        return key;
      }

      // Throw an error if the requested key has been superseded
      if (keyId < id) {
        throw new AkahuWebhookValidationError(
          `Webhook signing key (id: ${keyId}) has expired. Unable to validate webhook.`
        );
      }

      // Fallback to lookup via API
    }

    // Lookup key data from API
    const freshKeyData: CachedKeyData = {
      id: keyId,
      lastRefreshed: new Date().toISOString(),
      key: await this.getPublicKey(keyId),
    };

    // Cache the updated key data
    await this._cacheKeyData(freshKeyData, cacheConfig);

    return freshKeyData.key;
  }

  /**
   * Lookup current active public key from the cache.
   * If the key has been in the cache for more than `maxAgeMs` milliseconds, it is considered
   * stale, and will be ignored - causing it to be re-fetched from Akahu. `maxAgeMs` defaults to 24 hours.
   *
   * {@link https://developers.akahu.nz/docs/reference-webhooks#caching}
   */
  private async _getPublicKeyFromCache(
    cacheConfig: WebhookCacheConfig
  ): Promise<CachedKeyData | null> {
    const { cache, key: cacheKey, maxAgeMs } = cacheConfig;

    // Lookup key data from cache
    const rawFromCache = await cache.get(cacheKey);

    // Cache hit
    if (typeof rawFromCache === "string") {
      let keyData: CachedKeyData | undefined;

      // Deserialize key data JSON from cache
      try {
        keyData = JSON.parse(rawFromCache);
      } catch (e) {
        // Warn but no error if invalid JSON in cache data
        console.warn(
          `akahu-sdk: Failed to deserialize webhook key data from cache (key: ${cacheKey}).`
        );
      }

      // Validate the key data from cache
      if (typeof keyData !== "undefined") {
        // Ensure that the cache is at most `maxAgeMs` old
        const cacheAgeMs = Date.now() - Date.parse(keyData.lastRefreshed);
        // NaN check in case lastRefreshed is invalid date string or undefined somehow
        if (!Number.isNaN(cacheAgeMs) && cacheAgeMs < maxAgeMs) {
          return keyData;
        }
      }
    }

    // Cache miss or invalid cache data
    return null;
  }

  /**
   * Add the public key that has been fetched from the API to the cache.
   *
   * {@link https://developers.akahu.nz/docs/reference-webhooks#caching}
   */
  private async _cacheKeyData(
    keyData: CachedKeyData,
    cacheConfig: WebhookCacheConfig
  ): Promise<void> {
    const { cache, key } = cacheConfig;
    await cache.set(key, JSON.stringify(keyData));
  }

  /**
   * Validate a webhook and associated signature using the public key fetched from the Akahu API.
   *
   * {@link https://developers.akahu.nz/docs/reference-webhooks#verification}
   */
  private _validateWebhookSignature(
    publicKey: string,
    signature: string,
    webhookBody: string
  ): boolean {
    if (typeof crypto === "undefined") {
      throw new Error(
        "Webhook validation is only supported on Node.js environments."
      );
    }

    const verify = crypto.createVerify("sha256");
    verify.update(webhookBody);
    verify.end();

    return verify.verify(publicKey, signature, "base64");
  }
}
