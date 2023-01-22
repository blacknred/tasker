import { AggregateRoot } from '@nestjs/cqrs';
import {
  FilterCreatedEvent,
  FilterDeletedEvent,
  FilterUpdatedEvent,
  IFilter,
} from '@taskapp/shared';
import { CreateFilterDto } from '../dto';

export class FilterAggregate extends AggregateRoot implements IFilter {
  id!: string;

  ownerId!: string;

  name!: string;

  set schema(s) {
    this.schema = this.schemaSerialiser(s);
  }

  get schema(): string {
    return this.schema;
  }

  constructor(data?: Partial<Omit<FilterAggregate, 'schema'>>) {
    super();
    Object.assign(this, data);
  }

  create() {
    this.apply(new FilterCreatedEvent(this));
  }

  update() {
    this.apply(new FilterUpdatedEvent(this, this.ownerId));
  }

  delete() {
    this.apply(new FilterDeletedEvent(this.id, this.ownerId));
  }

  schemaSerialiser(schema: CreateFilterDto['schema'] | string): string {
    if (typeof schema === 'string') return schema;
    return '?' + schema.map((rec) => `${rec.field}=${rec.value}`).join('&');
  }
}
