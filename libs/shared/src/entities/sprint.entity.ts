import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import { IHydratedSprint } from '@taskapp/shared';
import { v4 } from 'uuid';

@Entity({ tableName: 'sprint' })
export class Sprint extends AggregateRoot implements IHydratedSprint {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ type: 'uuid' })
  authorId!: string;

  @Property({ length: 30, check: 'length(name) >= 5' })
  name!: string;

  @Property({ nullable: true })
  details?: string;

  @Property()
  startsAt!: Date;

  @Property()
  endsAt!: Date;

  @Index({ name: `sprint_created_at_idx` })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  constructor(instance?: Partial<Sprint>) {
    super();
    Object.assign(this, instance);
  }

  // killEnemy(enemyId: string) {
  //   this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  // }
}
