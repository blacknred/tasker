import { Index, ManyToOne, Property } from '@mikro-orm/core';
import { ITeammate } from '@taskapp/shared';
import { Role } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ tableName: 'user_role' })
export class Teammate implements ITeammate {
  @Property()
  isActive = true;

  @Property()
  createdAt: Date = new Date();

  @Index({ name: 'teammate_user_id_idx' })
  @ManyToOne(() => User, { fieldName: 'userId' })
  user: User;

  @ManyToOne(() => Role, { fieldName: 'roleId' })
  role: Role;
}
