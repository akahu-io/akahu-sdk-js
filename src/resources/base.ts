import type { AkahuClient } from "../client";

/**
 * @internal
 */
export class BaseResource {
  protected readonly _client: AkahuClient;

  /**
   * @internal
   */
  constructor(client: AkahuClient) {
    this._client = client;
  }
}
