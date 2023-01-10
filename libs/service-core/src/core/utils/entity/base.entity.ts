import {
  BaseEntity as Base,
  PrimaryKey,
  Property,
  Index,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

export abstract class BaseEntity<T extends { id: unknown }> extends Base<
  T,
  'id'
> {
  @PrimaryKey()
  id: string = v4();

  @Index() // { name: 'identity_user_id_idx' }
  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date(), lazy: true })
  updatedAt: Date = new Date();

  constructor(instance?: Partial<T>) {
    super();
    Object.assign(this, instance);
  }
}
