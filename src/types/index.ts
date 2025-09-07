// Основные типы для Philosopher's Wallet

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

// Типы для кошелька
export interface WalletAddress {
  address: string;
  blockchain: Blockchain;
  network: Network;
  balance: string;
  isDefault: boolean;
  createdAt: number;
  label?: string;
}

export interface WalletBalance {
  balance: string;
  symbol: string;
  decimals: number;
  address: string;
  blockchain: Blockchain;
  network: Network;
  usdValue?: string;
  change24h?: number;
}

export interface CreateAddressRequest {
  blockchain: Blockchain;
  network: Network;
  label?: string;
}

export interface CreateAddressResponse {
  address: string;
  privateKey: string;
  blockchain: Blockchain;
  network: Network;
  createdAt: number;
}

// Типы для транзакций
export interface Transaction {
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: string;
  status: TransactionStatus;
  blockchain: Blockchain;
  network: Network;
  timestamp: number;
  gasUsed: string;
  gasPrice: string;
  blockNumber: string;
  confirmations?: number;
  usdValue?: string;
}

export interface SendTransactionRequest {
  fromAddress: string;
  toAddress: string;
  amount: string;
  blockchain: Blockchain;
  network: Network;
  tokenAddress?: string;
  gasPrice?: string;
  gasLimit?: number;
}

export interface SendTransactionResponse {
  txHash: string;
  status: TransactionStatus;
  blockchain: Blockchain;
  network: Network;
  timestamp: number;
}

// Типы для блокчейнов
export enum Blockchain {
  ETHEREUM = 'ethereum',
  POLYGON = 'polygon',
  BSC = 'bsc',
  SOLANA = 'solana',
}

export enum Network {
  MAINNET = 'mainnet',
  TESTNET = 'testnet',
  DEVNET = 'devnet',
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// Типы для DSL и автоматизации
export interface Script {
  id: string;
  name: string;
  description: string;
  code: string;
  language: 'dsl' | 'javascript';
  isActive: boolean;
  triggers: ScriptTrigger[];
  createdAt: number;
  updatedAt: number;
  executionCount: number;
  lastExecuted?: number;
}

export interface ScriptTrigger {
  type: 'EVERY' | 'ONCE' | 'ON_EVENT';
  interval?: string; // для EVERY
  event?: string; // для ON_EVENT
  nextExecution?: number;
}

export interface ScriptExecution {
  id: string;
  scriptId: string;
  status: 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  startedAt: number;
  completedAt?: number;
  gasUsed?: string;
  transactions?: string[];
}

// Типы для шаблонов
export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  author: string;
  rating: number;
  downloads: number;
  code: string;
  tags: string[];
  isVerified: boolean;
  createdAt: number;
  updatedAt: number;
  version: string;
}

// Типы для аналитики
export interface PortfolioAnalytics {
  totalValue: string;
  change24h: number;
  change7d: number;
  change30d: number;
  assets: PortfolioAsset[];
  transactions: Transaction[];
  performance: PerformanceData[];
}

export interface PortfolioAsset {
  symbol: string;
  balance: string;
  usdValue: string;
  percentage: number;
  change24h: number;
  blockchain: Blockchain;
  network: Network;
}

export interface PerformanceData {
  date: string;
  value: number;
  change: number;
}

// Типы для уведомлений
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: number;
  actionUrl?: string;
}

// Типы для биллинга
export interface BillingInfo {
  plan: 'free' | 'pro' | 'enterprise';
  quota: {
    invocations: number;
    storage: number;
    compute: number;
  };
  usage: {
    invocations: number;
    storage: number;
    compute: number;
  };
  nextBillingDate?: number;
  isActive: boolean;
}

// Типы для API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Типы для UI
export interface Theme {
  mode: 'light' | 'dark' | 'system';
  primaryColor: string;
  accentColor: string;
}

export interface AppSettings {
  theme: Theme;
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  security: {
    twoFactorEnabled: boolean;
    sessionTimeout: number;
    autoLock: boolean;
  };
}

// Типы для ошибок
export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

// Типы для форм
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  required: boolean;
  validation?: any;
  options?: { value: string; label: string }[];
}

// Типы для навигации
export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string;
  children?: NavigationItem[];
}

// Типы для модальных окон
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Типы для таблиц
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => any;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
  sorting?: {
    key: keyof T;
    direction: 'asc' | 'desc';
    onSort: (key: keyof T) => void;
  };
}

// Типы для графиков
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    fill?: boolean;
  }[];
}

// Типы для QR кодов
export interface QRCodeData {
  address: string;
  amount?: string;
  label?: string;
  message?: string;
}

// Типы для Web3
export interface Web3Provider {
  name: string;
  icon: string;
  isConnected: boolean;
  account?: string;
  chainId?: number;
}

// Типы для безопасности
export interface SecuritySettings {
  twoFactorEnabled: boolean;
  backupPhraseVerified: boolean;
  lastSecurityCheck: number;
  loginHistory: LoginHistory[];
}

export interface LoginHistory {
  timestamp: number;
  ip: string;
  location: string;
  device: string;
  success: boolean;
}

// Типы для экспорта/импорта
export interface WalletExport {
  version: string;
  addresses: WalletAddress[];
  settings: AppSettings;
  createdAt: number;
}

// Типы для событий
export interface AppEvent {
  type: string;
  payload: any;
  timestamp: number;
  userId: string;
}

// Типы для кэширования
export interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// Типы для мониторинга
export interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'degraded';
  services: {
    [key: string]: 'healthy' | 'unhealthy';
  };
  timestamp: number;
  version: string;
} 