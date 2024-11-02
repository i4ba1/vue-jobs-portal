// composables/useAuth.ts
import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterCredentials } from '../models/auth.model';
import { useAuthService } from '../services/auth.service';

export function useAuth() {
  const authService = useAuthService();
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!user.value);

  const login = async (credentials: LoginCredentials) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await authService.login(credentials);
      user.value = response.user;
      
      const token = useCookie('token');
      token.value = response.token;
      
      navigateTo('/dashboard');
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      loading.value = true;
      error.value = null;
      const response = await authService.register(credentials);
      user.value = response.user;
      
      const token = useCookie('token');
      token.value = response.token;
      
      navigateTo('/dashboard');
    } catch (err: any) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      const token = useCookie('token');
      token.value = null;
      user.value = null;
      navigateTo('/login');
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout
  };
}