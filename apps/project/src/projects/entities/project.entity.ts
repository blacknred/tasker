import { Entity, Enum, Property } from '@mikro-orm/core';
import { BaseEntity } from '@taskapp/service-core';
import { IProject, ProjectType } from '@taskapp/shared';

@Entity({ tableName: 'project' })
export class Project extends BaseEntity<Project> implements IProject {
  @Property({ type: 'uuid' })
  authorId!: string;

  @Property({ unique: true, length: 10, check: 'length(key) >= 3' })
  key!: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Property({
    nullable: true,
    check: 'image ~ "^(https?://.*.(?:png|gif|webp|jpeg|jpg))$"',
  })
  image?: string;

  @Property({ nullable: true })
  details?: string;

  @Enum({
    items: () => ProjectType,
    default: ProjectType.SCRUM,
  })
  type: ProjectType = ProjectType.SCRUM;

  @Property({ lazy: true, nullable: true })
  deletedAt?: Date;

  activeSprint?: string;
}
