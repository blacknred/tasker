import { Exclude, Transform } from 'class-transformer';
import { Agent } from 'src/agents/entities/agent.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';
import { TaskPriority, TaskType } from '../interfaces/task.interface';

export class TaskHistoryUpdate {
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

  @Column()
  workspaceId: ObjectID;

  @Column({ array: true })
  sagaIds: ObjectID[];

  @Column(() => TaskHistoryUpdate)
  history: TaskHistoryUpdate[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToOne(() => Agent, { eager: true })
  @JoinColumn()
  creator: Agent;

  constructor(task?: Partial<Task>) {
    Object.assign(this, task);
  }
}
