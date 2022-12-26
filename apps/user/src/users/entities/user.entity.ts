import {
  BeforeCreate,
  Entity,
  Enum,
  Index,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';
import { BaseEntity } from '@taskapp/service-core';
import { ExtraNotificationMethod } from '@taskapp/types';

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

  @Property({ length: 3, check: 'length(currency) == 3' })
  currency = 'USD';

  @Property({ length: 5, check: 'length(locale) == 5' })
  locale!: string;

  @Enum({
    items: () => ExtraNotificationMethod,
    default: ExtraNotificationMethod.EMAIL,
  })
  extraNotificationMethod: ExtraNotificationMethod = ExtraNotificationMethod.EMAIL;

  @Index({ name: 'identity_user_id_idx' })
  @OneToOne()
  profile: Profile;




  @Column({ length: 200 })
  name: string;

  @Column({ nullable: true })
  image?: string;




  @CreateDateColumn()
  @Index('user_createdAt_index')
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  static isSearchable(column: string) {
    return ['name', 'email', 'createdAt'].includes(column);
  }

  static isNotSecured(column: string) {
    return ['id', 'name', 'image'].includes(column);
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
