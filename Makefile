prod-build: ##
	docker-compose -f docker-compose.yml build --no-cache $(c)

prod-check: ##
	docker-compose -f docker-compose.yml config $(c)

prod: ##
	docker-compose -f docker-compose.yml up $(c)

network: ##
	docker network create infrastructure

dev: ##
	docker-compose -f docker-compose.dev.yml up $(c)

dev-check: ##
	docker-compose -f docker-compose.dev.yml config $(c)

dev-stop: ##
	docker-compose -f docker-compose.dev.yml stop $(c)