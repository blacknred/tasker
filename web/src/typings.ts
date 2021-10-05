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

export interface IPushSubscription {
  userId: number;
  endpoint: string;
  expirationTime?: number;
  keys: {
    auth: string;
    p256dh: string;
  };
}

export interface ListOptions {
  variant: "list" | "grid";
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

export interface IPushSubscription {
  userId: number;
  endpoint: string;
  expirationTime?: number;
  auth: string;
  p256dh: string;
  createdAt: Date;
  updatedAt: Date;
}
