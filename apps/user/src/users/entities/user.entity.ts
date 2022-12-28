import {
  BeforeCreate,
  Entity,
  Enum,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '@taskapp/service-core';
import { ExtraNotificationMethod } from '@taskapp/types';
import * as bcrypt from 'bcryptjs';
import { Profile } from './profile.entity';

@Entity({ tableName: 'user' })
export class User extends BaseEntity<User> {
  @Property({ unique: true, check: 'length(email) >= 5' })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({ nullable: true })
  phone?: string;

  @Property()
  isAdmin = false;

  @Property({ hidden: true })
  isConfirmed = false;

  @Property({ length: 3, check: 'length(currency) == 3' })
  currency = 'USD';

  @Property({ length: 5, check: 'length(locale) == 5' })
  locale = 'en_US';

  @Property({ lazy: true, nullable: true })
  deletedAt?: Date;

  @Enum({
    items: () => ExtraNotificationMethod,
    default: ExtraNotificationMethod.EMAIL,
  })
  extraNotificationMethod: ExtraNotificationMethod =
    ExtraNotificationMethod.EMAIL;

  @OneToOne({ mappedBy: 'user' })
  profile: Profile;

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  // static isSearchable(column: string) {
  //   return ['name', 'email', 'createdAt'].includes(column);
  // }

  // static isNotSecured(column: string) {
  //   return ['id', 'name', 'image'].includes(column);
  // }
}
