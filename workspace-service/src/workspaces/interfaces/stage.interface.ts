export enum BASE_STAGE {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface IStage {
  name: string;
  description?: string;
}
