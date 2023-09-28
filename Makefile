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
	@./registry.sh
	make release-images

dev:
	make check-docker
	@if [ ! -f .env.dev ]; then\
		cp .env.example .env.dev;\
	fi
	@cd ./docker
	@ln -s docker-compose.dev.yml docker-compose.override.yml
	docker compose config
	docker network create infrastructure
# docker compose build --no-cache $(c)
	@echo "Running [i] project..."
	docker-compose up $(c)








