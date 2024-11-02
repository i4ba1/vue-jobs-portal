import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  ApiResponse,
  ErrorResponse,
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
} from "../models/auth.model";

class AuthApi {
  private readonly api: AxiosInstance;

  constructor() {
    const config = useRuntimeConfig();
    const baseURL = config.public.apiBaseUrl || "http://localhost:3000/api";

    this.api = axios.create({
      baseURL: baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      (config) => {
        const token = useCookie("token").value;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const errorResponse: ErrorResponse = {
          message:
            error.response?.data?.message || "An unexpected error occurred",
          errors: error.response?.data?.errors,
          status: error.response?.status || 500,
        };
        return Promise.reject(errorResponse);
      }
    );
  }

  // Add specific typed methods for auth operations
  async login(
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await this.api.post<ApiResponse<AuthResponse>>(
      "/auth/login",
      credentials
    );
    return response.data;
  }

  async register(
    credentials: RegisterCredentials
  ): Promise<ApiResponse<AuthResponse>> {
    const response = await this.api.post<ApiResponse<AuthResponse>>(
      "/auth/register",
      credentials
    );
    return response.data;
  }

  async logout(): Promise<void> {
    await this.api.post("/auth/logout");
  }

  async refreshToken(): Promise<ApiResponse<AuthResponse>> {
    const response = await this.api.post<ApiResponse<AuthResponse>>(
      "/auth/refresh"
    );
    return response.data;
  }
}

// Create a composable to use the AuthApi
export const useAuthApi = () => {
  const nuxtApp = useNuxtApp();

  // Use cached instance if available
  if (!nuxtApp.$authApi) {
    nuxtApp.$authApi = new AuthApi();
  }

  return nuxtApp.$authApi as AuthApi;
};
