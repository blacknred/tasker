import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { IUserPreview } from '@taskapp/shared';
import { v4 } from 'uuid';

@Entity({ tableName: 'user' })
export class User implements IUserPreview {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Index({ name: 'profile_username_idx' })
  @Property({ unique: true, length: 30, check: 'length(username) >= 5' })
  username!: string;

  @Property({
    nullable: true,
    check: 'image ~ "^(https?://.*.(?:png|gif|webp|jpeg|jpg))$"',
  })
  image?: string;
}
