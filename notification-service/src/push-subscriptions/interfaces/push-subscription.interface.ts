export interface IPushSubscription {
  userId: number;
  endpoint: string;
  expirationTime?: number;
  auth: string;
  p256dh: string;
  createdAt: Date;
  updatedAt: Date;
}
