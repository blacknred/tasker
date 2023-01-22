import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import type { IHydratedFilter } from '@taskapp/shared';

@Entity({ tableName: 'filter' })
export class Filter implements IHydratedFilter {
  @PrimaryKey({ type: 'uuid' })
  id: string;

  @Property({ nullable: true, type: 'uuid' })
  ownerId?: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Property({ check: 'schema ~ "^?([w-]+(=[w-]*)?(&[w-]+(=[w-]*)?)*)?$"' })
  schema: string;

  constructor(instance?: Partial<Filter>) {
    Object.assign(this, instance);
  }
}
