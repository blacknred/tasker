import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser, Role } from '../interfaces/user.interface';
import { Exclude } from 'class-transformer';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  roles: [Role];

  @UpdateDateColumn()
  createdAt = new Date();

  @UpdateDateColumn()
  updatedAt = new Date();
}
