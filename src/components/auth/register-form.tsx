'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store/auth';
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from 'lucide-react';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card card-auth p-8">
      <div className="space-md">
        <h2 className="text-heading text-center">Create Account</h2>
        <p className="text-body text-center text-muted">
          Join Philosopher's Wallet today
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-md">
        <div className="grid-row grid-col-2 gap-4">
          <div className="form-group">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <div className="flex-start">
              <div className="icon-container bg-green-100 dark:bg-green-900">
                <User className="icon-medium text-green-600 dark:text-green-400" />
              </div>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder="First name"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <div className="flex-start">
              <div className="icon-container bg-green-100 dark:bg-green-900">
                <User className="icon-medium text-green-600 dark:text-green-400" />
              </div>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="form-input"
                placeholder="Last name"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <div className="flex-start">
            <div className="icon-container bg-blue-100 dark:bg-blue-900">
              <Mail className="icon-medium text-blue-600 dark:text-blue-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
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
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Create a password"
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

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <div className="flex-start">
            <div className="icon-container bg-red-100 dark:bg-red-900">
              <Lock className="icon-medium text-red-600 dark:text-red-400" />
            </div>
            <div className="password-field-container">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle-btn"
              >
                {showConfirmPassword ? <EyeOff className="icon-small" /> : <Eye className="icon-small" />}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="form-error">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full"
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </button>

        <div className="text-center mt-6">
          <p className="text-muted">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="btn-link"
            >
              Sign in
            </button>
          </p>
        </div>
      </form>
    </div>
  );
} 