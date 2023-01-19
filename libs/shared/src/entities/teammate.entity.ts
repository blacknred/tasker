import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import { v4 } from 'uuid';
import type { ITeammate } from '../interfaces';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity({ tableName: 'user_role' })
export class Teammate extends AggregateRoot implements ITeammate {
  @PrimaryKey()
  id: string = v4();

  @Property()
  isActive = true;

  @Index({ name: `user_role_created_at_idx` })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @Index({ name: 'user_id_idx' })
  @ManyToOne(() => User, { fieldName: 'userId' })
  user: User;

  @ManyToOne(() => Role, { fieldName: 'roleId' })
  role: Role;

  constructor(instance?: Partial<Teammate>) {
    super();
    Object.assign(this, instance);
  }

  //   killEnemy(enemyId: string) {
  //     // logic
  //     this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  //   }
}
