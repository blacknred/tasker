import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

export enum TaskType {
  LONG = 'LONG',
  SHORT = 'SHORT',
  MEDIUM = 'MEDIUM',
}

export enum TaskPriority {
  CRITICAL = 'CRITICAL',
  MAJOR = 'MAJOR',
  MODERATE = 'MODERATE',
  LOW = 'LOW',
}

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ type: 'text', length: 100, nullable: false })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int', length: 100, nullable: false })
  userId: number;

  @Column({
    type: 'enum',
    enum: TaskType,
    nullable: false,
    default: TaskType.SHORT,
  })
  type: TaskType;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    nullable: false,
    default: TaskPriority.LOW,
  })
  priority: TaskPriority;

  @Column({ type: 'date', default: Date.now() })
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  finishedAt?: Date;
}
