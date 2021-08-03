interface BaseTransaction {
  _id: string,
  _account: string,
  _connection: string,

  created_at: string,
  updated_at: string,
  date: string,
  hash: string,
  description: string,

  amount: number,
  balance: number,

  type: (
    'CREDIT' |
    'DEBIT' |
    'PAYMENT' |
    'TRANSFER' |
    'STANDING ORDER' |
    'EFTPOS' |
    'INTEREST' |
    'FEE' |
    'CREDIT CARD' |
    'TAX DIRECT DEBIT' |
    'DIRECT CREDIT' |
    'ATM' |
    'LOAN'
  ),
}


interface PhysicalOutletAddress {
  pretty: string,

  address?: {
    complete?: string,
    street_number?: string,
    route?: string,
    sub_locality?: string,
    locality?: string,
    country?: string,
    postcode?: string,
  }

  coordinates?: {
    lat: number,
    long: number,
  }

  map_image?: string,
  accuracy?: string,
}


interface WebOutletAddress {
  pretty: string,
  url: string,
}


interface EnrichedTransaction extends BaseTransaction {
  outlet: { _id: string, name: string, location?: PhysicalOutletAddress | WebOutletAddress },
  merchant: { _id: string, name: string },
  category: { _id: string, components: { name: string, type: string }[] },
  meta: {
    particulars?: string,
    code?: string,
    reference?: string,
    other_account?: string,
    conversion?: string,
    logo?: string,
  },
}

export type Transaction = BaseTransaction | EnrichedTransaction;

export type TransactionQueryParams = {
  start?: string,
  end?: string,
  cursor?: string,
}