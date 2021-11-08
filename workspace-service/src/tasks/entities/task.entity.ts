import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Agent } from 'src/agents/entities/agent.entity';
import { Saga } from 'src/sagas/entities/saga.entity';
import { BaseEntity } from 'src/__shared__/entities/base.entity';

export class UpdateRecord {
  @Property()
  field: string;

  @Property()
  prev: unknown;

  @Property()
  next: unknown;

  constructor(record?: Partial<UpdateRecord>) {
    Object.assign(this, record);
  }
}

export class TaskUpdate {
  @Property({ type: UpdateRecord })
  records!: UpdateRecord[];

  @Property({ type: Agent })
  agent!: Agent;

  @Property()
  createdAt = new Date();

  constructor(update?: Partial<TaskUpdate>) {
    Object.assign(this, update);
  }
}

@Entity()
export class Task extends BaseEntity {
  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  stage?: string;

  @Property({ nullable: true })
  label?: string;

  @Property({ nullable: true })
  expiresAt?: Date;

  @Property({ type: TaskUpdate })
  updates: TaskUpdate[];

  static isSearchable(column: string) {
    return [
      'name',
      'stage',
      'label',
      'createdAt',
      'expiresAt',
      'creatorId',
      'assigneeId',
      'sagaId',
    ].includes(column);
  }

  constructor(task?: Partial<Task>) {
    super(task);
  }

  // relations

  @Exclude()
  @Property({ hidden: true })
  wid!: ObjectId;

  @ManyToOne(() => Agent, { fieldName: 'creatorId' })
  creator!: Agent;

  @ManyToOne(() => Agent, { nullable: true, fieldName: 'assigneeId' })
  assignee?: Agent;

  @ManyToMany(() => Saga, null, {
    owner: true,
    fieldName: 'sagaIds',
    cascade: [Cascade.REMOVE],
  })
  sagas: Collection<Saga> = new Collection<Saga>(this);
}
