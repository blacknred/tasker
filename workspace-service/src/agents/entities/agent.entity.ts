import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class Agent {
  @Exclude()
  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id!: string;

  @Property()
  userId!: number;

  @Property()
  userName!: string;

  @Property({ nullable: true })
  avatar?: string;

  @Property()
  createdAt = new Date();

  //

  @Property()
  workspaceId!: string;

  @OneToOne(() => Role, null, { fieldName: 'roleId' })
  role?: Partial<Role>;

  //

  static isSearchable(column: string) {
    return ['userId', 'userName', 'roleId', 'createdAt'].includes(column);
  }

  constructor(agent?: Partial<Agent>) {
    Object.assign(this, agent);
  }
}
