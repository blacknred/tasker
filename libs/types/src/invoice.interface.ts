export enum InvoiceChargeType {
  UNLIMITED_PROJECT = 'UNLIMITED_PROJECT',
}

export interface IInvoiceCharge {
  type: InvoiceChargeType;
  projectId: number;
}

export interface IInvoice {
  id: number;
  userId: number;
  charge: IInvoiceCharge;
  total: number;
  comment?: string;
  isPaid: boolean;
  createdAt: string;
}
