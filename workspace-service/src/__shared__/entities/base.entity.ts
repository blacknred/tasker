import {
  Index,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';

export abstract class BaseEntity<T = unknown> {
  @Exclude()
  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id!: string;

  @Property({ length: 500 })
  name!: string;

  @Index()
  @Property({ onCreate: () => new Date() })
  createdAt = new Date();

  // @Exclude()
  // @Property({ onUpdate: () => new Date(), hidden: true })
  // updatedAt = new Date();

  constructor(partial?: T) {
    Object.assign(this, partial);
  }
}
