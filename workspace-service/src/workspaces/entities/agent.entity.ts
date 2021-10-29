import { Transform } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class Agent {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column()
  userId: number;

  @Column(() => Role)
  role: Role;

  constructor(agent?: Partial<Agent>) {
    Object.assign(this, agent);
  }
}
