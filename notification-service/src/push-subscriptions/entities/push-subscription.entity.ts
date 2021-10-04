import { Column, Entity, ObjectIdColumn, UpdateDateColumn } from 'typeorm';
import { IPushSubscription } from '../interfaces/push-subscription.interface';

@Entity()
export class PushSubscription implements IPushSubscription {
  @ObjectIdColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @Column({ type: 'text' })
  endpoint: string;

  @Column({ type: 'int', nullable: true })
  expirationTime?: number;

  @Column({ type: 'text' })
  auth: string;

  @Column({ type: 'text' })
  p256dh: string;

  @UpdateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
