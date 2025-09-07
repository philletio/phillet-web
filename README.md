# Philosopher's Wallet - Frontend MVP

Современный веб-интерфейс для Philosopher's Wallet с поддержкой мультичейн кошельков, DSL автоматизации и продвинутой аналитики.

## 🚀 Особенности

- **Мультичейн поддержка**: Ethereum, Solana, Polygon, BSC
- **DSL автоматизация**: Создание и выполнение пользовательских скриптов
- **Продвинутая аналитика**: Реальное время отслеживание портфеля
- **Современный UI/UX**: Красивый и интуитивный интерфейс
- **PWA поддержка**: Установка как нативное приложение
- **Темная тема**: Поддержка светлой и темной темы
- **Адаптивный дизайн**: Оптимизировано для всех устройств

## 🛠 Технологический стек

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Charts**: Recharts
- **Code Editor**: Monaco Editor
- **PWA**: next-pwa

## 📦 Установка

```bash
# Клонирование репозитория
git clone https://github.com/philletio/phillet-web.git
cd phillet-web

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev
```

## 🔧 Конфигурация

### Переменные окружения

Создайте файл `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080

# App Configuration
NEXT_PUBLIC_APP_NAME=Philosopher's Wallet
NEXT_PUBLIC_APP_VERSION=0.1.0

# Analytics (опционально)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

### Настройка API Gateway

Убедитесь, что API Gateway запущен на порту 8080:

```bash
# В директории phillet-gateway
make run
```

## 🏃‍♂️ Запуск

### Режим разработки

```bash
npm run dev
```

Приложение будет доступно по адресу: http://localhost:3000

### Продакшн сборка

```bash
# Сборка
npm run build

# Запуск
npm start
```

### Docker

```bash
# Сборка образа
docker build -t phillet-web .

# Запуск контейнера
docker run -p 3000:3000 phillet-web
```

## 📁 Структура проекта

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Корневой layout
│   ├── page.tsx           # Главная страница
│   └── globals.css        # Глобальные стили
├── components/            # React компоненты
│   ├── auth/             # Компоненты аутентификации
│   ├── portfolio/        # Компоненты портфеля
│   ├── navigation/       # Навигация
│   └── ui/               # UI компоненты
├── lib/                  # Утилиты и библиотеки
│   └── api.ts           # API клиент
├── store/                # Zustand stores
│   └── auth.ts          # Store аутентификации
├── types/                # TypeScript типы
│   └── index.ts         # Основные типы
├── hooks/                # Custom React hooks
├── utils/                # Утилиты
└── constants/            # Константы
```

## 🎨 UI/UX Принципы

### Дизайн система

- **Цветовая палитра**: Современная крипто-тематика
- **Типографика**: Inter для UI, JetBrains Mono для кода
- **Анимации**: Плавные переходы и микроанимации
- **Темы**: Поддержка светлой и темной темы

### Компоненты

- **Адаптивные**: Работают на всех размерах экранов
- **Доступные**: Соответствуют WCAG 2.1
- **Производительные**: Оптимизированы для быстрой работы

## 🔐 Безопасность

- **JWT токены**: Безопасная аутентификация
- **HTTPS**: Принудительное использование в продакшене
- **CSP**: Content Security Policy
- **XSS защита**: Валидация всех входных данных
- **CSRF защита**: Защита от межсайтовых запросов

## 📊 Аналитика и мониторинг

### Встроенная аналитика

- Отслеживание пользовательских действий
- Производительность приложения
- Ошибки и исключения

### Интеграции

- Google Analytics (опционально)
- Sentry для мониторинга ошибок
- Hotjar для анализа поведения пользователей

## 🧪 Тестирование

```bash
# Unit тесты
npm test

# E2E тесты
npm run e2e

# Покрытие кода
npm run test:coverage
```

## 📦 Сборка и деплой

### Vercel (рекомендуется)

```bash
# Установка Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Docker

```bash
# Сборка образа
docker build -t phillet-web .

# Запуск с переменными окружения
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.phillet.io \
  phillet-web
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: phillet-web
spec:
  replicas: 3
  selector:
    matchLabels:
      app: phillet-web
  template:
    metadata:
      labels:
        app: phillet-web
    spec:
      containers:
      - name: phillet-web
        image: philletio/phillet-web:latest
        ports:
        - containerPort: 3000
        env:
        - name: NEXT_PUBLIC_API_URL
          value: "https://api.phillet.io"
```

## 🔄 CI/CD

### GitHub Actions

```yaml
name: Deploy to Production
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - uses: actions/setup-node@v3
      with:
        node-version: '18'
    - run: npm ci
    - run: npm run build
    - run: npm run test
    - uses: vercel/action@v1
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📈 Производительность

### Оптимизации

- **Code Splitting**: Автоматическое разделение кода
- **Image Optimization**: Оптимизация изображений Next.js
- **Lazy Loading**: Ленивая загрузка компонентов
- **Caching**: Кэширование API запросов
- **Bundle Analysis**: Анализ размера бандла

### Метрики

- **Lighthouse Score**: >90 для всех категорий
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🤝 Вклад в проект

1. Fork репозитория
2. Создайте feature branch (`git checkout -b feature/amazing-feature`)
3. Commit изменения (`git commit -m 'Add amazing feature'`)
4. Push в branch (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

### Стандарты кода

- **ESLint**: Линтинг кода
- **Prettier**: Форматирование кода
- **TypeScript**: Строгая типизация
- **Conventional Commits**: Стандартные коммиты

## 📄 Лицензия

Этот проект лицензирован под MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🆘 Поддержка

- **Документация**: [docs.phillet.io](https://docs.phillet.io)
- **Discord**: [discord.gg/phillet](https://discord.gg/phillet)
- **Email**: support@phillet.io
- **Issues**: [GitHub Issues](https://github.com/philletio/phillet-web/issues)

## 🙏 Благодарности

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Анимации
- [Lucide](https://lucide.dev/) - Иконки
- [Zustand](https://zustand-demo.pmnd.rs/) - State management

---

**Philosopher's Wallet** - Умный криптокошелек для DeFi энтузиастов 🚀 