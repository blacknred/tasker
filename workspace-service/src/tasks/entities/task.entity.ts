import {
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryKey,
  Property,
  Collection,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Agent } from 'src/agents/entities/agent.entity';
import { Saga } from 'src/sagas/entities/saga.entity';
import { BaseStage } from '../interfaces/task.interface';

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
export class Task {
  @Exclude()
  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id!: string;

  @Property({ length: 500 })
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  stage?: string;

  @Property({ nullable: true })
  label?: string;

  @Property()
  createdAt = new Date();

  @Property({ nullable: true })
  expiresAt?: Date;

  @Property({ type: TaskUpdate })
  updates: TaskUpdate[];

  //

  @Property()
  workspaceId!: string;

  @OneToOne(() => Agent, null, { fieldName: 'creatorId' })
  creator!: Agent;

  @OneToOne(() => Agent, null, { fieldName: 'assigneeId', nullable: true })
  assignee?: Agent;

  @ManyToMany(() => Saga, null, { fieldName: 'sagaIds' })
  sagas = new Collection<Saga>(this);

  //

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
    Object.assign(this, task);
  }
}
