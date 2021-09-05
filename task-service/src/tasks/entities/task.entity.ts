import { Entity, ObjectID, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  Name: string;

  @Column()
  Description: string;

  @Column()
  UserId: string;

  @Column()
  Type: string;

  @Column()
  Priority: string;

  @Column()
  CreatedAt: number;

  @Column()
  FinishedAt?: number;
}
