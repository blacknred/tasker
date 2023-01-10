import { Entity, Index, ManyToOne, Property } from '@mikro-orm/core';
import { IProjectMember } from '@taskapp/shared';
import { ProjectRole } from '../../project-roles/entities/project-role.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'user_role' })
export class ProjectMember implements IProjectMember {
  @Property()
  isActive = true;

  @Index()
  @Property()
  createdAt: Date = new Date();

  @ManyToOne(() => User, { primary: true })
  user: User;

  @ManyToOne(() => ProjectRole, { primary: true })
  role: ProjectRole;
}
