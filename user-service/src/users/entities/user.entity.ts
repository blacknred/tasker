import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  BeforeInsert,
  Index,
  DeleteDateColumn,
  BeforeUpdate,
} from 'typeorm';
import { IUser } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  image?: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

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

  static isSearchable(column: string) {
    return ['name', 'email', 'createdAt'].includes(column);
  }

  static isNotSecured(column: string) {
    return ['id', 'name', 'image'].includes(column);
  }

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
