import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import { v4 } from 'uuid';
import type { IHydratedTag } from '../../../../../../libs/shared/src/interfaces';

@Entity({ tableName: 'tag' })
export class Tag extends AggregateRoot implements IHydratedTag {
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
