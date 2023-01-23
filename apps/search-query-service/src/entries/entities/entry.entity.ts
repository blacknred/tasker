import { Entity, Enum, Index, PrimaryKey, Property } from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { SearchEntryType } from '../../../../../libs/shared/src/enums';
import type { IHydratedSearchEntry } from '../../../../../libs/shared/src/interfaces';

@Entity({ tableName: 'search_entry' })
export class Entry implements IHydratedSearchEntry {
  @PrimaryKey({ type: 'uuid' })
  id!: string;

  @Property({ type: 'uuid' })
  userId?: string;

  @Property({ type: 'uuid' })
  projectId?: string;

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
    Object.assign(this, instance);
  }
}
