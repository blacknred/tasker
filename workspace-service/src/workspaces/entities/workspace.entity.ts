import { ArrayType, Entity, Property } from '@mikro-orm/core';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { BaseLabel, BaseStage } from 'src/tasks/interfaces/task.interface';
import { BaseEntity } from 'src/__shared__/entities/base.entity';

@Entity()
export class Workspace extends BaseEntity {
  @Property({ nullable: true })
  description?: string;

  @Property({ type: ArrayType, default: Object.values(BaseStage) })
  taskStages: string[] = Object.values(BaseStage);

  @Property({ type: ArrayType, default: Object.values(BaseLabel) })
  taskLabels: string[] = Object.values(BaseLabel);

  @Property({ default: BaseStage.DONE })
  doneStage: string = BaseStage.DONE;

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @Property()
  creatorId!: number;

  agent?: IAgent;

  static isSearchable(column: string) {
    return ['name', 'creatorId', 'createdAt'].includes(column);
  }

  constructor(workspace?: Partial<Workspace>) {
    super(workspace);
  }
}
