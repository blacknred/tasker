export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum Width {
  lg = "full",
  md = "3xl",
  sm = "md",
}

export interface IPaginated<T> {
  hasMore: boolean;
  total: number;
  items: T[];
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  roles: [Role];
  createdAt: number;
  updatedAt: number;
}

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

export interface ViewOptions {
  variant?: "list" | "grid";
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
