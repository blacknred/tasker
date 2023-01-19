import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import { IFilter } from '@taskapp/shared';
import { v4 } from 'uuid';

@Entity({ tableName: 'filter' })
export class Filter extends AggregateRoot implements IFilter {
  @PrimaryKey()
  id: string = v4();

  @Property({ nullable: true, type: 'uuid' })
  ownerId?: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Property({ check: 'schema ~ "^?([w-]+(=[w-]*)?(&[w-]+(=[w-]*)?)*)?$"' })
  schema: string;

  constructor(instance?: Partial<Filter>) {
    super();
    Object.assign(this, instance);
  }

  // killEnemy(enemyId: string) {
  //   // logic
  //   this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  // }
}
