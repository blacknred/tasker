import { Column, Entity } from 'typeorm';
import { IStage } from '../interfaces/stage.interface';

@Entity()
export class Stage implements IStage {
  @Column({ length: 100 })
  name: string;

  @Column({ nullable: true })
  description?: string;

  constructor(stage?: Partial<Stage>) {
    Object.assign(this, stage);
  }
}
