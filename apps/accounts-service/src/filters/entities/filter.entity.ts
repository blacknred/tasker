import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import type { IHydratedFilter } from '@taskapp/shared';
import { CreateFilterDto } from '../dto';
import { v4 } from 'uuid';

@Entity({ tableName: 'filter' })
export class Filter implements IHydratedFilter {
  @PrimaryKey({ type: 'uuid' })
  id = v4();

  @Property({ nullable: true, type: 'uuid' })
  ownerId?: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Property({ check: 'schema ~ "^?([w-]+(=[w-]*)?(&[w-]+(=[w-]*)?)*)?$"' })
  schema: string;

  constructor(instance?: Partial<Filter>) {
    Object.assign(this, instance);
  }

  static serializeSchema(schema?: CreateFilterDto['schema']): string {
    if (!schema) return;
    return '?' + schema.map((r) => `${r.field}=${r.value}`).join('&');
  }

  static isSearchable(column: string): boolean {
    return ['name'].includes(column);
  }
}
