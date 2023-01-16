import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { AggregateRoot } from '@nestjs/cqrs';
import { ISearchEntry, SearchEntryType } from '@taskapp/shared';

@Entity({ tableName: 'search_entry' })
export class Entry extends AggregateRoot implements ISearchEntry {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ length: 100, check: 'length(text) >= 3' })
  text!: string;

  @Index({ type: 'fulltext' })
  @Property({ type: FullTextType, onUpdate: (issue: Entry) => issue.text })
  searchText!: string;

  @Enum({
    items: () => SearchEntryType,
    default: SearchEntryType.ISSUE,
  })
  type: SearchEntryType = SearchEntryType.ISSUE;

  constructor(instance?: Partial<Entry>) {
    super();
    Object.assign(this, instance);
  }
}
