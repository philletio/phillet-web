'use client';

import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Wallet,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export function PortfolioOverview() {
  // Mock data for demonstration
  const portfolioData = {
    totalValue: 125430.50,
    change24h: 2340.75,
    changePercent: 1.89,
    assets: [
      {
        name: 'Ethereum',
        symbol: 'ETH',
        balance: 12.5,
        value: 45620.00,
        change24h: 890.50,
        changePercent: 1.99,
        color: '#627eea'
      },
      {
        name: 'Solana',
        symbol: 'SOL',
        balance: 245.8,
        value: 23450.00,
        change24h: -450.25,
        changePercent: -1.88,
        color: '#9945ff'
      },
      {
        name: 'Bitcoin',
        symbol: 'BTC',
        balance: 0.85,
        value: 56360.50,
        change24h: 1900.50,
        changePercent: 3.48,
        color: '#f7931a'
      }
    ]
  };

  const isPositive = portfolioData.changePercent >= 0;

  return (
    <div className="space-lg">
      {/* Portfolio Summary */}
      <div className="grid-row grid-col-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center space-x-1 ${isPositive ? 'status-success' : 'status-error'}`}>
              {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
              <span className="text-sm font-medium">{Math.abs(portfolioData.changePercent)}%</span>
            </div>
          </div>
          <h3 className="balance-display text-gray-900 dark:text-white mb-1">
            ${portfolioData.totalValue.toLocaleString()}
          </h3>
          <p className="text-muted text-sm">Total Portfolio Value</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center space-x-1 ${isPositive ? 'status-success' : 'status-error'}`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">24h</span>
            </div>
          </div>
          <h3 className={`balance-display mb-1 ${isPositive ? 'status-success' : 'status-error'}`}>
            {isPositive ? '+' : ''}${portfolioData.change24h.toLocaleString()}
          </h3>
          <p className="text-muted text-sm">24h Change</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div className="text-muted">
              <span className="text-sm font-medium">Active</span>
            </div>
          </div>
          <h3 className="balance-display text-gray-900 dark:text-white mb-1">
            {portfolioData.assets.length}
          </h3>
          <p className="text-muted text-sm">Active Assets</p>
        </motion.div>
      </div>

      {/* Assets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card p-6"
      >
        <h3 className="text-subheading mb-6">Your Assets</h3>
        <div className="space-sm">
          {portfolioData.assets.map((asset, index) => (
            <motion.div
              key={asset.symbol}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="crypto-icon"
                  style={{ backgroundColor: asset.color }}
                >
                  {asset.symbol}
                </div>
                <div>
                  <h4 className="text-subheading">{asset.name}</h4>
                  <p className="text-muted text-sm">{asset.balance} {asset.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="balance-display text-gray-900 dark:text-white">${asset.value.toLocaleString()}</p>
                <div className={`flex items-center space-x-1 text-sm ${asset.changePercent >= 0 ? 'status-success' : 'status-error'}`}>
                  {asset.changePercent >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  <span>{Math.abs(asset.changePercent)}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card p-6"
      >
        <h3 className="text-subheading mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="btn-primary">
            Send
          </button>
          <button className="btn-primary bg-green-600 hover:bg-green-700">
            Receive
          </button>
          <button className="btn-primary bg-yellow-600 hover:bg-yellow-700">
            Swap
          </button>
          <button className="btn-primary bg-purple-600 hover:bg-purple-700">
            Buy
          </button>
        </div>
      </motion.div>
    </div>
  );
} 