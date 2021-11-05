import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { Privilege } from '../interfaces/role.interface';

@Entity()
export class Role {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 100 })
  name: string;

  @Exclude({ toClassOnly: true })
  @Column({ type: 'enum', enum: Privilege, array: true })
  privileges: Privilege[];

  @Column()
  workspaceId: ObjectID;

  static isSearchable(column: string) {
    return ['name'].includes(column);
  }

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}
