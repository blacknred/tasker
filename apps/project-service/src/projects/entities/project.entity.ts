import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { AggregateRoot } from '@nestjs/cqrs';
import { IProject, ISprintPreview, ProjectType } from '@taskapp/shared';
import { v4 } from 'uuid';

@Entity({ tableName: 'project' })
export class Project extends AggregateRoot implements IProject {
  @PrimaryKey()
  id: string = v4();

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

  activeSprint: ISprintPreview;

  constructor(instance?: Partial<Project>) {
    super();
    Object.assign(this, instance);
  }

  // killEnemy(enemyId: string) {
  //   // logic
  //   this.apply(new HeroKilledDragonEvent(this.id, enemyId));
  // }
}
