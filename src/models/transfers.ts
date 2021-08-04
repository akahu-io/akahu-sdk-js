type TransferStatus = (
  'READY'
  |'PENDING_APPROVAL'
  |'SENT'
  |'RECEIVED'
  |'DECLINED'
  |'ERROR'
  |'PAUSED'
  |'CANCELLED'
  |'SENT_TIMEOUT'
  |'SENT_ERROR'
);


export interface Transfer {
  _id: string,
  from: string,
  to: string,
  amount: number,
  sid: string,
  status: TransferStatus,
  status_text: string,
  final: boolean,
  cross_bank: boolean,
  timeline: { status: TransferStatus, time: string }[],
  created_at: string,
  updated_at: string,
}


export interface TransferCreateParams {
  from: string,
  to: string,
  amount: number,
}


export type TransferQueryParams = {
  start?: string,
  end?: string,
}