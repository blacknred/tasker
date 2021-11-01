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
import { Agent } from '../../workspaces/entities/agent.entity';
import { Stage } from '../../workspaces/entities/stage.entity';
import {
  IStageUpdate,
  ITask,
  TaskPriority,
  TaskType,
} from '../interfaces/task.interface';

export class StageUpdate implements IStageUpdate {
  @Column(() => Stage)
  stage: Stage;

  @Column(() => Agent)
  agent: Agent;
}

@Entity()
export class Task implements ITask {
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
