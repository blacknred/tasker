import { Column, Entity } from 'typeorm';
import { IRole } from '../interfaces/role.interface';

@Entity()
export class Role implements IRole {
  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}
