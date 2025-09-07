'use client';

import { motion } from 'framer-motion';
import { 
  Wallet, 
  BarChart3, 
  Code, 
  Settings, 
  Zap,
  Home,
  TrendingUp,
  FileText
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const navItems = [
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: Wallet,
      description: 'View your assets'
    },
    {
      id: 'actions',
      label: 'Quick Actions',
      icon: Zap,
      description: 'Send, receive, swap'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Performance insights'
    },
    {
      id: 'scripts',
      label: 'DSL Scripts',
      icon: Code,
      description: 'Automation tools'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      description: 'Configuration'
    }
  ];

  return (
    <div className="space-md">
      {/* Navigation Items */}
      <div className="card p-4">
        <h3 className="text-subheading mb-4">Navigation</h3>
        <nav className="space-sm">
          {navItems.map((item, index) => {
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => onTabChange(item.id)}
                className={`w-full nav-item ${
                  isActive ? 'nav-item-active' : 'nav-item-inactive'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive 
                    ? 'bg-blue-100 dark:bg-blue-900' 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs opacity-70">{item.description}</p>
                </div>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="card p-4"
      >
        <h3 className="text-subheading mb-4">Quick Stats</h3>
        <div className="space-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted text-sm">Total Value</span>
            <span className="text-subheading">$125,430</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted text-sm">24h Change</span>
            <span className="status-success font-semibold">+$2,340</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted text-sm">Active Assets</span>
            <span className="text-subheading">3</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted text-sm">Scripts Running</span>
            <span className="text-purple-600 dark:text-purple-400 font-semibold">2</span>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-4"
      >
        <h3 className="text-subheading mb-4">Recent Activity</h3>
        <div className="space-sm">
          {[
            { type: 'send', text: 'Sent 0.5 ETH', time: '2h ago', status: 'confirmed' },
            { type: 'receive', text: 'Received 100 SOL', time: '1d ago', status: 'confirmed' },
            { type: 'script', text: 'DSL script executed', time: '3d ago', status: 'completed' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800"
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'send' ? 'bg-red-500' :
                  activity.type === 'receive' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}></div>
                <span className="text-body text-sm">{activity.text}</span>
              </div>
              <span className="text-muted text-xs">{activity.time}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card p-4"
      >
        <h3 className="text-subheading mb-4">Quick Links</h3>
        <div className="space-sm">
          {[
            { icon: Home, label: 'Dashboard', href: '#' },
            { icon: TrendingUp, label: 'Market Data', href: '#' },
            { icon: FileText, label: 'Documentation', href: '#' },
            { icon: Settings, label: 'Support', href: '#' }
          ].map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
              className="flex items-center space-x-3 p-2 rounded-lg text-muted hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <link.icon className="w-4 h-4" />
              <span className="text-sm">{link.label}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 