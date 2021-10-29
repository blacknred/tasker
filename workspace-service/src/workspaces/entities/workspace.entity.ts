import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Agent } from './agent.entity';
import { Role } from './role.entity';
import { Saga } from './saga.entity';
import { Stage } from './stage.entity';
import { Task } from './task.entity';

@Entity()
export class Workspace {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  @Column()
  creatorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column(() => Role)
  roles: Role[];

  @Column(() => Stage)
  stages: Stage[];

  @Column(() => Agent)
  agents: Agent[];

  @Column(() => Saga)
  sagas: Saga[];

  @Column(() => Task)
  tasks: Task[];

  constructor(workspace?: Partial<Workspace>) {
    Object.assign(this, workspace);
  }
}
