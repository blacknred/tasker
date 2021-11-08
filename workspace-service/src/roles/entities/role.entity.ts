import { Entity, Enum, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { BaseEntity } from 'src/__shared__/entities/base.entity';
import { Privilege } from '../interfaces/role.interface';

@Entity()
export class Role extends BaseEntity {
  @Exclude()
  @Enum({ items: () => Privilege, array: true })
  privileges: Privilege[] = [];

  static isSearchable(column: string) {
    return ['name'].includes(column);
  }

  constructor(role?: Partial<Role>) {
    super(role);
  }

  // relations

  @Exclude()
  @Property({ hidden: true })
  wid!: ObjectId;
}
