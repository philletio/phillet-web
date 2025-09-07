import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  RefreshTokenRequest,
  WalletBalance,
  WalletAddress,
  CreateAddressRequest,
  CreateAddressResponse,
  SendTransactionRequest,
  SendTransactionResponse,
  Transaction,
  PortfolioAnalytics,
  Script,
  Template,
  Notification,
  BillingInfo,
  HealthStatus,
  ApiResponse,
  PaginatedResponse,
} from '@/types';

class ApiClient {
  private client: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor для добавления токена
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor для обработки ошибок
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = this.getRefreshToken();
            if (refreshToken) {
              const response = await this.refreshToken({ refreshToken });
              this.setTokens(response);
              originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
              return this.client(originalRequest);
            }
          } catch (refreshError) {
            this.clearTokens();
            window.location.href = '/auth/login';
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Token management
  private getAccessToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  private getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  private setTokens(tokens: AuthResponse): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', tokens.accessToken);
      localStorage.setItem('refreshToken', tokens.refreshToken);
      localStorage.setItem('expiresAt', tokens.expiresAt.toString());
    }
  }

  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('expiresAt');
    }
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.client.post('/auth/login', credentials);
    this.setTokens(response.data);
    return response.data;
  }

  async register(userData: RegisterRequest): Promise<{ userId: string; message: string }> {
    const response: AxiosResponse<{ userId: string; message: string }> = await this.client.post('/auth/register', userData);
    return response.data;
  }

  async refreshToken(data: RefreshTokenRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await this.client.post('/auth/refresh', data);
    this.setTokens(response.data);
    return response.data;
  }

  async logout(): Promise<void> {
    this.clearTokens();
  }

  // Health check
  async healthCheck(): Promise<HealthStatus> {
    const response: AxiosResponse<HealthStatus> = await this.client.get('/health');
    return response.data;
  }

  // Wallet endpoints
  async getWalletBalance(blockchain: string, network: string, tokenAddress?: string): Promise<WalletBalance> {
    const params = new URLSearchParams({ blockchain, network });
    if (tokenAddress) {
      params.append('token_address', tokenAddress);
    }
    
    const response: AxiosResponse<WalletBalance> = await this.client.get(`/wallet/balance?${params}`);
    return response.data;
  }

  async getWalletAddresses(blockchain: string, network: string): Promise<WalletAddress[]> {
    const params = new URLSearchParams({ blockchain, network });
    const response: AxiosResponse<{ addresses: WalletAddress[] }> = await this.client.get(`/wallet/addresses?${params}`);
    return response.data.addresses;
  }

  async createWalletAddress(data: CreateAddressRequest): Promise<CreateAddressResponse> {
    const response: AxiosResponse<CreateAddressResponse> = await this.client.post('/wallet/addresses', data);
    return response.data;
  }

  async sendTransaction(data: SendTransactionRequest): Promise<SendTransactionResponse> {
    const response: AxiosResponse<SendTransactionResponse> = await this.client.post('/wallet/send', data);
    return response.data;
  }

  async getTransactionHistory(
    address: string,
    blockchain: string,
    network: string,
    limit: number = 20,
    offset: number = 0
  ): Promise<PaginatedResponse<Transaction>> {
    const params = new URLSearchParams({
      address,
      blockchain,
      network,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    
    const response: AxiosResponse<PaginatedResponse<Transaction>> = await this.client.get(`/wallet/transactions?${params}`);
    return response.data;
  }

  // Analytics endpoints
  async getPortfolioAnalytics(): Promise<PortfolioAnalytics> {
    const response: AxiosResponse<PortfolioAnalytics> = await this.client.get('/analytics/portfolio');
    return response.data;
  }

  // Blockchain info
  async getBlockchainInfo(blockchain: string, network: string): Promise<any> {
    const params = new URLSearchParams({ blockchain, network });
    const response: AxiosResponse<any> = await this.client.get(`/blockchain/info?${params}`);
    return response.data;
  }

  // Scripts endpoints (для будущего DSL функционала)
  async getScripts(): Promise<Script[]> {
    const response: AxiosResponse<Script[]> = await this.client.get('/scripts');
    return response.data;
  }

  async createScript(script: Omit<Script, 'id' | 'createdAt' | 'updatedAt'>): Promise<Script> {
    const response: AxiosResponse<Script> = await this.client.post('/scripts', script);
    return response.data;
  }

  async updateScript(id: string, script: Partial<Script>): Promise<Script> {
    const response: AxiosResponse<Script> = await this.client.put(`/scripts/${id}`, script);
    return response.data;
  }

  async deleteScript(id: string): Promise<void> {
    await this.client.delete(`/scripts/${id}`);
  }

  async executeScript(id: string): Promise<any> {
    const response: AxiosResponse<any> = await this.client.post(`/scripts/${id}/execute`);
    return response.data;
  }

  // Templates endpoints
  async getTemplates(
    category?: string,
    search?: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginatedResponse<Template>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const response: AxiosResponse<PaginatedResponse<Template>> = await this.client.get(`/templates?${params}`);
    return response.data;
  }

  async getTemplate(id: string): Promise<Template> {
    const response: AxiosResponse<Template> = await this.client.get(`/templates/${id}`);
    return response.data;
  }

  async installTemplate(id: string): Promise<Script> {
    const response: AxiosResponse<Script> = await this.client.post(`/templates/${id}/install`);
    return response.data;
  }

  // Notifications endpoints
  async getNotifications(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Notification>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    const response: AxiosResponse<PaginatedResponse<Notification>> = await this.client.get(`/notifications?${params}`);
    return response.data;
  }

  async markNotificationAsRead(id: string): Promise<void> {
    await this.client.put(`/notifications/${id}/read`);
  }

  async markAllNotificationsAsRead(): Promise<void> {
    await this.client.put('/notifications/read-all');
  }

  // Billing endpoints
  async getBillingInfo(): Promise<BillingInfo> {
    const response: AxiosResponse<BillingInfo> = await this.client.get('/billing/info');
    return response.data;
  }

  async upgradePlan(plan: string): Promise<{ checkoutUrl: string }> {
    const response: AxiosResponse<{ checkoutUrl: string }> = await this.client.post('/billing/upgrade', { plan });
    return response.data;
  }

  // Utility methods
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    const expiresAt = localStorage.getItem('expiresAt');
    
    if (!token || !expiresAt) {
      return false;
    }
    
    return Date.now() < parseInt(expiresAt);
  }

  getUser(): any {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}

// Создаем singleton instance
export const apiClient = new ApiClient();

// Экспортируем типы для удобства
export type { ApiClient }; 