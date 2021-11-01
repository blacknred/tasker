import { Column, Entity } from 'typeorm';
import { IRole, Privilege } from '../interfaces/role.interface';

@Entity()
export class Role implements IRole {
  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: Privilege, array: true })
  privileges: Privilege[];

  constructor(role?: Partial<Role>) {
    Object.assign(this, role);
  }
}

export const Admin = new Role({
  name: 'Admin',
  description: 'Workspace administrator',
  privileges: Object.values(Privilege),
});

export const Worker = new Role({
  name: 'Worker',
  description: 'Workspace worker',
});
