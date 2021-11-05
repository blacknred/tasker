import { Transform } from 'class-transformer';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ObjectID,
  ObjectIdColumn,
  OneToOne,
} from 'typeorm';

@Entity()
export class Agent {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  avatar?: string;

  @ObjectIdColumn()
  workspaceId: ObjectID;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Role, { cascade: true, eager: true })
  @JoinTable()
  role?: Partial<Role>;

  static isSearchable(column: string) {
    return ['userId', 'userName', 'roleId', 'createdAt'].includes(column);
  }

  constructor(agent?: Partial<Agent>) {
    Object.assign(this, agent);
  }
}
