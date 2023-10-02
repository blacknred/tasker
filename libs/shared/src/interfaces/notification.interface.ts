import type { ID } from './base.interface';

export interface INotification {
  body: string;
  recipients: ID[];
  directRecipients: ID[];
  createdAt: string | Date;
}
