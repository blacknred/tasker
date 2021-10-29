import { Transform } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export enum BASE_ROLE {
  ADMIN = 'ADMIN',
  EXECUTOR = 'EXECUTOR',
}

@Entity()
export class Role {
  // @ObjectIdColumn()
  // @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  // id: ObjectID;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}
