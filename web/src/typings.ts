export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum Width {
  lg = "full",
  md = "3xl",
  sm = "sm",
}

export enum TaskType {
  LONG = "LONG",
  SHORT = "SHORT",
  MEDIUM = "MEDIUM",
}

export enum TaskPriority {
  CRITICAL = "CRITICAL",
  MAJOR = "MAJOR",
  MODERATE = "MODERATE",
  LOW = "LOW",
}

// Dto
export interface IPaginated<T> {
  hasMore: boolean;
  total: number;
  items: T[];
}

export type ValidationError = {
  field: string;
  message: string;
};

export interface IResponse<T = unknown> {
  status: number;
  errors: ValidationError[] | null;
  data: T;
}

// User entity
export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: [Role];
  createdAt: number;
  updatedAt: number;
}

// Auth entity

export type IAuth = Partial<IUser> & {
  vapidPublicKey?: string;
};

export interface IPushSubscription {
  userId: number;
  endpoint: string;
  expirationTime?: number;
  keys: {
    auth: string;
    p256dh: string;
  };
}

// Task entity

export interface ITask {
  id: string;
  name: string;
  description: string;
  userId: number;
  type: TaskType;
  priority: TaskPriority;
  createdAt: number;
  finishedAt?: number;
}

// Ui

export interface ViewOptions<T> {
  variant?: "list" | "grid";
  "sort.field"?: keyof T;
  "sort.order"?: "ASC" | "DESC";
  limit?: 10 | 50 | 100;
}

export type ITaskViewOptions = ViewOptions<
  Omit<ITask, "id" | "description" | "userId">
>;
