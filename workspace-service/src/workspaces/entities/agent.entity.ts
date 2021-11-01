import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Agent {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column(() => Role)
  role: Role;

  @CreateDateColumn()
  createdAt: Date;

  constructor(agent?: Partial<Agent>) {
    Object.assign(this, agent);
  }
}
