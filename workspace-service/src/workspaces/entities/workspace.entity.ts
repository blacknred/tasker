import {
  ArrayType,
  Entity,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { Exclude, Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';
import { BaseLabel, BaseStage } from 'src/tasks/interfaces/task.interface';

@Entity()
export class Workspace {
  @Exclude()
  @PrimaryKey()
  _id: ObjectId;

  @Expose()
  @SerializedPrimaryKey()
  id!: string;

  @Property({ length: 200 })
  name!: string;

  @Property({ nullable: true })
  description?: string;

  @Property({ type: ArrayType, default: Object.values(BaseStage) })
  taskStages: string[] = Object.values(BaseStage);

  @Property({ type: ArrayType, default: Object.values(BaseLabel) })
  taskLabels: string[] = Object.values(BaseLabel);

  @Property({ default: BaseStage.DONE })
  doneStage = BaseStage.DONE;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  creatorId!: number;

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt'].includes(column);
  }

  constructor(workspace?: Partial<Workspace>) {
    Object.assign(this, workspace);
  }
}
