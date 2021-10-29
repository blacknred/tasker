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
import { BASE_ROLE, Role } from './role.entity';
import { Saga } from './saga.entity';
import { BASE_STAGES, Stage } from './stage.entity';
import { Task } from './task.entity';

@Entity()
export class Workspace {
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

  //

  @Column(() => Saga)
  sagas: Saga[];

  @Column(() => Task)
  tasks: Task[];

  constructor(workspace?: Partial<Workspace>) {
    const roles = Object.values(BASE_ROLE).map((name) => new Role({ name }));
    const stages = Object.values(BASE_STAGES).map(
      (name) => new Stage({ name }),
    );

    if (workspace.roles) {
      roles.unshift(...workspace.roles);
    } else {
      workspace.roles = roles;
    }

    if (workspace.sagas) {
      stages.unshift(...workspace.stages);
    } else {
      workspace.sagas = this.sagas;
    }

    Object.assign(this, workspace);
  }
}
