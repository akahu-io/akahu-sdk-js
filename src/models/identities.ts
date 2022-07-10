/**
 * The result of an Akahu identity verification request.
 */
export type IdentityResult = {
  _id: string;
  status: "PROCESSING" | "COMPLETE" | "REVIEW" | "ERROR";
  created_at: string;
  updated_at: string;
  expires_at: string;
  source: Record<string, any>;
  errors?: string[];
  identities?: Record<string, any>[];
  addresses?: Record<string, any>[];
  accounts?: Record<string, any>[];
};

export type IdentityVerifyNameQuery = {
  /**
   * The user's given name which will be verified against the Akahu identity
   * result.
   */
  given_name?: string;
  /**
   * The user's middle name which will be verified against the Akahu identity
   * result. If the user has multiple middle names, provide them all separated
   * by a space.
   */
  middle_name?: string;
  /**
   * The user's family name which will be verified against the Akahu identity
   * result.
   */
  family_name: string;
};

/** Name verification match where the source data is the account holder name. */
export type AccountHolderNameVerificationSource = {
  type: "HOLDER_NAME";
  match_result: "MATCH" | "PARTIAL_MATCH";
  /** Metadata from the matched account */
  meta: {
    /** The account name */
    name: string;
    /** The account holder name */
    holder: string;
    /** Formatted account number */
    account_number: string;
    /** The address associated with the account */
    address?: string;
    /** The name of the bank */
    bank: string;
    /** Branch details (if available) */
    branch?: {
      _id: string;
      description: string;
      phone: string;
      address: {
        line1: string;
        line2?: string;
        line3?: string;
        city: string;
        country: "New Zealand";
        postcode: string;
      };
    };
  };
  verification: {
    given_name: boolean;
    given_initial: boolean;
    middle_name: boolean;
    middle_initial: boolean;
    family_name: boolean;
  };
};

/**
 * Name verification match where the source data is the registered name of the
 * party who has authenticated with the financial institution.
 *
 * This data is sourced from the profile information held by connected institution
 * rather than any specific account held within.
 */
export type PartyNameVerificationSource = {
  type: "PARTY_NAME";
  match_result: "MATCH" | "PARTIAL_MATCH";
  /** The matched party name data */
  meta: {
    type: "INDIVIDUAL" | "JOINT" | "TRUST" | "LLC";
    initials?: string[];
    given_name?: string;
    middle_name?: string;
    family_name: string;
    full_name: string;
    prefix?: string;
    gender?: string;
  };
  verification: {
    given_name: boolean;
    given_initial: boolean;
    middle_name: boolean;
    middle_initial: boolean;
    family_name: boolean;
  };
};

export type IdentityVerifyNameResult = {
  sources: (
    | AccountHolderNameVerificationSource
    | PartyNameVerificationSource
  )[];
};
