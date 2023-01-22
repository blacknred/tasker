import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import { v4 } from 'uuid';
import { ProjectPermission } from '../enums';
import type { IHydratedRole } from '../interfaces';

@Entity({ tableName: 'role' })
export class Role extends AggregateRoot implements IHydratedRole {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ length: 30, check: 'length(name) >= 5' })
  name!: string;

  @Property({ nullable: true, check: 'color ~ "^#(?:[0-9a-fA-F]{3}){1,2}$"' })
  color?: string;

  @Enum({
    items: () => ProjectPermission,
    default: [],
    array: true,
  })
  permissions: ProjectPermission[] = [];

  @Index({ name: `role_created_at_idx` })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  constructor(instance?: Partial<Role>) {
    super();
    Object.assign(this, instance);
  }

  //   killEnemy(enemyId: string) {
  //     // logic
  //     this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  //   }
}
