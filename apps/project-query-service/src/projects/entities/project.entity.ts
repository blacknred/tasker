import {
  Entity,
  Enum,
  Formula,
  Index,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { IHydratedProject, ISprint, ProjectType } from '@taskapp/shared';

@Entity({ tableName: 'project' })
export class Project implements IHydratedProject {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

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

  @Property()
  isUnlimited = false;

  @Property({ lazy: true, nullable: true })
  deletedAt?: Date;

  @Index({ name: `project_created_at_idx` })
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  @Formula(
    'select * from sprint s where s.project_id = id and current_date between s.starts_at and s.ends.at',
  )
  activeSprint: ISprint;

  constructor(instance?: Partial<Project>) {
    Object.assign(this, instance);
  }
}
