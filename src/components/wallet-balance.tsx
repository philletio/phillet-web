'use client';

import { useEffect, useState } from 'react';
import { useWalletStore } from '@/store/wallet';
import { WalletBalanceRequest } from '@/lib/api-client';

interface WalletBalanceProps {
  blockchain: string;
  network: string;
  tokenAddress?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function WalletBalance({
  blockchain,
  network,
  tokenAddress,
  autoRefresh = true,
  refreshInterval = 30000, // 30 секунд
}: WalletBalanceProps) {
  const { balances, balancesLoading, balancesError, getBalance } = useWalletStore();
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  const key = `${blockchain}-${network}-${tokenAddress || 'native'}`;
  const balance = balances[key];

  const refreshBalance = async () => {
    const request: WalletBalanceRequest = {
      blockchain,
      network,
      tokenAddress,
    };
    
    await getBalance(request);
    setLastRefresh(new Date());
  };

  useEffect(() => {
    refreshBalance();
  }, [blockchain, network, tokenAddress]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(refreshBalance, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, blockchain, network, tokenAddress]);

  const formatBalance = (balance: string, decimals: number) => {
    const num = parseFloat(balance) / Math.pow(10, decimals);
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const formatCurrency = (amount: string, symbol: string) => {
    return `${formatBalance(amount, 18)} ${symbol}`;
  };

  if (balancesLoading && !balance) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading balance...</span>
      </div>
    );
  }

  if (balancesError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="text-red-800">Error loading balance: {balancesError}</span>
        </div>
        <button
          onClick={refreshBalance}
          className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!balance) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <span className="text-gray-600">No balance data available</span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          <span className="font-medium text-gray-900">
            {balance.blockchain} ({balance.network})
          </span>
        </div>
        <button
          onClick={refreshBalance}
          disabled={balancesLoading}
          className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
      
      <div className="mb-2">
        <div className="text-2xl font-bold text-gray-900">
          {formatCurrency(balance.balance, balance.symbol)}
        </div>
        <div className="text-sm text-gray-500">
          Address: {balance.address.slice(0, 8)}...{balance.address.slice(-6)}
        </div>
      </div>
      
      <div className="text-xs text-gray-400">
        Last updated: {lastRefresh.toLocaleTimeString()}
        {balancesLoading && <span className="ml-2">(updating...)</span>}
      </div>
    </div>
  );
} 