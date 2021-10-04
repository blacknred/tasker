import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';
import { ITask, TaskPriority, TaskType } from '../interfaces/task.interface';
import { Transform } from 'class-transformer';

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

  @Column({ type: 'date', default: Date.now() })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  finishedAt?: Date;
}
