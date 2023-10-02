import {
  Entity,
  Index,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { ISprint } from '@taskapp/shared';
import { v4 } from 'uuid';
import { User } from '../../issues/entities';

@Entity({ tableName: 'sprint' })
export class Sprint implements ISprint {
  @PrimaryKey()
  id: string = v4();

  @Property({ type: 'uuid' })
  projectId!: string;

  @ManyToOne(() => User, { lazy: true, fieldName: 'authorId' })
  author!: User;

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
    Object.assign(this, instance);
  }
}
