import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '@/types';
import { apiClient, AuthRequest as ApiAuthRequest, RegisterRequest as ApiRegisterRequest } from '@/lib/api-client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (credentials: LoginRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          // Вызываем реальный API через gateway
          const apiRequest: ApiAuthRequest = {
            email: credentials.email,
            password: credentials.password,
          };
          
          const response = await apiClient.authenticate(apiRequest);
          
          if (response.error) {
            throw new Error(response.error);
          }
          
          if (!response.data) {
            throw new Error('No response data received');
          }

          // Конвертируем ответ API в формат приложения
          const authResponse: AuthResponse = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            expiresAt: response.data.expiresAt,
            user: {
              id: response.data.user.id,
              email: response.data.user.email,
              firstName: response.data.user.firstName,
              lastName: response.data.user.lastName,
              permissions: response.data.user.permissions,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };

          // Сохраняем токены в localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', authResponse.accessToken);
            localStorage.setItem('refreshToken', authResponse.refreshToken);
            localStorage.setItem('expiresAt', authResponse.expiresAt.toString());
          }

          set({
            user: authResponse.user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed',
          });
        }
      },

      register: async (userData: RegisterRequest) => {
        set({ isLoading: true, error: null });
        
        try {
          // Вызываем реальный API через gateway
          const apiRequest: ApiRegisterRequest = {
            email: userData.email,
            password: userData.password,
            firstName: userData.firstName,
            lastName: userData.lastName,
          };
          
          const response = await apiClient.register(apiRequest);
          
          if (response.error) {
            throw new Error(response.error);
          }
          
          set({
            isLoading: false,
            error: null,
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed',
          });
        }
      },

      logout: () => {
        // Очищаем токены из localStorage и API клиента
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('expiresAt');
        }
        
        // Очищаем токен в API клиенте
        apiClient.logout();

        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
); 