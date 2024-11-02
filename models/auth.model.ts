// models/auth.model.ts
export interface BaseUser {
  id: string;
  email: string;
  username: string;
}

export interface User extends BaseUser {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface LoginCredentials {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterCredentials {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// models/response.model.ts
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
  success: boolean;
}

export interface ErrorResponse {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}
