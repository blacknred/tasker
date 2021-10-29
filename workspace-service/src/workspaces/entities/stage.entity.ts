import { Transform } from 'class-transformer';
import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';

export enum BASE_STAGES {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Stage {
  // @ObjectIdColumn()
  // @Transform(({ value }) => value.toString(), { toPlainOnly: true })
  // id: ObjectID;

  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  constructor(stage?: Partial<Stage>) {
    Object.assign(this, stage);
  }
}
