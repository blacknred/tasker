import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { IUserPreview } from '@taskapp/shared';

@Entity({ tableName: 'sprint_preview' })
export class Sprint implements IUserPreview {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  constructor(instance?: Partial<Sprint>) {
    Object.assign(this, instance);
  }
}
