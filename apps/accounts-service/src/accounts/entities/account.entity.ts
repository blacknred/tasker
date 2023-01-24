import {
  BeforeCreate,
  Entity,
  Enum,
  Index,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  IAccount,
  NotificationMethod,
  SecuredNotificationMethod,
} from '@taskapp/shared';
import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

@Entity({ tableName: 'account' })
export class Account extends AggregateRoot implements IAccount {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Index({ name: 'account_username_idx' })
  @Property({ unique: true, length: 30, check: 'length(username) >= 5' })
  username!: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Property({
    nullable: true,
    check: 'image ~ "^(https?://.*.(?:png|gif|webp|jpeg|jpg))$"',
  })
  image?: string;

  @Property({ lazy: true, nullable: true })
  details?: string;

  @Index({ name: 'account_email_idx' })
  @Property({ lazy: true, unique: true, check: 'length(email) >= 5' })
  email!: string;

  @Property({ lazy: true, hidden: true })
  password!: string;

  @Property({
    lazy: true,
    nullable: true,
    check: "phone ~ '^(+|00)[1-9][0-9 -().]{7,32}$'",
  })
  phone?: string;

  @Property({ lazy: true })
  isAdmin = false;

  @Property({ lazy: true })
  isConfirmed = false;

  @Property({ lazy: true })
  is2faEnabled = false;

  @Property({ lazy: true, length: 3, check: 'length(currency) == 3' })
  currency = 'USD';

  @Property({ lazy: true, length: 5, check: 'length(locale) == 5' })
  locale = 'en_US';

  @Property({ lazy: true, nullable: true })
  deletedAt?: Date;

  @Index({ name: `account_created_at_idx` })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @Enum({
    lazy: true,
    items: () => NotificationMethod,
    default: NotificationMethod.NONE,
  })
  notificationMethod: NotificationMethod = NotificationMethod.NONE;

  @Enum({
    lazy: true,
    items: () => SecuredNotificationMethod,
    default: NotificationMethod.EMAIL,
  })
  securedNotificationMethod: SecuredNotificationMethod =
    SecuredNotificationMethod.EMAIL;

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  constructor(instance?: Partial<Account>) {
    super();
    Object.assign(this, instance);
  }
}
