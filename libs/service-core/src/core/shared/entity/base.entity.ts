import { BaseEntity as Base, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity<T extends { id: unknown }> extends Base<
  T,
  'id'
> {
  @PrimaryKey()
  id: number;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();
}
