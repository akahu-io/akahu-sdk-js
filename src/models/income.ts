export type IncomeTypes =
  | "SALARY"
  | "BENEFIT"
  | "RENT"
  | "INTEREST"
  | "OFFSHORE"
  | "OTHER_INCOME"
  | "DEPOSIT";

export type RecurringIncomeFrequencyTypes = "WEEKLY" | "BIWEEKLY" | "MONTHLY";
export type NonRecurringIncomeFrequencyTypes = "IRREGULAR" | "INACTIVE";

export type IncomeFrequencyTypes =
  | RecurringIncomeFrequencyTypes
  | NonRecurringIncomeFrequencyTypes;

export type IncomeBase = {
  /**
   * The unique id for the income
   */
  _id: string;
  /**
   * The unique id of the account that the income is associated with.
   */
  _account: string;
  /**
   * The ISO 8601 timestamp of the start date for this income query.
   */
  start: string;
  /**
   * The ISO 8601 timestamp of the end date for this income query.
   */
  end: string;
  /**
   * The clean name for this income source.
   */
  name: string;
  /**
   * The income type
   */
  type: IncomeTypes;
  /**
   * The frequency of income payments. WEEKLY, BIWEEKLY and MONTHLY frequency determines that this
   * income is recurring and is currently active. INACTIVE means that this income did meet the
   * criteria to be recurring at some time in the past but currently is not, for example this may be
   * income for a past job. IRREGULAR means these payments do not follow a recurring pattern.
   *
   */
  frequency: IncomeFrequencyTypes;
  /**
   * The frequency of income payments. WEEKLY, BIWEEKLY and MONTHLY frequency determines that this
   * income is recurring and is currently active. INACTIVE means that this income did meet the
   * criteria to be recurring at some time in the past but currently is not, for example this may be
   * income for a past job. IRREGULAR means these payments do not follow a recurring pattern.
   *
   */
  summary: {
    /**
     * The max value of all the credits assigned to this income source.
     */
    max: number;
    /**
     * The average value of all the credits assigned to this income source.
     */
    mean: number;
    /**
     * The median value of all the credits assigned to this income source.
     */
    median: number;
    /**
     * The minimum value of all the credits assigned to this income source.
     */
    min: number;
    /**
     * The summed value of all the credits assigned to this income source.
     */
    total: number;
    /**
     * The mode value of all the credits assigned to this income source.
     */
    mode: number[];
    occurrences: {
      /**
       * The number of credit transactions for this income source in this period.
       */
      count: number;
      /**
       * The ISO 8601 timestamp of when the first credit transaction in this income source
       * transaction was created by the bank
       */
      first: string;
      /**
       * The ISO 8601 timestamp of when the last credit transaction in this income source
       * transaction was created by the bank
       */
      last: string;
    };
  };
  /**
   * A simplified transaction model used to show the transactions within this income source.
   * This property is only visible if you have the TRANSACTIONS permission.
   * To get the full transaction object use the Transactions API.
   */
  transactions: {
    /**
     * The unique id for the transaction
     */
    _id: string;
    /**
     * The date that the transaction was posted as reported by the bank integration. Formatted as an
     * ISO 8601 timestamp.
     */
    date: string;
    /**
     * The transaction description as reported by the bank integration.
     */
    description: string;
    /**
     * How much money this transaction was for
     */
    amount: number;
  }[];
};

export type RecurringIncome = IncomeBase & {
  frequency: RecurringIncomeFrequencyTypes;
  /**
   * An indication of the stability of this income source. This object is only included if the
   * income frequency is recurring (frequency is WEEKLY, BIWEEKLY or MONTHLY).
   */
  stability: {
    /**
     * Standard deviation of the difference in days between payments. The closer this is to 0,
     * the more regular the payments are. Less than 1 is a good indication that this income is bein
     * paid regularly.
     */
    payment_regularity: number;
    /**
     * Standard deviation of the difference in amounts between payments. The closer this is to 0
     * this is means the more consistent the payment amounts are. Less than 1 is a good indication
     * that the payment amounts are consistent.
     */
    payment_amount: number;
  };
  /**
   * Projections for this income source. This object is only included if the income frequency is
   * recurring and is active (frequency is WEEKLY, BIWEEKLY or MONTHLY).
   */
  projections: {
    /**
     * Projected yearly net income for this income source.
     */
    yearly_net_income: number;
    /**
     * Projected day of the week that income is received.
     */
    pay_day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
    /**
     * The ISO 8601 timestamp of the next day income is projected to be received.
     */
    next_date: string;
    /**
     * Projected amount of the next payment.
     */
    next_payment_amount: number;
    /**
     * Lower and upper bound of an estimated gross amount for this income if it was subject to usual
     * NZ Salary deductions. This is a fairly wide range since it takes into account all possible
     * values for deductions such as PAYE, ACC and Kiwisaver.
     */
    yearly_gross_range: number[];
  };
};

export type NonRecurringIncome = IncomeBase & {
  frequency: NonRecurringIncomeFrequencyTypes;
};

/**
 * A transaction object as returned by the /transactions endpoint.
 */
export type Income = RecurringIncome | NonRecurringIncome;

/**
 * Query parameters that will be used to filter transaction results.
 */
export type IncomeQueryParams = {
  /**
   * The start date of the query as an ISO 8601 string.
   *
   * @defaultValue `365 days ago`
   */
  start?: string;
  /**
   * The end date of the query as an ISO 8601 string.
   *
   * @defaultValue `today`
   */
  end?: string;
};
