import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseLabel } from '../interfaces/workspace.interface';
import { Agent } from './agent.entity';
import { Admin, Role, Worker } from './role.entity';

@Entity()
export class Workspace {
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

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt'].includes(column);
  }

  constructor(workspace?: Partial<Workspace>) {
    this.labels.unshift(...Object.values(BaseLabel));
    this.roles.unshift(Admin, Worker);

    Object.assign(this, workspace);
  }
}
