import {
  BeforeCreate,
  Collection,
  Entity,
  Enum,
  ManyToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '@taskapp/service-core';
import { NotificationMethod, SecuredNotificationMethod, IUser } from '@taskapp/shared';
import * as bcrypt from 'bcryptjs';
import { Teammate } from '../../project-members/entities/project-member.entity';
import { ProjectRole } from '../../project-roles/entities/project-role.entity';

@Entity({ tableName: 'user' })
export class User extends BaseEntity<User> implements IUser {
  @Property({ unique: true, length: 30, check: 'length(username) >= 5' })
  username!: string;

  @Property({ length: 100, check: 'length(username) >= 5' })
  name!: string;

  @Property({ nullable: true, check: 'length(bio) > 0' })
  image?: string;

  @Property({
    nullable: true,
    check: 'length(bio) > 0',
  })
  details?: string;

  @Property({ unique: true, check: 'length(email) >= 5' })
  email!: string;

  @Property({ hidden: true })
  password!: string;

  @Property({
    nullable: true,
    check: "phone ~ '^(+|00)[1-9][0-9 -().]{7,32}$'",
  })
  phone?: string;

  @Property()
  isAdmin = false;

  @Property()
  isConfirmed = false;

  @Property()
  is2faEnabled = false;

  @Property({ length: 3, check: 'length(currency) == 3' })
  currency = 'USD';

  @Property({ length: 5, check: 'length(locale) == 5' })
  locale = 'en_US';

  @Property({ lazy: true, nullable: true })
  deletedAt?: Date;

  @Enum({
    items: () => NotificationMethod,
    default: NotificationMethod.NONE,
  })
  notificationMethod: NotificationMethod = NotificationMethod.NONE;

  @Enum({
    items: () => SecuredNotificationMethod,
    default: NotificationMethod.EMAIL,
  })
  securedNotificationMethod: SecuredNotificationMethod =
    SecuredNotificationMethod.EMAIL;

  @ManyToMany({ entity: () => ProjectRole, pivotEntity: () => Teammate })
  roles = new Collection<ProjectRole>(this);

  @BeforeCreate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }
}

// @OneToOne({ mappedBy: 'user' })
// profile: Profile;
// @Index({ name: 'profile_user_id_idx' })
// @OneToOne({ name: 'user_id' })
// user!: User;

// @Index({ name: 'offer_author_id_idx' })
// @ManyToOne(() => User)
// author!: User;

// @Index({ name: 'offer_category_id_idx' })
// @ManyToOne(() => Category, { nullable: true })
// category?: Category;

// @ManyToMany({ entity: () => User, pivotEntity: () => Bid })
// bids = new Collection<Bid>(this);

// @ManyToMany({ entity: () => User, pivotEntity: () => Watcher })
// watchers = new Collection<User>(this);
