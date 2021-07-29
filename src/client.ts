import { AuthorizationToken } from "./models/auth";


export interface AkahuClientOptions {

}


export const defaultClientOptions = {

};


export default class AkahuClient {
  private readonly _appToken: string;
  private readonly _clientOptions: AkahuClientOptions;

  public readonly auth: OAuthResource;


  constructor(appToken: string, options?: AkahuClientOptions) {
    this._appToken = appToken;
    this._clientOptions = options || {};
    
    // Initialise client resources
    this.auth = new OAuthResource(this);
  }
}


class BaseResource {
  protected readonly _client: AkahuClient;

  constructor(client: AkahuClient) {
    this._client = client;
  }
}


class OAuthResource extends BaseResource {
  public exchange(params): Promise<AuthorizationToken> {
    // ...
  }
}


