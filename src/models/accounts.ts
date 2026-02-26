import { ConnectionInfo } from "./connections";
import { PaymentConsentPayee, PaymentConsentPeriodicLimit } from "./payments";

export type AccountType =
  | "CHECKING"
  | "SAVINGS"
  | "CREDITCARD"
  | "LOAN"
  | "KIWISAVER"
  | "INVESTMENT"
  | "TERMDEPOSIT"
  | "FOREIGN"
  | "TAX"
  | "REWARDS"
  | "WALLET";

export type AccountAttribute =
  | "PAYMENT_TO"
  | "PAYMENT_FROM"
  | "TRANSFER_TO"
  | "TRANSFER_FROM"
  | "TRANSACTIONS";

export type AccountBalance = {
  /**
   * The (3 letter ISO 4217 currency code)[https://www.xe.com/iso4217.php] that this balance is in.
   */
  currency: string;
  /**
   * The current account balance.
   */
  current: number;
  /**
   * The balance that is currently available to the account holder.
   */
  available?: number;
  /**
   * The credit limit for this account. For example a credit card limit or an overdraft limit. This value is only present when provided directly by the connected financial institution.
   */
  limit?: number;
  /**
   * A boolean indicating whether this account is in unarranged overdraft.
   */
  overdrawn?: boolean;
};

export type AccountLoanDetails = {
  /**
   * The purpose of the loan, if we can't determine the purpose, this will be `UNKNOWN`
   */
  purpose: "HOME" | "PERSONAL" | "BUSINESS" | "UNKNOWN";
  /**
   * The type of loan, if we can't determine the type, this will be `UNKNOWN`
   */
  type: "TABLE" | "REDUCING" | "REVOLVING" | "UNKNOWN";
  /**
   * Interest rate information for the loan.
   */
  interest: {
    /**
     * The interest rate on the loan.
     */
    rate: number;
    /**
     * The type of interest rate.
     */
    type: "FIXED" | "FLOATING";
    /**
     * When this interest rate expires, if available.
     */
    expires_at?: string;
  };
  /**
   * Is the loan currently in an interest only period?
   */
  is_interest_only: boolean;
  /**
   * When the interest only period expires, if available.
   */
  interest_only_expires_at?: string;
  /**
   * The duration/term of the loan for it to be paid to completion from the start date of the loan.
   */
  term?:
    | {
        /**
         * The number of years the loan is for.
         */
        years?: number;
        /**
         * The number of months the loan is for.
         */
        months?: number;
      }
    | undefined;
  /**
   * When the loan matures, if available.
   */
  matures_at?: string;
  /**
   * The loan initial principal amount, this was the original amount borrowed.
   */
  initial_principal?: number;
  /**
   * Loan repayment information if available.
   */
  repayment?:
    | {
        /**
         * The frequency of the loan repayment.
         */
        frequency?:
          | "WEEKLY"
          | "FORTNIGHTLY"
          | "MONTHLY"
          | "QUARTERLY"
          | "BIANNUALLY"
          | "ANNUALLY";
        /**
         * The next repayment date, if available.
         */
        next_date?: string;
        /**
         * The next instalment amount.
         */
        next_amount: number;
      }
    | undefined;
};

export type AccountRefreshState = {
  /**
   * The ISO 8601 timestamp when the balance was last retrieved
   */
  balance?: string;
  /**
   * The ISO 8601 timestamp when other account metadata was last retrieved (any property apart from balance)
   */
  meta?: string;
  /**
   * The ISO 8601 timestamp when we last checked for and processed any new transactions. This flag may be missing when an account has first connected, as it takes a few seconds for new transactions to be processed.
   */
  transactions?: string;
  /**
   * The ISO 8601 timestamp when we last fetched identity data about the party who has authenticated with the financial institution when connecting this account.
   */
  party?: string;
};

export type AccountMeta = {
  /**
   * The account holder name
   */
  holder?: string | undefined;

  /**
   * Details about a loan account, if available.
   */
  loan_details?: AccountLoanDetails | undefined;

  [k: string]: any; // Catch-all for dynamic attributes
};

/**
 * A payment consent for an account, which may be used to initiate payments from that account.
 */
export type AccountPaymentConsent = {
  /**
   * The single payment limit for this consent, e.g. no more than $1000 per payment.
   */
  single_limit: number;
  /**
   * The periodic payment limit for a consent, e.g. no more than $50 daily
   */
  periodic_limit: PaymentConsentPeriodicLimit;
  /**
   * The list of payees that payments using this consent can be sent to, the to account for a payment must match the name and account number exactly.
   */
  payees: PaymentConsentPayee[];
};

