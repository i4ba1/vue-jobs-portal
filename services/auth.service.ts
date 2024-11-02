// services/auth.service.ts
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../models/auth.model";

import { useAuthApi } from "./auth.api";

export const useAuthService = () => {
  const authApi = useAuthApi();

  const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await authApi.login(credentials);
    return response.data;
  };

  const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await authApi.register(credentials);
    return response.data;
  };

  const logout = async (): Promise<void> => {
    await authApi.logout();
  };

  const refreshToken = async (): Promise<AuthResponse> => {
    const response = await authApi.refreshToken();
    return response.data;
  };

  return {
    login,
    register,
    logout,
    refreshToken
  };
};
