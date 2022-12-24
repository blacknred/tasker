import { ArrayType, Entity, Property, Enum, Index } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { BaseLabel, BaseStage } from 'src/tasks/interfaces/task.interface';
import { BaseEntity } from 'src/__shared__/entities/base.entity';
import { BaseRole, Privilege } from '../interfaces/workspace.interface';

@Entity()
export class Role {
  @Enum({ items: () => Privilege, array: true, default: [] })
  privileges: Privilege[] = [];

  @Property({ length: 100 })
  name!: string;

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}

@Entity()
export class Workspace extends BaseEntity {
  @Property({ length: 500, unique: true })
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ type: ArrayType, default: Object.values(BaseStage) })
  stages: string[] = Object.values(BaseStage);

  @Property({ type: ArrayType, default: Object.values(BaseLabel) })
  labels: string[] = Object.values(BaseLabel);

  @Property({ type: ArrayType, default: [] })
  roles: Role[] = [];

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Exclude()
  @Index()
  @Property({ nullable: true, hidden: true, type: 'timestamptz' })
  deletedAt?: Date;

  @Property()
  creatorId!: number;

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt'].includes(column);
  }

  constructor(workspace?: Partial<Workspace>) {
    super(workspace);

    const worker = new Role({ name: BaseRole.WORKER, privileges: [] });
    const admin = new Role({
      name: BaseRole.ADMIN,
      privileges: Object.values(Privilege),
    });

    this.roles.push(admin, worker);
  }

  agent?: Partial<IAgent>;
}
