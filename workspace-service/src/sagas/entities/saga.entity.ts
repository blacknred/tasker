import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Agent } from '../../workspaces/entities/agent.entity';

@Entity()
export class Saga {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column(() => Agent)
  creator: Agent;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiresAt?: Date;

  constructor(saga?: Partial<Saga>) {
    Object.assign(this, saga);
  }
}
