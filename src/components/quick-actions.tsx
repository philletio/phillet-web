'use client';

import { motion } from 'framer-motion';
import { 
  Send, 
  Download, 
  Upload, 
  ArrowLeftRight, 
  Plus, 
  QrCode,
  Copy,
  Settings,
  Shield,
  Zap
} from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      icon: Send,
      title: 'Send',
      description: 'Send crypto to any address',
      color: 'bg-blue-500',
      action: () => console.log('Send clicked')
    },
    {
      icon: Download,
      title: 'Receive',
      description: 'Get your wallet address',
      color: 'bg-green-500',
      action: () => console.log('Receive clicked')
    },
    {
      icon: ArrowLeftRight,
      title: 'Swap',
      description: 'Exchange between tokens',
      color: 'bg-yellow-500',
      action: () => console.log('Swap clicked')
    },
    {
      icon: Plus,
      title: 'Buy',
      description: 'Purchase crypto with fiat',
      color: 'bg-purple-500',
      action: () => console.log('Buy clicked')
    },
    {
      icon: Upload,
      title: 'Import',
      description: 'Import existing wallet',
      color: 'bg-indigo-500',
      action: () => console.log('Import clicked')
    },
    {
      icon: QrCode,
      title: 'QR Code',
      description: 'Generate QR for address',
      color: 'bg-pink-500',
      action: () => console.log('QR Code clicked')
    }
  ];

  const tools = [
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure your wallet',
      color: 'bg-gray-500'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Security settings',
      color: 'bg-red-500'
    },
    {
      icon: Zap,
      title: 'Automation',
      description: 'DSL scripts',
      color: 'bg-yellow-500'
    },
    {
      icon: Copy,
      title: 'Backup',
      description: 'Backup your wallet',
      color: 'bg-green-500'
    }
  ];

  return (
    <div className="space-lg">
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="card p-6"
      >
        <h2 className="text-heading mb-6">Quick Actions</h2>
        <div className="grid-row grid-col-6">
          {actions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={action.action}
              className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-subheading text-sm mb-1">{action.title}</h3>
              <p className="text-muted text-xs">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tools & Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-heading mb-6">Tools & Settings</h2>
        <div className="grid-row grid-col-4">
          {tools.map((tool, index) => (
            <motion.button
              key={tool.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="group p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
            >
              <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center mb-3`}>
                <tool.icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-subheading text-sm mb-1">{tool.title}</h3>
              <p className="text-muted text-xs">{tool.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="card p-6"
      >
        <h2 className="text-heading mb-6">Recent Activity</h2>
        <div className="space-sm">
          {[
            { type: 'send', amount: '0.5 ETH', to: '0x1234...5678', time: '2 hours ago', status: 'confirmed' },
            { type: 'receive', amount: '100 SOL', from: '0x8765...4321', time: '1 day ago', status: 'confirmed' },
            { type: 'swap', amount: 'ETH → USDC', value: '$1,250', time: '3 days ago', status: 'pending' }
          ].map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'send' ? 'bg-red-100 dark:bg-red-900/20' :
                  activity.type === 'receive' ? 'bg-green-100 dark:bg-green-900/20' :
                  'bg-yellow-100 dark:bg-yellow-900/20'
                }`}>
                  {activity.type === 'send' && <Send className="w-5 h-5 text-red-600 dark:text-red-400" />}
                  {activity.type === 'receive' && <Download className="w-5 h-5 text-green-600 dark:text-green-400" />}
                  {activity.type === 'swap' && <ArrowLeftRight className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />}
                </div>
                <div>
                  <h4 className="text-subheading">{activity.amount}</h4>
                  <p className="text-muted text-sm">
                    {activity.type === 'send' ? `To ${activity.to}` :
                     activity.type === 'receive' ? `From ${activity.from}` :
                     activity.value}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-muted text-sm">{activity.time}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activity.status === 'confirmed' ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' :
                  'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {activity.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
      >
        <h2 className="text-subheading mb-4">💡 Quick Tips</h2>
        <div className="space-sm text-body">
          <p className="text-sm">• Always double-check addresses before sending</p>
          <p className="text-sm">• Keep your private keys secure and never share them</p>
          <p className="text-sm">• Use DSL scripts to automate your DeFi strategies</p>
          <p className="text-sm">• Regularly backup your wallet</p>
        </div>
      </motion.div>
    </div>
  );
} 