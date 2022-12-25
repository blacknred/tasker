export enum ExtraNotificationMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}
export interface INotification {
  url?: string;
  body: string;
  userId: number;
  createdAt: string;
}
