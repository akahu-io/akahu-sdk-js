import { Connection } from "./connections";

/**
 * Account data returned by Akahu /account endpoints.
 */
export type Account = {
  _id: string;
  _credentials: string;
  connection: Connection;
  name: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
  formatted_account: string;
  type: string;
  balance?: {
    current: number;
    available: number;
    limit: number;
    currency: string;
    overdrawn: boolean;
  };
  attributes?: (
    | "PAYMENT_TO"
    | "PAYMENT_FROM"
    | "TRANSFER_TO"
    | "TRANSFER_FROM"
    | "TRANSACTIONS"
  )[];
  branch?: {
    name: string;
    description?: string;
    phone?: string;
    address?: Record<string, string>;
  };
  refreshed?: {
    balance?: string;
    transactions?: string;
    meta?: string;
  };
  meta?: Record<string, any>;
  [k: string]: any; // Catch-all for dynamic attributes
};
