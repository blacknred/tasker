export enum IssuePriority {
  TRIVIAL = 'TRIVIAL',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  BLOCKER = 'BLOCKER',
}

export enum IssueType {
  EPIC = 'EPIC',
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG',
}

export enum IssueRelation {
  RELATE = 'RELATE',
  BLOCK = 'BLOCK',
  DUPLICATE = 'DUPLICATE',
  CAUSE = 'CAUSE',
}
