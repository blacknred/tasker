import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { IUserPreview } from '@taskapp/shared';

@Entity({ tableName: 'user_preview' })
export class User implements IUserPreview {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Index({ name: 'user_username_idx' })
  @Property({
    lazy: true,
    unique: true,
    length: 30,
    check: 'length(username) >= 5',
  })
  username!: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Property({
    nullable: true,
    check: 'image ~ "^(https?://.*.(?:png|gif|webp|jpeg|jpg))$"',
  })
  image?: string;

  constructor(instance?: Partial<User>) {
    Object.assign(this, instance);
  }
}
