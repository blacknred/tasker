import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '@taskapp/service-core';
import { ISprint } from '@taskapp/shared';

@Entity({ tableName: 'sprint' })
export class Sprint extends BaseEntity<Sprint> implements ISprint {
  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ type: 'uuid' })
  authorId!: string;

  @Property({ length: 30, check: 'length(name) >= 5' })
  name!: string;

  @Property({ nullable: true })
  details?: string;

  @Property()
  startsAt!: Date;

  @Property()
  endsAt!: Date;
}
