# Makefile for burmese_stem_ai

.PHONY: help
help: ## Help
	@echo 'Usage:'
	@echo "  make [command]"
	@echo 'Commands:'
	@grep -E '^[a-zA-Z_0-9%-]+:.*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?##"}; {printf "  \033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: init
init: ## Prepare Environment
	cp .env.local .env
	npm install

.PHONY: run
run: ## Run server
	docker compose up --build -d mongodb
	npm run dev

.PHONY: lint
lint: ## Lint
	npm run lint

.PHONY: init-db
init-db: ## Init Database
	docker compose up --build -d mongodb
	npm run init-db

.PHONY: dk-up
dk-up: ## Docker Up
	docker compose up --build -d

.PHONY: dk-down
dk-down: ## Docker Down
	docker compose down

.PHONY: db-dump
db-dump: ## Dump Database
	mongodump --uri="mongodb://localhost:27017/burmesestemai" --out="./db_dumps/burmesestemai_dump_$(date +%Y%m%d_%H%M%S)"

.PHONY: connect-ec2
connect-ec2: ## Connect to EC2
	ssh -i ./EC2KeyPair.pem ec2-user@ec2-18-208-163-135.compute-1.amazonaws.com