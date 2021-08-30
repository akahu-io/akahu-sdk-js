/**
 * The result of an Akahu identity verificaion request.
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
