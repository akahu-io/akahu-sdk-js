export type PaymentStatus = (
  'READY'
  | 'PENDING_APPROVAL'
  | 'PAUSED'
  | 'SENT'
  | 'DECLINED'
  | 'ERROR'
  | 'CANCELLED'
);

export type Payment = {
  _id: string,
  from: string,
  to: {
    name: string,
    account_number: string,
  },
  amount: number,
  meta: {
    source: {
      code?: string,
      reference?: string,
    },
    destination: {
      code?: string,
      reference?: string,
    },
  },
  sid: string,
  status: PaymentStatus,
  status_text: string,
  final: true,
  timeline: {
    status: PaymentStatus,
    time: string,
    eta?: string,
  }[],
  created_at: string,
  updated_at: string,
};

export type PaymentCreateParams = {
  from: string,
  amount: number,
  to: {
    name: string,
    account_number: string,
  },
  meta?: {
    source?: {
      code?: string,
      reference?: string,
    },
    destination?: {
      code?: string,
      reference?: string,
    },
  },
}

export type PaymentQueryParams = {
  start?: string,
  end?: string,
}