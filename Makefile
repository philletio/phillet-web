# Philosopher's Wallet Frontend Makefile

.PHONY: help install dev build start test lint format clean docker-build docker-run docker-stop

# Default target
help:
	@echo "Philosopher's Wallet Frontend - Available commands:"
	@echo ""
	@echo "Development:"
	@echo "  install     - Install dependencies"
	@echo "  dev         - Start development server"
	@echo "  build       - Build for production"
	@echo "  start       - Start production server"
	@echo ""
	@echo "Code Quality:"
	@echo "  test        - Run tests"
	@echo "  test-watch  - Run tests in watch mode"
	@echo "  test-coverage - Run tests with coverage"
	@echo "  lint        - Run ESLint"
	@echo "  format      - Format code with Prettier"
	@echo "  type-check  - Run TypeScript type checking"
	@echo ""
	@echo "Docker:"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run   - Run Docker container"
	@echo "  docker-stop  - Stop Docker container"
	@echo ""
	@echo "Utilities:"
	@echo "  clean       - Clean build artifacts"
	@echo "  storybook   - Start Storybook"
	@echo "  e2e         - Run E2E tests"
	@echo "  e2e-ui      - Run E2E tests with UI"

# Development
install:
	@echo "Installing dependencies..."
	npm install

dev:
	@echo "Starting development server..."
	npm run dev

build:
	@echo "Building for production..."
	npm run build

start:
	@echo "Starting production server..."
	npm start

# Testing
test:
	@echo "Running tests..."
	npm test

test-watch:
	@echo "Running tests in watch mode..."
	npm run test:watch

test-coverage:
	@echo "Running tests with coverage..."
	npm run test:coverage

# Code Quality
lint:
	@echo "Running ESLint..."
	npm run lint

format:
	@echo "Formatting code with Prettier..."
	npm run format

type-check:
	@echo "Running TypeScript type checking..."
	npm run type-check

# Docker
docker-build:
	@echo "Building Docker image..."
	docker build -t phillet-web .

docker-run:
	@echo "Running Docker container..."
	docker run -d --name phillet-web -p 3000:3000 phillet-web

docker-stop:
	@echo "Stopping Docker container..."
	docker stop phillet-web || true
	docker rm phillet-web || true

# Utilities
clean:
	@echo "Cleaning build artifacts..."
	rm -rf .next
	rm -rf node_modules
	rm -rf coverage
	rm -rf dist

storybook:
	@echo "Starting Storybook..."
	npm run storybook

e2e:
	@echo "Running E2E tests..."
	npm run e2e

e2e-ui:
	@echo "Running E2E tests with UI..."
	npm run e2e:ui

# Development workflow
setup: install
	@echo "Setting up development environment..."
	@echo "Creating .env.local file..."
	@if [ ! -f .env.local ]; then \
		echo "NEXT_PUBLIC_API_URL=http://localhost:8080" > .env.local; \
		echo "NEXT_PUBLIC_APP_NAME=Philosopher's Wallet" >> .env.local; \
		echo "NEXT_PUBLIC_APP_VERSION=0.1.0" >> .env.local; \
		echo ".env.local created with default values"; \
	else \
		echo ".env.local already exists"; \
	fi

dev-full: setup dev

# Production deployment
deploy-staging:
	@echo "Deploying to staging..."
	npm run build
	# Add your staging deployment commands here

deploy-production:
	@echo "Deploying to production..."
	npm run build
	# Add your production deployment commands here

# Performance
analyze:
	@echo "Analyzing bundle size..."
	npm run analyze

lighthouse:
	@echo "Running Lighthouse audit..."
	npx lighthouse http://localhost:3000 --output=html --output-path=./lighthouse-report.html

# Security
security-audit:
	@echo "Running security audit..."
	npm audit
	npm audit fix

# Database
db-migrate:
	@echo "Running database migrations..."
	# Add database migration commands here

db-reset:
	@echo "Resetting database..."
	# Add database reset commands here

# Monitoring
monitor:
	@echo "Starting monitoring..."
	# Add monitoring commands here

# Backup
backup:
	@echo "Creating backup..."
	# Add backup commands here

# All-in-one commands
full-test: lint type-check test test-coverage
	@echo "Full test suite completed"

full-build: clean install build
	@echo "Full build completed"

full-deploy: full-build deploy-production
	@echo "Full deployment completed"

# Development helpers
watch:
	@echo "Watching for changes..."
	npm run dev

logs:
	@echo "Showing logs..."
	docker logs -f phillet-web

status:
	@echo "Checking application status..."
	@curl -s http://localhost:3000/api/health || echo "Application not responding"

# Environment setup
env-dev:
	@echo "Setting up development environment..."
	@cp .env.example .env.local
	@echo "Development environment configured"

env-prod:
	@echo "Setting up production environment..."
	@cp .env.production .env.local
	@echo "Production environment configured"

# Git helpers
git-clean:
	@echo "Cleaning git repository..."
	git clean -fd
	git reset --hard HEAD

git-update:
	@echo "Updating git repository..."
	git pull origin main
	git submodule update --init --recursive

# Documentation
docs:
	@echo "Generating documentation..."
	npm run docs

docs-serve:
	@echo "Serving documentation..."
	npm run docs:serve

# Package management
update-deps:
	@echo "Updating dependencies..."
	npm update
	npm audit fix

install-prod:
	@echo "Installing production dependencies..."
	npm ci --only=production

# Performance optimization
optimize:
	@echo "Optimizing for production..."
	npm run build
	npm run analyze

# Health checks
health:
	@echo "Running health checks..."
	@npm run type-check
	@npm run lint
	@npm test
	@echo "All health checks passed"

# Quick start for new developers
onboarding: setup dev-full
	@echo "Onboarding completed! Development server is running at http://localhost:3000" 