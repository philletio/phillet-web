import { create } from 'zustand';
import { apiClient } from '@/lib/api-client';
import type {
  WalletBalanceRequest,
  WalletBalanceResponse,
  WalletAddressesRequest,
  WalletAddressesResponse,
  CreateAddressRequest,
  CreateAddressResponse,
  SendTransactionRequest,
  SendTransactionResponse,
  TransactionHistoryRequest,
  TransactionHistoryResponse,
  BlockchainInfoRequest,
  BlockchainInfoResponse,
} from '@/lib/api-client';

interface WalletState {
  // Балансы
  balances: Record<string, WalletBalanceResponse>;
  balancesLoading: boolean;
  balancesError: string | null;
  
  // Адреса
  addresses: WalletAddressesResponse | null;
  addressesLoading: boolean;
  addressesError: string | null;
  
  // Транзакции
  transactions: TransactionHistoryResponse | null;
  transactionsLoading: boolean;
  transactionsError: string | null;
  
  // Информация о блокчейне
  blockchainInfo: Record<string, BlockchainInfoResponse>;
  blockchainInfoLoading: boolean;
  blockchainInfoError: string | null;
}

interface WalletActions {
  // Балансы
  getBalance: (request: WalletBalanceRequest) => Promise<void>;
  clearBalances: () => void;
  
  // Адреса
  getAddresses: (request: WalletAddressesRequest) => Promise<void>;
  createAddress: (request: CreateAddressRequest) => Promise<CreateAddressResponse | null>;
  clearAddresses: () => void;
  
  // Транзакции
  getTransactionHistory: (request: TransactionHistoryRequest) => Promise<void>;
  sendTransaction: (request: SendTransactionRequest) => Promise<SendTransactionResponse | null>;
  clearTransactions: () => void;
  
  // Блокчейн
  getBlockchainInfo: (request: BlockchainInfoRequest) => Promise<void>;
  clearBlockchainInfo: () => void;
  
  // Общие
  clearAll: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

type WalletStore = WalletState & WalletActions;

export const useWalletStore = create<WalletStore>((set, get) => ({
  // State
  balances: {},
  balancesLoading: false,
  balancesError: null,
  
  addresses: null,
  addressesLoading: false,
  addressesError: null,
  
  transactions: null,
  transactionsLoading: false,
  transactionsError: null,
  
  blockchainInfo: {},
  blockchainInfoLoading: false,
  blockchainInfoError: null,

  // Actions
  getBalance: async (request: WalletBalanceRequest) => {
    const key = `${request.blockchain}-${request.network}-${request.tokenAddress || 'native'}`;
    
    set({ balancesLoading: true, balancesError: null });
    
    try {
      const response = await apiClient.getWalletBalance(request);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data) {
        throw new Error('No balance data received');
      }
      
      set((state) => ({
        balances: {
          ...state.balances,
          [key]: response.data!,
        },
        balancesLoading: false,
        balancesError: null,
      }));
    } catch (error) {
      set({
        balancesLoading: false,
        balancesError: error instanceof Error ? error.message : 'Failed to get balance',
      });
    }
  },

  clearBalances: () => {
    set({
      balances: {},
      balancesError: null,
    });
  },

  getAddresses: async (request: WalletAddressesRequest) => {
    set({ addressesLoading: true, addressesError: null });
    
    try {
      const response = await apiClient.getWalletAddresses(request);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data) {
        throw new Error('No addresses data received');
      }
      
      set({
        addresses: response.data,
        addressesLoading: false,
        addressesError: null,
      });
    } catch (error) {
      set({
        addressesLoading: false,
        addressesError: error instanceof Error ? error.message : 'Failed to get addresses',
      });
    }
  },

  createAddress: async (request: CreateAddressRequest): Promise<CreateAddressResponse | null> => {
    set({ addressesError: null });
    
    try {
      const response = await apiClient.createWalletAddress(request);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data) {
        throw new Error('No address data received');
      }
      
      // Обновляем список адресов
      await get().getAddresses({
        blockchain: request.blockchain,
        network: request.network,
      });
      
      return response.data;
    } catch (error) {
      set({
        addressesError: error instanceof Error ? error.message : 'Failed to create address',
      });
      return null;
    }
  },

  clearAddresses: () => {
    set({
      addresses: null,
      addressesError: null,
    });
  },

  getTransactionHistory: async (request: TransactionHistoryRequest) => {
    set({ transactionsLoading: true, transactionsError: null });
    
    try {
      const response = await apiClient.getTransactionHistory(request);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data) {
        throw new Error('No transaction history data received');
      }
      
      set({
        transactions: response.data,
        transactionsLoading: false,
        transactionsError: null,
      });
    } catch (error) {
      set({
        transactionsLoading: false,
        transactionsError: error instanceof Error ? error.message : 'Failed to get transaction history',
      });
    }
  },

  sendTransaction: async (request: SendTransactionRequest): Promise<SendTransactionResponse | null> => {
    set({ transactionsError: null });
    
    try {
      const response = await apiClient.sendTransaction(request);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data) {
        throw new Error('No transaction response received');
      }
      
      // Обновляем историю транзакций
      await get().getTransactionHistory({
        address: request.fromAddress,
        blockchain: request.blockchain,
        network: request.network,
        limit: 50,
        offset: 0,
      });
      
      return response.data;
    } catch (error) {
      set({
        transactionsError: error instanceof Error ? error.message : 'Failed to send transaction',
      });
      return null;
    }
  },

  clearTransactions: () => {
    set({
      transactions: null,
      transactionsError: null,
    });
  },

  getBlockchainInfo: async (request: BlockchainInfoRequest) => {
    const key = `${request.blockchain}-${request.network}`;
    
    set({ blockchainInfoLoading: true, blockchainInfoError: null });
    
    try {
      const response = await apiClient.getBlockchainInfo(request);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      if (!response.data) {
        throw new Error('No blockchain info data received');
      }
      
      set((state) => ({
        blockchainInfo: {
          ...state.blockchainInfo,
          [key]: response.data!,
        },
        blockchainInfoLoading: false,
        blockchainInfoError: null,
      }));
    } catch (error) {
      set({
        blockchainInfoLoading: false,
        blockchainInfoError: error instanceof Error ? error.message : 'Failed to get blockchain info',
      });
    }
  },

  clearBlockchainInfo: () => {
    set({
      blockchainInfo: {},
      blockchainInfoError: null,
    });
  },

  clearAll: () => {
    set({
      balances: {},
      balancesLoading: false,
      balancesError: null,
      addresses: null,
      addressesLoading: false,
      addressesError: null,
      transactions: null,
      transactionsLoading: false,
      transactionsError: null,
      blockchainInfo: {},
      blockchainInfoLoading: false,
      blockchainInfoError: null,
    });
  },

  setError: (error: string | null) => {
    set({
      balancesError: error,
      addressesError: error,
      transactionsError: error,
      blockchainInfoError: error,
    });
  },

  clearError: () => {
    set({
      balancesError: null,
      addressesError: null,
      transactionsError: null,
      blockchainInfoError: null,
    });
  },
})); 