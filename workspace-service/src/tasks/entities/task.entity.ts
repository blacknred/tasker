import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Agent } from '../../workspaces/entities/agent.entity';
import { TaskPriority, TaskType } from '../interfaces/task.interface';

export class TaskUpdate {
  @Column({ nullable: true })
  label?: string;

  @Column(() => Agent)
  agent?: Agent;

  @CreateDateColumn()
  createdAt?: Date;
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

  @Column({
    type: 'enum',
    enum: TaskType,
    default: TaskType.SHORT,
  })
  type: TaskType;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.LOW,
  })
  priority: TaskPriority;

  @Column(() => Agent)
  creator: Agent;

  @Column()
  workspaceId: ObjectID;

  @Column({ array: true })
  sagaIds: ObjectID[];

  @Column(() => TaskUpdate)
  history: TaskUpdate[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  constructor(task?: Partial<Task>) {
    Object.assign(this, task);
  }
}
