/**
 * User data as returned from the /users/me endpoint
 */
export type User = {
  _id: string;
  access_expires_at: string;
  first_name?: string;
  last_name?: string;
  preferred_name?: string;
  email?: string;
  mobile?: string;
};
