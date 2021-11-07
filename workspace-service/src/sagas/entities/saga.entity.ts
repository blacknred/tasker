import { Agent } from 'src/agents/entities/agent.entity';
import {
  Entity,
  OneToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from 'mongodb';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Saga {
  @Exclude()
  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id!: string;

  @Property({ length: 200 })
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  createdAt = new Date();

  @Property({ nullable: true })
  expiresAt?: Date;

  //

  @Property()
  workspaceId!: string;

  @OneToOne(() => Agent, null, { fieldName: 'creatorId' })
  creator!: Agent;

  //

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt', 'expiresAt'].includes(column);
  }

  constructor(saga?: Partial<Saga>) {
    Object.assign(this, saga);
  }
}
