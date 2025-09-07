'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import { WelcomeScreen } from '@/components/welcome-screen';
import { Dashboard } from '@/components/dashboard';

export default function HomePage() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Проверяем аутентификацию при загрузке
    if (!isAuthenticated) {
      // Если пользователь не аутентифицирован, показываем welcome screen
      return;
    }
  }, [isAuthenticated]);

  // Если пользователь аутентифицирован, показываем dashboard
  if (isAuthenticated && user) {
    return <Dashboard />;
  }

  // Иначе показываем welcome screen
  return <WelcomeScreen />;
} 