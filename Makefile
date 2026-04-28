.PHONY: help up down restart install build dev seed clean prisma-generate prisma-push prisma-migrate

help: ## Show this help message
	@echo "Available commands:"
	@echo "  make up          - Start Docker services (postgres, meilisearch)"
	@echo "  make down        - Stop Docker services"
	@echo "  make restart     - Restart Docker services"
	@echo "  make install     - Install npm dependencies"
	@echo "  make build       - Build the application"
	@echo "  make dev         - Start development server"
	@echo "  make seed        - Seed the database"
	@echo "  make clean       - Clean build artifacts and node_modules"
	@echo "  make prisma-generate - Generate Prisma client"
	@echo "  make prisma-push  - Push Prisma schema to database"
	@echo "  make prisma-migrate - Run Prisma migrations"

up: ## Start Docker services
	docker-compose up -d

down: ## Stop Docker services
	docker-compose down

restart: ## Restart Docker services
	docker-compose restart

install: ## Install npm dependencies
	npm install

build: ## Build the application
	npm run build

dev: ## Start development server
	npm run dev

seed: ## Seed the database
	npx prisma db push
	npx tsx prisma/seed.ts

clean: ## Clean build artifacts and node_modules
	rm -rf dist node_modules
	docker-compose down -v

prisma-generate: ## Generate Prisma client
	npx prisma generate

prisma-push: ## Push Prisma schema to database
	npx prisma db push

prisma-migrate: ## Run Prisma migrations
	npx prisma migrate dev
