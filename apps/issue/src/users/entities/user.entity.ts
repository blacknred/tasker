import { Entity, Index, Property } from '@mikro-orm/core';
import { PickType } from '@nestjs/mapped-types';
import { BaseEntity } from '@taskapp/service-core';
import { IUserPreview } from '@taskapp/shared';

@Entity({ tableName: 'user_preview' })
export class User
  extends PickType(BaseEntity<User>, ['id'])
  implements IUserPreview
{
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
}
