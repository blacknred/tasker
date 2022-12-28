import { Entity, Index, OneToOne, Property } from '@mikro-orm/core';
import { User } from './user.entity';

@Entity({ tableName: 'user_profile' })
export class Profile {
  @Property({ unique: true, length: 100, check: 'length(username) >= 5' })
  username!: string;

  @Property({
    lazy: true,
    nullable: true,
    check: 'length(bio) > 0',
  })
  bio?: string;

  @Property({ nullable: true, check: 'length(bio) > 0' })
  image?: string;

  @Index({ name: 'profile_user_id_idx' })
  @OneToOne({ name: 'user_id' })
  user!: User;
}
