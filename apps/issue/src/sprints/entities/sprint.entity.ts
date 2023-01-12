import { Entity, Property } from '@mikro-orm/core';
import { PickType } from '@nestjs/mapped-types';
import { BaseEntity } from '@taskapp/service-core';
import { IUserPreview } from '@taskapp/shared';

@Entity({ tableName: 'sprint_preview' })
export class Sprint
  extends PickType(BaseEntity<Sprint>, ['id'])
  implements IUserPreview
{
  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;
}
