'use client';

import { useState } from 'react';
import { useWalletStore } from '@/store/wallet';
import { SendTransactionRequest } from '@/lib/api-client';

interface SendTransactionProps {
  fromAddress: string;
  blockchain: string;
  network: string;
  onSuccess?: (txHash: string) => void;
  onError?: (error: string) => void;
}

export function SendTransaction({
  fromAddress,
  blockchain,
  network,
  onSuccess,
  onError,
}: SendTransactionProps) {
  const { sendTransaction, transactionsError } = useWalletStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    toAddress: '',
    amount: '',
    tokenAddress: '',
    gasPrice: '',
    gasLimit: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const request: SendTransactionRequest = {
        fromAddress,
        toAddress: formData.toAddress,
        amount: formData.amount,
        blockchain,
        network,
        tokenAddress: formData.tokenAddress || undefined,
        gasPrice: formData.gasPrice || undefined,
        gasLimit: formData.gasLimit ? parseInt(formData.gasLimit) : undefined,
      };

      const response = await sendTransaction(request);

      if (response) {
        onSuccess?.(response.txHash);
        // Очищаем форму
        setFormData({
          toAddress: '',
          amount: '',
          tokenAddress: '',
          gasPrice: '',
          gasLimit: '',
        });
      } else {
        onError?.('Failed to send transaction');
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidAddress = (address: string) => {
    // Простая валидация адреса (можно улучшить для разных блокчейнов)
    return address.length >= 26 && address.length <= 42;
  };

  const isValidAmount = (amount: string) => {
    const num = parseFloat(amount);
    return !isNaN(num) && num > 0;
  };

  const isFormValid = () => {
    return (
      isValidAddress(formData.toAddress) &&
      isValidAmount(formData.amount) &&
      !isLoading
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Send Transaction
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* From Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From Address
          </label>
          <input
            type="text"
            value={fromAddress}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
          />
        </div>

        {/* To Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Address *
          </label>
          <input
            type="text"
            value={formData.toAddress}
            onChange={(e) => handleInputChange('toAddress', e.target.value)}
            placeholder="0x..."
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formData.toAddress && !isValidAddress(formData.toAddress)
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300'
            }`}
            required
          />
          {formData.toAddress && !isValidAddress(formData.toAddress) && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid address
            </p>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount *
          </label>
          <input
            type="number"
            step="any"
            value={formData.amount}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            placeholder="0.0"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              formData.amount && !isValidAmount(formData.amount)
                ? 'border-red-300 focus:ring-red-500'
                : 'border-gray-300'
            }`}
            required
          />
          {formData.amount && !isValidAmount(formData.amount) && (
            <p className="mt-1 text-sm text-red-600">
              Please enter a valid amount
            </p>
          )}
        </div>

        {/* Token Address (optional) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token Address (optional)
          </label>
          <input
            type="text"
            value={formData.tokenAddress}
            onChange={(e) => handleInputChange('tokenAddress', e.target.value)}
            placeholder="0x... (leave empty for native token)"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gas Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gas Price (optional)
          </label>
          <input
            type="text"
            value={formData.gasPrice}
            onChange={(e) => handleInputChange('gasPrice', e.target.value)}
            placeholder="Auto"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gas Limit */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gas Limit (optional)
          </label>
          <input
            type="number"
            value={formData.gasLimit}
            onChange={(e) => handleInputChange('gasLimit', e.target.value)}
            placeholder="Auto"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Error Display */}
        {transactionsError && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-red-800">{transactionsError}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-2 px-4 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isFormValid()
              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Sending...
            </div>
          ) : (
            'Send Transaction'
          )}
        </button>
      </form>

      {/* Network Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Network:</span> {blockchain} ({network})
        </div>
      </div>
    </div>
  );
} 