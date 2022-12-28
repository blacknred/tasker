import { IBase } from './base.interface';
import { IProjectPreview } from './project.interface';
import { IProfile } from './user.interface';

export enum InvoiceChargeType {
  UNLIMITED_PROJECT = 'UNLIMITED_PROJECT',
}

export interface IInvoiceCharge {
  type: InvoiceChargeType;
  //
  project: IProjectPreview;
}

export interface IInvoice extends IBase {
  charge: IInvoiceCharge;
  total: number;
  comment?: string;
  isPaid: boolean;
  //
  user: IProfile;
}
