'use client';

import { useState } from 'react';
import { LoginForm } from './auth/login-form';
import { RegisterForm } from './auth/register-form';
import { 
  Wallet, 
  Zap, 
  Shield, 
  BarChart3, 
  Code, 
  Globe,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

export function WelcomeScreen() {
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const features = [
    {
      icon: Wallet,
      title: 'Multi-Chain Support',
      description: 'Manage Ethereum, Polygon, BSC, and Solana wallets in one place',
      color: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Code,
      title: 'DSL Automation',
      description: 'Create custom scripts to automate your crypto operations',
      color: 'bg-purple-100 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Enterprise-grade security with multi-signature support',
      color: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      icon: BarChart3,
      title: 'Portfolio Analytics',
      description: 'Comprehensive analytics and performance tracking',
      color: 'bg-orange-100 dark:bg-orange-900',
      iconColor: 'text-orange-600 dark:text-orange-400'
    },
    {
      icon: Zap,
      title: 'Smart Automation',
      description: 'Automate trading strategies and portfolio rebalancing',
      color: 'bg-yellow-100 dark:bg-yellow-900',
      iconColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      icon: Globe,
      title: 'Cross-Platform',
      description: 'Access your wallet from any device, anywhere',
      color: 'bg-indigo-100 dark:bg-indigo-900',
      iconColor: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  const benefits = [
    'No seed phrase storage on servers',
    'Multi-signature wallet support',
    'Real-time portfolio tracking',
    'Automated trading strategies',
    'Cross-chain token swaps',
    'Advanced analytics dashboard'
  ];

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="card p-8 max-w-md mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-heading">Reset Password</h2>
            <p className="text-muted">Enter your email to receive reset instructions</p>
          </div>
          
          <form className="space-md">
            <div className="form-group">
              <label htmlFor="resetEmail" className="form-label">Email</label>
              <input
                id="resetEmail"
                type="email"
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>
            
            <button type="submit" className="btn-primary w-full">
              Send Reset Link
            </button>
            
            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container-lg">
          <div className="flex-between py-4">
            <div className="flex-start">
              <div className="icon-container bg-blue-100 dark:bg-blue-900 mr-3">
                <Wallet className="icon-medium text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Philosopher's Wallet
              </h1>
            </div>
            
            <div className="flex-start space-x-4">
              <button className="btn-secondary">
                Documentation
              </button>
              <button className="btn-primary">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-lg py-12">
        <div className="grid-row grid-col-2 gap-12 items-center">
          {/* Left Column - Hero */}
          <div className="space-lg">
            <div className="space-md">
              <h1 className="text-heading">
                Philosopher's
                <span className="block text-gradient">Wallet</span>
              </h1>
              
              <p className="text-body text-lg max-w-2xl leading-relaxed">
                The intelligent cryptocurrency wallet that combines
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> multi-chain support</span> with
                <span className="text-purple-600 dark:text-purple-400 font-semibold"> DSL automation</span> for
                the ultimate crypto management experience.
              </p>
            </div>

            <div className="space-md">
              <h3 className="text-subheading">Why Choose Philosopher's Wallet?</h3>
              <div className="space-sm">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex-start">
                    <CheckCircle className="icon-small text-green-600 dark:text-green-400 mr-3" />
                    <span className="text-body">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-start">
              <button className="btn-primary">
                Start Free Trial
                <ArrowRight className="icon-small" />
              </button>
              <button className="btn-secondary">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="flex-center">
            {showLogin ? (
              <LoginForm
                onSwitchToRegister={() => setShowLogin(false)}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 space-lg">
          <div className="text-center space-md">
            <h2 className="text-heading">Powerful Features</h2>
            <p className="text-body max-w-3xl mx-auto">
              Everything you need to manage your cryptocurrency portfolio with intelligence and automation.
            </p>
          </div>

          <div className="grid-row grid-col-3">
            {features.map((feature, index) => (
              <div key={index} className="card card-hover p-6">
                <div className="flex-start mb-4">
                  <div className={`icon-container ${feature.color}`}>
                    <feature.icon className={`icon-medium ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-subheading">{feature.title}</h3>
                </div>
                <p className="text-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24">
          <div className="card p-8">
            <div className="grid-row grid-col-4 text-center">
              <div className="space-sm">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">$2.5B+</div>
                <div className="text-muted">Total Value Locked</div>
              </div>
              <div className="space-sm">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
                <div className="text-muted">Active Users</div>
              </div>
              <div className="space-sm">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">99.9%</div>
                <div className="text-muted">Uptime</div>
              </div>
              <div className="space-sm">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">4.9/5</div>
                <div className="text-muted">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 