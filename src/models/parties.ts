/**
 * The user's name as sourced from their connected institution(s).
 *
 * @category Parties
 */
export type PartyName = {
  /**
   * The name value in the format provided by the connected institution(s).
   * e.g. John Smith, Mr John Smith, MR JOHN SMITH
   */
  value: string;
  /**
   * An array of Akahu connection ids indicating the institution(s) from which
   * this data was sourced. When multiple connection ids are present, this
   * indicates that identical values were sourced from multiple institutions and
   * aggregated into this single result.
   */
  sources: string[];
};

/**
 * The user's date of birth as sourced from their connected institution(s).
 *
 * @category Parties
 */
export type PartyDob = {
  /**
   * The user's date of birth in the format YYYY-MM-DD.
   */
  value: string;
  /**
   * An array of Akahu connection ids indicating the institution(s) from which
   * this data was sourced. When multiple connection ids are present, this
   * indicates that identical values were sourced from multiple institutions and
   * aggregated into this single result.
   */
  sources: string[];
};

/**
 * The user's phone number as sourced from their connected institution(s).
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
  /**
   * An array of Akahu connection ids indicating the institution(s) from which
   * this data was sourced. When multiple connection ids are present, this
   * indicates that identical values were sourced from multiple institutions and
   * aggregated into this single result.
   */
  sources: string[];
};

/**
 * The user's email address as sourced from their connected institution(s).
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
  /**
   * An array of Akahu connection ids indicating the institution(s) from which
   * this data was sourced. When multiple connection ids are present, this
   * indicates that identical values were sourced from multiple institutions and
   * aggregated into this single result.
   */
  sources: string[];
};

/**
 * The user's address as sourced from their connected institution(s).
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
  /**
   * An array of Akahu connection ids indicating the institution(s) from which
   * this data was sourced. When multiple connection ids are present, this
   * indicates that identical values were sourced from multiple institutions and
   * aggregated into this single result.
   */
  sources: string[];
};

/**
 * The user's tax (IRD) number as sourced from their connected institution(s).
 *
 * @category Parties
 */
export type PartyTaxNumber = {
  subtype: "PRIMARY";
  /** The IRD number in the format XXX-XXX-XXX */
  value: string;
  /**
   * An array of Akahu connection ids indicating the institution(s) from which
   * this data was sourced. When multiple connection ids are present, this
   * indicates that identical values were sourced from multiple institutions and
   * aggregated into this single result.
   */
  sources: string[];
};

/**
 * Party data for the user that has been fetched from their connected accounts.
 *
 * All keys are optional depending on the permissions of your app. However if
 * your app has permission for a given type of party data (e.g. names), it will
 * always be included in the response. Note that the array may be empty if no
 * data of that type is available.
 *
 * @category Parties
 */
export type PartyData = {
  names?: PartyName[];
  dobs?: PartyDob[];
  phone_numbers?: PartyPhoneNumber[];
  email_addresses?: PartyEmail[];
  addresses?: PartyAddress[];
  tax_numbers?: PartyTaxNumber[];
};
