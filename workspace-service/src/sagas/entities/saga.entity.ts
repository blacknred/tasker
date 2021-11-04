import { Transform } from 'class-transformer';
import { Agent } from 'src/agents/entities/agent.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Saga {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 200 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  workspaceId: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  expiresAt?: Date;

  @OneToOne(() => Agent, { cascade: true, eager: true })
  @JoinColumn()
  creator: Agent;

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt', 'expiresAt'].includes(column);
  }

  constructor(saga?: Partial<Saga>) {
    Object.assign(this, saga);
  }
}
