import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IWorkspace } from '../interfaces/workspace.interface';
import { Agent } from './agent.entity';
import { Admin, Role, Worker } from './role.entity';

export enum BaseStage {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Workspace implements IWorkspace {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 200 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  creatorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column(() => Role)
  roles: Role[];

  @Column({ array: true })
  stages: string[];

  @Column(() => Agent)
  agents: Agent[];

  constructor(workspace?: Partial<Workspace>) {
    this.roles.unshift(Admin, Worker);
    this.stages.unshift(...Object.values(BaseStage));

    Object.assign(this, workspace);
  }
}
