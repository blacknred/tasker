import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { Exclude } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import { BaseEntity } from 'src/__shared__/entities/base.entity';

@Entity()
export class Agent extends BaseEntity {
  @Property()
  userId!: number;

  @Property({ nullable: true })
  image?: string;

  static isSearchable(column: string) {
    return ['userId', 'name', 'roleId', 'createdAt'].includes(column);
  }

  constructor(agent?: Partial<Agent>) {
    super(agent);
  }

  // relations

  @Exclude()
  @Property({ hidden: true })
  wid!: ObjectId;

  @ManyToOne(() => Role, { nullable: true })
  role?: Role;
}
