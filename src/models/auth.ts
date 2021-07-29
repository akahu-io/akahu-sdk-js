
export interface AuthorizationToken {
  accessToken: string,
  tokenType: string,
  expiresIn: number,
  scopes: string[],
}
