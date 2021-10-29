import { Exclude, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TaskPriority, TaskType } from '../interfaces/task.interface';
import { Agent } from './agent.entity';
import { Stage } from './stage.entity';

export class StageUpdate {
  @Column(() => Stage)
  stage: Stage;

  @Column(() => Agent)
  agent: Agent;
}

@Entity()
export class Task {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column()
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

  @Column(() => StageUpdate)
  history: StageUpdate[];

  @Column()
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  constructor(task?: Partial<Task>) {
    Object.assign(this, task);
  }
}
