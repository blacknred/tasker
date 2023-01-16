import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import { ITag } from '@taskapp/shared';
import { v4 } from 'uuid';

@Entity({ tableName: 'tag' })
export class Tag extends AggregateRoot implements ITag {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ length: 50, check: 'length(name) >= 3' })
  name!: string;

  @Property({ nullable: true, check: 'color ~ "^#(?:[0-9a-fA-F]{3}){1,2}$"' })
  color?: string;

  constructor(instance?: Partial<Tag>) {
    super();
    Object.assign(this, instance);
  }
}
