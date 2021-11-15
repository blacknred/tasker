import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Workspace } from 'src/workspaces/entities/workspace.entity';
import { Privilege } from 'src/workspaces/interfaces/workspace.interface';
import { BaseEntity } from 'src/__shared__/entities/base.entity';

@Entity()
export class Agent extends BaseEntity {
  @Property()
  userId!: number;

  @Property({ nullable: true })
  image?: string;

  @Property({ nullable: true })
  role?: string;

  static isSearchable(column: string): boolean {
    return ['userId', 'name', 'role', 'createdAt'].includes(column);
  }

  constructor(agent?: Partial<Agent>) {
    super(agent);
  }

  // relations

  // @Exclude()
  // @Property({ hidden: true })
  // wid!: ObjectId;

  @ManyToOne(() => Workspace, {
    eager: false,
    // hidden: true,
    fieldName: 'wid',
  })
  workspace: Workspace;

  hasPrivilege(privilege: Privilege): boolean {
    return this.workspace?.roles
      .find((r) => r.name === this.role)
      ?.privileges.includes(privilege);
  }
}
