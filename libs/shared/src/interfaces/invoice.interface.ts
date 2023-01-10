import type { IBase, ID } from './base.interface';

export enum InvoiceType {
  UNLIMITED_PROJECT = 'UNLIMITED_PROJECT',
}

export interface ICharge {
  type: InvoiceType;
  charge: number;
}

export interface IInvoice extends IBase {
  type: InvoiceType;
  targetId: ID;
  total: number;
  isPaid: boolean;
}