/**
 * Account data returned by Akahu /account endpoints.
 */
export type Account = {
  /**
   * A unique identifier for the account in the Akahu system. It is always be prefixed by `acc_` so that you can tell that it belongs to an account.
   */
  _id: string;

  /**
   * The identifier of this account's predecessor.
   * This attribute is only present if the account has been migrated to an official
   * open banking connection from a classic Akahu connection.
   *
   * Read more [here](https://developers.akahu.nz/docs/official-open-banking).
   */
  _migrated?: string;

  /**
   * The authorisation identifier. Financial accounts are connected to Akahu via
   * an authorisation with the user's financial institution. Multiple accounts
   * can be connected during a single authorisation, causing them to have the
   * same authorisation identifier. This identifier can also be used to link a
   * specific account to identity data for the
   * [party](https://developers.akahu.nz/reference/get_parties) who completed
   * the authorisation.
   */
  _authorisation: string;

  /**
   * @deprecated Please use `_authorisation` instead.
   */
  _credentials: string;

  /**
   * Information about the financial institution where the account is held (eg. ANZ bank).
   */
  connection: ConnectionInfo;

  /**
   * The name of this account. If the connection allows customisation, the name will be the custom name (or nickname), eg. "Spending Account". Otherwise Akahu falls back to the product name, eg. "Super Saver".
   */
  name: string;

  /**
   * This tells you whether Akahu can currently sign in to the account to refresh it's data. It can be one of:
   *
   * - `ACTIVE` → Akahu can sign in and refresh this account.
   *
   * - `INACTIVE` → Akahu no longer has access to this account. This may be caused by the user revoking Akahu's access at the institution or changing their login credentials. When an account becomes `INACTIVE` your application should direct the the user back to the OAuth flow or to my.akahu.nz where they will be prompted to to re-establish this connection.
   */
  status: "ACTIVE" | "INACTIVE";

  /**
   * If the account has a well defined account number (eg. a bank account number, or credit card number) this will be defined here with a standard format across connections. Credit cards will have at least 8 digits redacted.
   */
  formatted_account?: string | undefined;

  /**
   * Type of account, Akahu provides specific bank account types, and falls back to more general types for other types of connection.
   * - `CHECKING` → An everyday spending account.
   * - `SAVINGS` → A savings account.
   * - `CREDITCARD` → A credit card.
   * - `LOAN` → A loan account.
   * - `KIWISAVER` → A KiwiSaver investment product.
   * - `INVESTMENT` → A general investment product.
   * - `TERMDEPOSIT` → A term deposit.
   * - `FOREIGN` → An account holding a foreign currency.
   * - `TAX` → An account with tax authorities.
   * - `REWARDS` → An account for rewards points, e.g. Fly Buys or True Rewards.
   * - `WALLET` → Available cash for investment or withdrawal from an investment provider.
   */
  type: AccountType;

  /**
   * The list of attributes indicates which abilities an account has. A list of:
   * - `TRANSACTIONS` → account has transactions and supports retrieval of these via Akahu.
   * - `TRANSFER_TO` → account can receive transfers from other accounts belonging to same set of credentials.
   * - `TRANSFER_FROM` → account can initiate transfers to other accounts belonging to the same set of credentials.
   * - `PAYMENT_TO` → account can receive payments from any Akahu account with the `PAYMENT_FROM` attribute.
   * - `PAYMENT_FROM` → account can initiate payments to any Akahu account with the `PAYMENT_TO` attribute.
   */
  attributes: AccountAttribute[];

  /**
   * The account balance
   */
  balance?: AccountBalance | undefined;

  /**
   * A list of authorised payment consents associated with this account.
   * 
   * This is only present for apps that have been migrated to support the new payment consent model.
   */
  payment_consents?: AccountPaymentConsent[] | undefined;

  /**
   * Akahu can refresh different parts of an account's data at different rates. The timestamps in the `refreshed` object tell you when that account data was last updated. This can be thought of as "Akahu's view of the account (balance/metadata/transactions) is up to date as of \$TIME".
   */
  refreshed?: AccountRefreshState | undefined;

  /**
   * Metadata regarding this account
   */
  meta?: AccountMeta | undefined;
};
