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
	sudo adduser taskapp
	sudo groupadd docker
	sudo usermod -aG docker taskapp
	sudo usermod -aG sudo taskapp
	su taskapp

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


# LOCAL ENV

docker-local
	@if [ ! -f .env.local ]; then\
		cp .env.example .env.local;\
	fi
	$(MAKE) check-docker
	cd /compose
	@ln -s docker-compose.local.yml docker-compose.override.yml
	@docker compose config
	@docker network create infrastructure

start-local-gateway
	$(MAKE) docker-local
	@docker-compose build gateway --no-cache $(c)
	@docker-compose up gateway

start-local-workspace-svc
	$(MAKE) docker-local
	@docker-compose build workspace-svc --no-cache $(c)
	@docker-compose up workspace-svc

start-local-notification-svc
	$(MAKE) docker-local
	@docker-compose build notification-svc --no-cache $(c)
	@docker-compose up notification-svc

start-local-search-svc
	$(MAKE) docker-local
	@docker-compose build search-svc --no-cache $(c)
	@docker-compose up search-svc

start-local-report-svc
	$(MAKE) docker-local
	@docker-compose build report-svc --no-cache $(c)
	@docker-compose up report-svc

start-local-project-command-svc
	$(MAKE) docker-local
	@docker-compose build project-command-svc --no-cache $(c)
	@docker-compose up project-command-svc

start-local-project-query-svc
	$(MAKE) docker-local
	@docker-compose build project-query-svc --no-cache $(c)
	@docker-compose up project-query-svc

start-local
	$(MAKE) docker-local
	@docker-compose build --no-cache $(c)
	@docker-compose up

# DEV ENV

pull-containers # or helm upgrade
	sudo docker-compose down --remove-orphans
	sudo docker-compose pull
	sudo docker-compose up -d

start-dev
	$(MAKE) check-docker
	cd ~/be-taskapp/compose
	@ln -s docker-compose.dev.yml docker-compose.override.yml
	$(MAKE) pull-containers

# STAGING ENV

start-staging
	$(MAKE) check-docker
	cd ~/be-taskapp/compose
	@ln -s docker-compose.staging.yml docker-compose.override.yml
	$(MAKE) pull-containers

# PROD ENV

start-prod
	$(MAKE) check-docker
	cd ~/be-taskapp/compose
	@echo "here we need to run db migrations"
	@ln -s docker-compose.prod.yml docker-compose.override.yml
	$(MAKE) pull-containers

# MONITORING

start-monitoring
	$(MAKE) check-docker
	cd ~/be-taskapp/compose
	@ln -s docker-compose.monitoring.yml docker-compose.override.yml
	$(MAKE) pull-containers
	


