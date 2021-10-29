import { Transform } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Role {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}
