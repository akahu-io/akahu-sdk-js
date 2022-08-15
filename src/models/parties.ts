/**
 * The user's name as sourced from the connected institution.
 *
 * @category Parties
 */
export type PartyName = {
  /**
   * The name value in the format provided by the connected institution.
   * e.g. John Smith, Mr John Smith, MR JOHN SMITH
   */
  value: string;
};

/**
 * The user's date of birth as sourced from the connected institution.
 *
 * @category Parties
 */
export type PartyDob = {
  /**
   * The user's date of birth in the format YYYY-MM-DD.
   */
  value: string;
};

/**
 * The user's phone number as sourced from the connected institution.
 *
 * @category Parties
 */
export type PartyPhoneNumber = {
  subtype: "MOBILE" | "HOME" | "WORK";
  verified: boolean;
  /**
   * The value of the phone number.
   */
  value: string;
};

/**
 * The user's email address as sourced from the connected institution.
 *
 * @category Parties
 */
export type PartyEmail = {
  subtype: "PRIMARY";
  verified: boolean;
  /**
   * The value of the email address.
   */
  value: string;
};

/**
 * The user's address as sourced from the connected institution.
 *
 * @category Parties
 */
export type PartyAddress = {
  subtype: "RESIDENTIAL" | "POSTAL";
  /** The raw address value from the connected institution. */
  value: string;
  /** A consistently formatted/normalised version of the address. */
  formatted: string;
  /** Individual components of the normalised address. */
  components: {
    street: string;
    suburb: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;
  };
  /**
   * Google Maps API Place ID for this address.
   *
   * {@link https://developers.google.com/maps/documentation/places/web-service/place-id}
   */
  google_maps_place_id: string;
};

/**
 * The user's tax (IRD) number as sourced from the connected institution.
 *
 * @category Parties
 */
export type PartyTaxNumber = {
  /** The IRD number in the format XXX-XXX-XXX */
  value: string;
};

/**
 * Identity data relating to the party that the user has logged-in to their
 * institution as when connecting accounts to Akahu. i.e. the user's "profile"
 * information at the connected institution.
 *
 * All keys are optional depending on the scopes granted to your app.
 *
 * @category Parties
 */
export type Party = {
  _id: string;
  /** The connection id identifying the institution that the data was sourced from */
  _connection: string;
  _user: string;
  type: "INDIVIDUAL" | "JOINT" | "TRUST" | "LLC";
  name?: PartyName;
  dob?: PartyDob;
  tax_number?: PartyTaxNumber;
  phone_numbers?: PartyPhoneNumber[];
  email_addresses?: PartyEmail[];
  addresses?: PartyAddress[];
};
