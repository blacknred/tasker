GIT_SHA1 = $(shell git rev-parse --verify HEAD)
IMAGES_TAG = ${shell git describe --exact-match --tags 2> /dev/null || echo 'latest'}
IMAGE_DIRS = $(wildcard apps/*)
IMAGE_PREFIX = taskapp

# dont skip release if there is a release file in directory
.PHONY: release

check-docker:
	@if [ -x "$(command -v docker-compose)" ]; then\
    echo "please install docker-compose";\
    exit 1;\
	fi

# for all apps
release-images:
	${IMAGE_DIRS}

# build/tag/push a single image
${IMAGE_DIRS}:
	$(eval IMAGE_NAME := $(subst apps,,$@))
	@echo "Releasing ${IMAGE_PREFIX}${IMAGE_NAME}:${IMAGES_TAG}..."
	docker build -t ${IMAGE_PREFIX}${IMAGE_NAME}:${IMAGES_TAG} -t ${IMAGE_PREFIX}${IMAGE_NAME}:latest --build-arg SERVICE_NAME=${IMAGE_NAME} $@
	docker push ${IMAGE_PREFIX}${IMAGE_NAME}:${IMAGES_TAG}
	docker push ${IMAGE_PREFIX}${IMAGE_NAME}:latest

release:
	make check-docker
	@./scripts/registry.sh
	make release-images

# dev-all:
# 	make check-docker
# 	@if [ ! -f .env.local ]; then\
# 		cp .env.example .env.local;\
# 	fi
# 	@cd ./docker
# 	@ln -s docker-compose.local.yml docker-compose.override.yml
# 	@docker compose config
# 	@docker network create infrastructure
# # docker compose build --no-cache $(c)
# 	@echo "Running [i] project..."
# 	@docker-compose up $(c)

# dev-keycloak:
# 	@cd ./docker
# 	@ln -s docker-compose.local.yml docker-compose.override.yml
# 	@docker compose config
# 	@docker network create infrastructure
# 	@echo "Running [i] project..."
# 	@docker-compose up keycloak



# feature:
# 	./scripts/create_feature.sh

# hotfix: ## Create hotfix
# 	./scripts/create_hotfix.sh

# release: ## Create release
# 	./scripts/create_release.sh	

# create-merge-failed: ## Create failed merge PR
# 	./scripts/create_merge_failed.sh





# start-api-with-docker-image: ## Run API with docker (don't forget to build the image locally before)
# 	@docker run --net host -e SPRING_PROFILES_ACTIVE="dev" -e SPRING_DATASOURCE_URL="jdbc:postgresql://localhost:5432/api?stringtype=unspecified&reWriteBatchedInserts=true" api:0.0.1-SNAPSHOT

# start-api: ## Run API with docker compose
# 	@docker compose up -d
# 	@docker compose logs -f api

# start-infra: ## Run required infrastructure with docker compose
# 	$(MAKE) kill start-database start-keycloak start-rabbitmq

# restart-infra: ## Reset and start required infrastructure with docker compose
# 	$(MAKE) start-database start-keycloak start-rabbitmq

# start-all: ## Run all containers with docker compose
# 	$(MAKE) start-infra start-api

# restart-all: ## Restart containers with docker compose
# 	@docker compose stop api # used to rebuild API after modification
# 	@docker compose up -d
# 	@docker compose logs -f api

# start-database: ## Run api database
# 	@docker compose up -d ${DB_CONTAINER} --wait
# 	# Set db_user as superuser to allow replication slot creation within migration
# 	@docker exec -i ${DB_CONTAINER} psql "host=localhost dbname=${DB_NAME} user=${DB_SUPERUSER} password=${DB_PASS}" --command "ALTER USER \"${DB_USER}\" WITH SUPERUSER;"

# kill-database: ## Kill api database
# 	@docker compose rm -sf ${DB_CONTAINER}
# 	@docker volume rm -f api_database

# start-keycloak : ## Run keycloak
# 	@docker compose up -d ${DB_CONTAINER_KC} --wait
# 	@cat ./scripts/dumps/keycloak.sql | docker exec -i ${DB_CONTAINER_KC} psql "host=localhost dbname=${DB_NAME_KC} user=${DB_USER_KC} password=${DB_PASS_KC}"
# 	@docker compose up -d keycloak

# kill-keycloak : ## Kill keycloak
# 	@docker compose rm -sf keycloak ${DB_CONTAINER_KC}
# 	@docker volume rm -f api_database_kc

# start-rabbitmq : ## Run rabbitmq
# 	@docker compose up -d rabbitmq

# kill-rabbitmq : ## Kill rabbitmq
# 	@docker compose rm -sf rabbitmq
# 	@docker volume rm -f api_rabbitmq

# kill: ## Kill and reset project
# 	@docker compose down
# 	@mvn install -DskipTests
# 	$(MAKE) kill-database kill-keycloak kill-rabbitmq