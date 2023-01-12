import { Entity, Enum, Index, Property } from '@mikro-orm/core';
import { FullTextType } from '@mikro-orm/postgresql';
import { ISearchRecord, SearchRecordType } from '@taskapp/shared';

@Entity({ tableName: 'project' })
export class Search implements ISearchRecord {
  @Property({ type: 'uuid' })
  projectId!: string;

  @Property({ length: 100, check: 'length(name) >= 5' })
  name!: string;

  @Index({ type: 'fulltext' })
  @Property({ type: FullTextType, onUpdate: (issue: Search) => issue.name })
  searchName!: string;

  @Enum({
    items: () => SearchRecordType,
    default: SearchRecordType.ISSUE,
  })
  type: SearchRecordType = SearchRecordType.ISSUE;
}
