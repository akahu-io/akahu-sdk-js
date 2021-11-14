/**
 * OAuth2 token authorization response.
 */
export type AuthorizationToken = {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  scope: string;
};
