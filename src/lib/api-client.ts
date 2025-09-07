// API Client для интеграции с Phillet Gateway
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    permissions: string[];
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RegisterResponse {
  userId: string;
  message: string;
}

export interface WalletBalanceRequest {
  blockchain: string;
  network: string;
  tokenAddress?: string;
}

export interface WalletBalanceResponse {
  balance: string;
  symbol: string;
  decimals: number;
  address: string;
  blockchain: string;
  network: string;
}

export interface WalletAddressesRequest {
  blockchain: string;
  network: string;
}

export interface WalletAddress {
  address: string;
  blockchain: string;
  network: string;
  balance: string;
  isDefault: boolean;
  createdAt: string;
}

export interface WalletAddressesResponse {
  addresses: WalletAddress[];
}

export interface CreateAddressRequest {
  blockchain: string;
  network: string;
  label?: string;
}

export interface CreateAddressResponse {
  address: string;
  privateKey: string;
  blockchain: string;
  network: string;
  createdAt: string;
}

export interface SendTransactionRequest {
  fromAddress: string;
  toAddress: string;
  amount: string;
  blockchain: string;
  network: string;
  tokenAddress?: string;
  gasPrice?: string;
  gasLimit?: number;
}

export interface SendTransactionResponse {
  txHash: string;
  status: string;
  blockchain: string;
  network: string;
  timestamp: number;
}

export interface TransactionHistoryRequest {
  address: string;
  blockchain: string;
  network: string;
  limit?: number;
  offset?: number;
}

export interface Transaction {
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  status: string;
  blockchain: string;
  network: string;
  timestamp: number;
  gasUsed?: string;
  gasPrice?: string;
  blockNumber?: number;
}

export interface TransactionHistoryResponse {
  transactions: Transaction[];
  total: number;
}

export interface BlockchainInfoRequest {
  blockchain: string;
  network: string;
}

export interface BlockchainInfoResponse {
  blockchain: string;
  network: string;
  currentBlock: number;
  gasPrice: string;
  status: string;
  lastUpdated: number;
}

export interface HealthResponse {
  status: string;
  version: string;
  timestamp: number;
  services: Record<string, string>;
}

class ApiClient {
  private baseUrl: string;
  private accessToken: string | null = null;

  constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080') {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private loadToken(): void {
    if (typeof window !== 'undefined') {
      this.accessToken = localStorage.getItem('accessToken');
    }
  }

  private setToken(token: string): void {
    this.accessToken = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  }

  private clearToken(): void {
    this.accessToken = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.accessToken) {
      headers.Authorization = `Bearer ${this.accessToken}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          this.clearToken();
          throw new Error('Unauthorized - please login again');
        }
        
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  // Auth endpoints
  async authenticate(credentials: AuthRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/v1/auth/authenticate', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.data) {
      this.setToken(response.data.accessToken);
    }

    return response;
  }

  async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    return this.request<RegisterResponse>('/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async refreshToken(refreshToken: string): Promise<ApiResponse<AuthResponse>> {
    const response = await this.request<AuthResponse>('/v1/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });

    if (response.data) {
      this.setToken(response.data.accessToken);
    }

    return response;
  }

  // Wallet endpoints
  async getWalletBalance(request: WalletBalanceRequest): Promise<ApiResponse<WalletBalanceResponse>> {
    const params = new URLSearchParams({
      blockchain: request.blockchain,
      network: request.network,
    });
    
    if (request.tokenAddress) {
      params.append('tokenAddress', request.tokenAddress);
    }

    return this.request<WalletBalanceResponse>(`/v1/wallet/balance?${params}`);
  }

  async getWalletAddresses(request: WalletAddressesRequest): Promise<ApiResponse<WalletAddressesResponse>> {
    const params = new URLSearchParams({
      blockchain: request.blockchain,
      network: request.network,
    });

    return this.request<WalletAddressesResponse>(`/v1/wallet/addresses?${params}`);
  }

  async createWalletAddress(request: CreateAddressRequest): Promise<ApiResponse<CreateAddressResponse>> {
    return this.request<CreateAddressResponse>('/v1/wallet/addresses', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async sendTransaction(request: SendTransactionRequest): Promise<ApiResponse<SendTransactionResponse>> {
    return this.request<SendTransactionResponse>('/v1/wallet/send', {
      method: 'POST',
      body: JSON.stringify(request),
    });
  }

  async getTransactionHistory(request: TransactionHistoryRequest): Promise<ApiResponse<TransactionHistoryResponse>> {
    const params = new URLSearchParams({
      address: request.address,
      blockchain: request.blockchain,
      network: request.network,
    });

    if (request.limit) {
      params.append('limit', request.limit.toString());
    }

    if (request.offset) {
      params.append('offset', request.offset.toString());
    }

    return this.request<TransactionHistoryResponse>(`/v1/wallet/transactions?${params}`);
  }

  // Blockchain endpoints
  async getBlockchainInfo(request: BlockchainInfoRequest): Promise<ApiResponse<BlockchainInfoResponse>> {
    const params = new URLSearchParams({
      blockchain: request.blockchain,
      network: request.network,
    });

    return this.request<BlockchainInfoResponse>(`/v1/blockchain/info?${params}`);
  }

  // Health check
  async healthCheck(): Promise<ApiResponse<HealthResponse>> {
    return this.request<HealthResponse>('/v1/health');
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  logout(): void {
    this.clearToken();
  }

  getToken(): string | null {
    return this.accessToken;
  }
}

// Создаем singleton instance
export const apiClient = new ApiClient();

// Экспортируем типы для использования в других модулях
export type {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
  RegisterResponse,
  WalletBalanceRequest,
  WalletBalanceResponse,
  WalletAddressesRequest,
  WalletAddress,
  WalletAddressesResponse,
  CreateAddressRequest,
  CreateAddressResponse,
  SendTransactionRequest,
  SendTransactionResponse,
  TransactionHistoryRequest,
  Transaction,
  TransactionHistoryResponse,
  BlockchainInfoRequest,
  BlockchainInfoResponse,
  HealthResponse,
}; 