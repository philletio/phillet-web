'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Send, 
  Download, 
  BarChart3, 
  Code, 
  Settings, 
  LogOut,
  Plus,
  ChevronDown,
  Bell,
  Search
} from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import { PortfolioOverview } from './portfolio/portfolio-overview';
import { QuickActions } from './quick-actions';
import { Navigation } from './navigation';
import { WalletBalance } from './wallet-balance';
import { SendTransaction } from './send-transaction';

export function Dashboard() {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('portfolio');

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container-lg py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Philosopher's Wallet</h1>
                <p className="text-xs text-muted">v0.1.0</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <input
                  type="text"
                  placeholder="Search addresses, transactions, or scripts..."
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-muted hover:text-gray-900 dark:hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold text-white">
                    {user?.firstName?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-muted">{user?.email}</p>
                </div>
                <button className="p-1 text-muted hover:text-gray-900 dark:hover:text-white transition-colors">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-muted hover:text-red-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container-lg py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  <PortfolioOverview />
                  
                  {/* Wallet Balances */}
                  <div className="card p-6">
                    <h2 className="text-heading mb-4">Wallet Balances</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <WalletBalance 
                        blockchain="ethereum" 
                        network="mainnet" 
                        autoRefresh={true}
                      />
                      <WalletBalance 
                        blockchain="ethereum" 
                        network="goerli" 
                        autoRefresh={true}
                      />
                    </div>
                  </div>
                </div>
              )}
              {activeTab === 'actions' && (
                <div className="space-y-6">
                  <QuickActions />
                  
                  {/* Send Transaction */}
                  <div className="card p-6">
                    <h2 className="text-heading mb-4">Send Transaction</h2>
                    <SendTransaction
                      fromAddress="0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6"
                      blockchain="ethereum"
                      network="goerli"
                      onSuccess={(txHash) => {
                        console.log('Transaction sent:', txHash);
                        // Можно добавить уведомление
                      }}
                      onError={(error) => {
                        console.error('Transaction failed:', error);
                        // Можно добавить уведомление об ошибке
                      }}
                    />
                  </div>
                </div>
              )}
              {activeTab === 'analytics' && (
                <div className="card p-6">
                  <h2 className="text-heading mb-4">Analytics</h2>
                  <p className="text-body">Advanced analytics coming soon...</p>
                </div>
              )}
              {activeTab === 'scripts' && (
                <div className="card p-6">
                  <h2 className="text-heading mb-4">DSL Scripts</h2>
                  <p className="text-body">Script automation coming soon...</p>
                </div>
              )}
              {activeTab === 'settings' && (
                <div className="card p-6">
                  <h2 className="text-heading mb-4">Settings</h2>
                  <p className="text-body">Settings panel coming soon...</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="w-14 h-14 bg-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
} 