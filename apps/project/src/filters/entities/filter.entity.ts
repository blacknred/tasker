import { Entity, Property } from '@mikro-orm/core';
import { PickType } from '@nestjs/mapped-types';
import { BaseEntity } from '@taskapp/service-core';
import { IFilter } from '@taskapp/shared';

@Entity({ tableName: 'sprint' })
export class Filter
  extends PickType(BaseEntity<Filter>, ['id'])
  implements IFilter
{
  @Property({ nullable: true, type: 'uuid' })
  ownerId?: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Property({ check: 'schema ~ "^?([w-]+(=[w-]*)?(&[w-]+(=[w-]*)?)*)?$"' })
  schema?: string;
}
