import {
  BeforeCreate,
  Collection,
  Entity,
  Enum,
  Index,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import {
  IUser,
  NotificationMethod,
  SecuredNotificationMethod,
} from '@taskapp/shared';
import * as bcrypt from 'bcryptjs';
import { v4 } from 'uuid';
import { Teammate } from '../../teammates/entities/teammate.entity';

@Entity({ tableName: 'user' })
export class User extends AggregateRoot implements IUser {
  @PrimaryKey()
  id: string = v4();

  @Index({ name: 'user_username_idx' })
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

  @Index({ name: 'user_email_idx' })
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

  @Index({ name: `user_created_at_idx` })
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

  @OneToMany({
    lazy: true,
    entity: () => Teammate,
    mappedBy: 'user',
  })
  roles = new Collection<Teammate>(this);

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  constructor(instance?: Partial<User>) {
    super();
    Object.assign(this, instance);
  }

  //   killEnemy(enemyId: string) {
  //     // logic
  //     this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  //   }
}
