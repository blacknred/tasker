import { Transform } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseRole } from '../interfaces/role.interface';
import { BaseStage } from '../interfaces/stage.interface';
import { IWorkspace } from '../interfaces/workspace.interface';
import { Agent } from './agent.entity';
import { Role } from './role.entity';
import { Stage } from './stage.entity';

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

  @Column(() => Stage)
  stages: Stage[];

  @Column(() => Agent)
  agents: Agent[];

  static _roles = Object.values(BaseRole).map((name) => new Role({ name }));

  static _stages = Object.values(BaseStage).map((name) => new Stage({ name }));

  @BeforeInsert()
  populateDefaults() {
    for (const role of Workspace._roles) {
      if (!this.roles.some((s) => s.name === role.name)) {
        this.roles.unshift(role);
      }
    }

    for (const stage of Workspace._stages) {
      if (!this.stages.some((s) => s.name === stage.name)) {
        this.roles.unshift(stage);
      }
    }
  }

  constructor(workspace?: Partial<Workspace>) {
    Object.assign(this, workspace);
  }
}
