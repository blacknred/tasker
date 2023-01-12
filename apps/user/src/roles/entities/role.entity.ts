import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from '@taskapp/service-core';
import { ProjectPermission, IRole } from '@taskapp/shared';

@Entity({ tableName: 'role' })
export class Role extends BaseEntity<Role> implements IRole {
  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ length: 30, check: 'length(name) >= 5' })
  name!: string;

  @Property({ nullable: true, check: 'color ~ "^#(?:[0-9a-fA-F]{3}){1,2}$"' })
  color?: string;

  @Enum({
    items: () => ProjectPermission,
    default: [],
    array: true,
  })
  permissions: ProjectPermission[] = [];
}
