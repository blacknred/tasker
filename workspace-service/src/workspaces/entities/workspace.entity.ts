import { Transform } from 'class-transformer';
import { BaseLabel, BaseStage } from 'src/tasks/interfaces/task.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Workspace {
  @ObjectIdColumn()
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  id: ObjectID;

  @Column({ length: 200 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ array: true })
  taskStages: string[];

  @Column({ array: true })
  taskLabels: string[];

  @Column()
  doneStage: string;

  @Column()
  creatorId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt'].includes(column);
  }

  constructor(workspace?: Partial<Workspace>) {
    this.taskStages.unshift(...Object.values(BaseStage));
    this.taskLabels.unshift(...Object.values(BaseLabel));

    Object.assign(this, workspace);
  }
}
