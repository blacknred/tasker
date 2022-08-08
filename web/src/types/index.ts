export enum Width {
  lg = "full",
  md = "3xl",
  sm = "sm",
}

export enum Privilege {
  EDIT_WORKSPACE = "EDIT_WORKSPACE",
  CREATE_AGENT = "CREATE_AGENT",
  READ_ANY_AGENT = "READ_ANY_AGENT",
  EDIT_ANY_AGENT = "EDIT_ANY_AGENT",
  DELETE_ANY_AGENT = "DELETE_AGENT",
  CREATE_SAGA = "CREATE_SAGA",
  READ_ANY_SAGA = "READ_ANY_SAGA",
  EDIT_ANY_SAGA = "EDIT_ANY_SAGA",
  DELETE_ANY_SAGA = "DELETE_ANY_SAGA",
  CREATE_TASK = "CREATE_TASK",
  READ_ANY_TASK = "READ_ANY_TASK",
  EDIT_ANY_TASK = "EDIT_ANY_TASK",
  DELETE_ANY_TASK = "DELETE_TASK",
}

export enum BaseStage {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export enum BaseLabel {
  MINOR = "MINOR",
  ROUTINE = "ROUTINE",
  CRITICAL = "CRITICAL",
}

/** UI */

export interface ViewOptions<T> {
  variant?: "list" | "grid";
  "sort.field"?: keyof T;
  "sort.order"?: "ASC" | "DESC";
  limit?: 10 | 50 | 100;
}

export type ITaskViewOptions = ViewOptions<
  Omit<ITask, "id" | "description" | "userId">
>;

/* DTO */

export interface IPaginated<T> {
  hasMore: boolean;
  total: number;
  items: T[];
}

export type ValidationError = {
  field: string;
  message: string;
};

export interface BaseResponse<T = unknown> {
  status: number;
  errors: ValidationError[] | null;
  data: T;
}

/* ENTITIES */

export interface IUser {
  id: number;
  name: string;
  email: string;
  image?: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IAuth = Partial<IUser> & {
  vapidPublicKey?: string;
};

export interface IPushSubscription {
  endpoint: string;
  expirationTime?: number;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export interface IRole {
  name: string;
  privileges: Privilege[];
}

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  stages: string[];
  labels: string[];
  roles: IRole[];
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  //
  agent?: IAgent;
}

export interface IUpdateRecord {
  field: string;
  prev: unknown;
  next: unknown;
}

export interface ITaskUpdate {
  records: IUpdateRecord[];
  agent: IAgent;
  createdAt: string;
}

export interface ITask {
  id: string;
  name: string;
  description?: string;
  stage?: string;
  label?: string;
  createdAt: string;
  expiresAt?: string;
  updates: ITaskUpdate[];
  creator: IAgent;
  assignee?: IAgent;
  sagas: Pick<ISaga, "id" | "name">[];
}

export interface ISaga {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  expiresAt?: string;
  creator: IAgent;
}

export interface IAgent {
  id: string;
  userId: number;
  name: string;
  image?: string;
  createdAt: string;
  role?: string;
}



// export type BaseEntity = {
//   id: number
//   createdAt: string
// }

// export type SortingDto<T extends BaseEntity> = {
//   'sort.field': keyof T
//   'sort.order': 'ASC' | 'DESC'
// }

// export type KeysetPaginationDto<T extends BaseEntity> = Partial<
//   Omit<T, keyof BaseEntity>
// > &
//   SortingDto<T> & {
//     limit: number
//     cursor: string
//   }
// export type BaseResponseDto<T = unknown> = {
//   message?: string
//   errors?: ValidationErrorDto[]
//   data?: T
// }

// export type PaginatedDataDto<T> = {
//   hasMore: boolean
//   total?: number
//   items: T[]
// }

// export type ValidationErrorDto = {
//   field: string
//   message: string
// }
