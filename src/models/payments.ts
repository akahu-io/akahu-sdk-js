interface Payee {
  name: string,
  account_number: string,
}


interface PaymentUserData {
  code?: string,
  reference?: string,
}


interface PaymentMeta {
  source: PaymentUserData,
  destination: PaymentUserData,
}


type PaymentStatus = (
  'READY'
  | 'PENDING_APPROVAL'
  | 'PAUSED'
  | 'SENT'
  | 'DECLINED'
  | 'ERROR'
  | 'CANCELLED'
);


export interface Payment {
  _id: string,
  from: string,
  to: Payee,
  amount: number,
  meta: PaymentMeta,
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


export interface PaymentCreateParams {
  from: string,
  amount: number,
  to: Payee,
  meta?: Partial<PaymentMeta>,
}


export type PaymentQueryParams = {
  start?: string,
  end?: string,
}