import {
  Entity,
  Enum,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Privilege } from '../interfaces/role.interface';

@Entity()
export class Role {
  @Exclude()
  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id!: string;

  @Property({ length: 100 })
  name!: string;

  @Exclude()
  @Enum({ items: () => Privilege, array: true })
  privileges: Privilege[] = [];

  @Property()
  workspaceId!: string;

  static isSearchable(column: string) {
    return ['name'].includes(column);
  }

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}
