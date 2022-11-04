network: ##
	docker network create infrastructure
	@echo "docker infrastructure is created."


dev-build: ##
	docker compose -f docker-compose.dev.yml build --no-cache $(c)

prod-build: ##
	docker compose -f docker-compose.yml build --no-cache $(c)



dev-check: ##
	docker compose -f docker-compose.dev.yml config

prod-check: ##
	docker compose -f docker-compose.yml config



dev: ##
	@echo "running [i] project..."
	docker compose -f docker-compose.dev.yml up $(c)

prod: ##
	@echo "running [i] project..."
	docker compose -f docker-compose.yml up $(c)