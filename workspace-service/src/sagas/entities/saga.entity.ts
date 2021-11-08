import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { Agent } from 'src/agents/entities/agent.entity';
import { BaseEntity } from 'src/__shared__/entities/base.entity';

@Entity()
export class Saga extends BaseEntity {
  @Property({ nullable: true })
  description?: string;

  @Property({ nullable: true })
  expiresAt?: Date;

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt', 'expiresAt'].includes(column);
  }

  constructor(saga?: Partial<Saga>) {
    super(saga);
  }

  // relations

  @Exclude()
  @Property({ hidden: true })
  wid!: ObjectId;

  @ManyToOne(() => Agent)
  creator!: Agent;

  // @ManyToMany(() => Task, (task) => task.sagas, {
  //   hidden: true,
  //   cascade: [Cascade.REMOVE],
  // })
  // tasks = new Collection<Task>(this);
}
