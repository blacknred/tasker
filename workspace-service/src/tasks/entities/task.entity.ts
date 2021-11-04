import { Exclude, Transform } from 'class-transformer';
import { Agent } from 'src/agents/entities/agent.entity';
import { Saga } from 'src/sagas/entities/saga.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import { BaseStage } from '../interfaces/task.interface';

export class TaskUpdateState {
  @Column()
  field: string;

  @Column()
  prev: string;

  @Column()
  next: string;
}

export class TaskUpdate {
  @Column(() => TaskUpdateState)
  state: TaskUpdateState;

  @Column(() => Agent)
  agent: Agent;

  @CreateDateColumn()
  createdAt: Date;
}

@Entity()
export class Task {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 500 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: BaseStage.TODO })
  stage: string;

  @Column({ nullable: true })
  label?: string;

  @Column()
  workspaceId: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @Column(() => TaskUpdate)
  updates: TaskUpdate[];

  //

  @OneToOne(() => Agent, { eager: true })
  @JoinColumn()
  creator: Agent;

  @OneToOne(() => Agent, { eager: true, nullable: true })
  @JoinColumn()
  assignee?: Agent;

  @ManyToMany(() => Saga, { eager: true })
  @JoinColumn()
  sagas: Saga[];

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
