import type { AkahuClient } from '../client';


export interface Paginated<T> {
  items: T[],
  cursor: { next?: string },
}


export class BaseResource {
  protected readonly _client: AkahuClient;

  constructor(client: AkahuClient) {
    this._client = client;
  }
}
