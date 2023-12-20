/**
 * User data as returned from the /users/me endpoint
 */
export type User = {
  /**
   * Akahu's unique identifier for this user.
   */
  _id: string;
  /**
   * The email address that this user used to register with Akahu.
   *
   * This will always be present if your app has the `AKAHU` scope.
   */
  email?: string;
  /**
   * The user's preferred name, if they have provided it by updating their
   * profile at https://my.akahu.nz. This will not be available for most users.
   */
  preferred_name?: string;
  /**
   * The timestamp that the user first granted your app access to their accounts
   * (i.e. the time at which your user token was issued). Formatted as an ISO
   * 8601 timestamp.
   */
  access_granted_at: string;
  /**
   * The user's first name, if they have provided it.
   *
   * @deprecated Only present on some legacy users. You probably want
   * [party](https://developers.akahu.nz/reference/get_parties) data instead,
   * which is sourced from the user's connected financial institution(s).
   */
  first_name?: string;
  /**
   * The user's last name, if they have provided it.
   *
   * @deprecated Only present on some legacy users. You probably want
   * [party](https://developers.akahu.nz/reference/get_parties) data instead,
   * which is sourced from the user's connected financial institution(s).
   */
  last_name?: string;
  /**
   * @deprecated This field is unused. You probably want
   * [party](https://developers.akahu.nz/reference/get_parties) data instead,
   * which is sourced from the user's connected financial institution(s).
   */
  mobile?: undefined;
};
