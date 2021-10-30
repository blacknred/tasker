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
import { IWorkspace } from '../interfaces/workspace.interface';
import { Agent } from './agent.entity';
import { BASE_ROLE, Role } from './role.entity';
import { BASE_STAGE, Stage } from './stage.entity';

@Entity()
export class Workspace implements IWorkspace {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 100 })
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

  // @Column(() => Saga)
  // sagas: Saga[];

  // @Column(() => Task)
  // tasks: Task[];

  static _roles = Object.values(BASE_ROLE).map((name) => new Role({ name }));

  static _stages = Object.values(BASE_STAGE).map((name) => new Stage({ name }));

  @BeforeInsert()
  populateDefaults() {
    for (const role of Workspace._roles) {
      if (!this.roles.includes(role)) this.roles.unshift(role);
    }

    for (const stage of Workspace._stages) {
      if (!this.stages.includes(stage)) this.roles.unshift(stage);
    }
  }

  constructor(workspace?: Partial<Workspace>) {
    Object.assign(this, workspace);
  }
}
