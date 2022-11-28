/**
 * Akahu category metadata returned by /categories endpoints.
 */
export type Category = {
  _id: string;
  name: string;
  groups: {
    [groupingKey: string]: {
      _id: string;
      name: string;
    };
  };
};
