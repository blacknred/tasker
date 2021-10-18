// import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { ITask, TaskPriority, TaskType } from '../interfaces/task.interface';

@Entity()
export class Task implements ITask {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'text', length: 100 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', length: 100 })
  userId: number;

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

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  // @Transform((value) => {
  //   if (value !== null) {
  //     return value;
  //   }
  //   return undefined;
  // })
  finishedAt?: Date;

  constructor(task?: Partial<Task>) {
    Object.assign(this, task);
  }
}
