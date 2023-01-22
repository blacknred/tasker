import { Entity, OneToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from 'src/__shared__/entity/baseEntity.entity';
import { Identity } from './identity.entity';

@Entity({ tableName: 'user' })
export class User extends BaseEntity<User> {
  @Property({ unique: true, length: 100, check: 'length(username) >= 5' })
  username!: string;

  @Property({
    length: 500,
    lazy: true,
    nullable: true,
    check: 'length(bio) > 0',
  })
  bio?: string;

  @Property({ nullable: true })
  image?: string;

  @Property({ type: 'smallint' })
  rating = 0;

  @Property({ lazy: true, nullable: true })
  deletedAt?: Date;

  @OneToOne({ mappedBy: 'user' })
  identity!: Identity;

  constructor(user?: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}
