import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  Index,
  DeleteDateColumn,
} from 'typeorm';
import { IUser, UserRole } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.USER],
  })
  roles: [UserRole];

  @CreateDateColumn()
  @Index('user_createdAt_index')
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();

  @Exclude()
  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
