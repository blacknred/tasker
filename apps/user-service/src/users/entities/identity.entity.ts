import {
  BeforeCreate,
  Entity,
  Enum,
  Index,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';

import { NotificationMethod } from '../users/types/user.type';
import { User } from './user.entity';

@Entity({ tableName: 'identity' })
export class Identity {
  @Property({ unique: true, check: 'length(email) >= 5' })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property()
  isAdmin = false;

  @Property()
  isUnlimited = false;

  @Property({ length: 3, check: 'length(currency) == 3' })
  currency = 'USD';

  @Property({ length: 5, check: 'length(locale) == 5' })
  locale!: string;

  @Enum({
    items: () => NotificationMethod,
    default: NotificationMethod.EMAIL,
  })
  notificationMethod: NotificationMethod = NotificationMethod.EMAIL;

  @Index({ name: 'identity_user_id_idx' })
  @OneToOne()
  user: User;

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  constructor(identity?: Partial<Identity>) {
    Object.assign(this, identity);
  }
}
