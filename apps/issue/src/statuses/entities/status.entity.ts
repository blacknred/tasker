import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { IStatus } from '@taskapp/shared';
import { v4 } from 'uuid';

@Entity({ tableName: 'status' })
export class Status implements IStatus {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ length: 30, check: 'length(name) >= 3' })
  name!: string;

  @Property({ nullable: true, check: 'color ~ "^#(?:[0-9a-fA-F]{3}){1,2}$"' })
  color?: string;

  @Property()
  isFirst = false;

  @Property()
  isLast = false;

  @ManyToMany({ entity: () => Status, pivotTable: 'status_transition' })
  transitions = new Collection<Status>(this);
}
