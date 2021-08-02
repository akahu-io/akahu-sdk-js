
export interface AuthorizationToken {
  access_token: string,
  token_type: 'bearer',
  expires_in: number,
  scopes: string,
}
