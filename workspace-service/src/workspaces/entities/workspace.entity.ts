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

  @Column({ array: true })
  labels: string[];

  @Column(() => Role)
  roles: Role[];

  @Column(() => Agent)
  agents: Agent[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(workspace?: Partial<Workspace>) {
    this.labels.unshift(...Object.values(BaseStage));
    this.roles.unshift(Admin, Worker);

    Object.assign(this, workspace);
  }
}
