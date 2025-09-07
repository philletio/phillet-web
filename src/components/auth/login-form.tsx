'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

interface LoginFormProps {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onSwitchToRegister, onForgotPassword }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card card-auth p-8">
      <div className="space-md">
        <h2 className="text-heading text-center">Welcome Back</h2>
        <p className="text-body text-center text-muted">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-md">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="flex-start">
            <div className="icon-container bg-blue-100 dark:bg-blue-900">
              <Mail className="icon-medium text-blue-600 dark:text-blue-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">Password</label>
          <div className="flex-start">
            <div className="icon-container bg-red-100 dark:bg-red-900">
              <Lock className="icon-medium text-red-600 dark:text-red-400" />
            </div>
            <div className="password-field-container">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle-btn"
              >
                {showPassword ? <EyeOff className="icon-small" /> : <Eye className="icon-small" />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="form-error">{error}</p>
          </div>
        )}

        <div className="flex-between mb-4">
          <button
            type="button"
            onClick={onForgotPassword}
            className="btn-link"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>

        <div className="text-center mt-6">
          <p className="text-muted">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="btn-link-purple"
            >
              Create account
            </button>
          </p>
        </div>
      </form>
    </div>
  );
} 