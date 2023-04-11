configure-dev:
	@cp .env.example .env
	@ln -s docker-compose.dev.yml docker-compose.override.yml
	docker network create infrastructure
	@echo "docker is configured."

build:
	docker compose -f docker-compose.dev.yml config
	docker compose -f docker-compose.dev.yml build --no-cache $(c)

dev:
	@echo "running [i] project..."
	
	docker-compose up $(c)



# Build release images
build:
	@./scripts/build

# Push release images
push:
	@./scripts/push

release: build push
$ make release
QUEST:   Version tag?:[master-87265e6] -> 1.0.0
INFO:    Starting build for version 1.0.0

# dev-build: ##
# 	docker compose -f docker-compose.dev.yml build --no-cache $(c)
# prod-build: ##
# 	docker compose -f docker-compose.yml build --no-cache $(c)
# dev-check: ##
# 	docker compose -f docker-compose.dev.yml config
# prod-check: ##
# 	docker compose -f docker-compose.yml config

# dev: ##
# 	@echo "running [i] project..."
# 	docker compose -f docker-compose.dev.yml up $(c)
# prod: ##
# 	@echo "running [i] project..."
# 	docker compose -f docker-compose.yml up $(c)


# # 	openssl req -x509 -nodes -newkey rsa:2048 -keyout key.pem -out cert.pem -sha256 -days 365 \
# #     -subj "/C=GB/ST=London/L=London/O=Alros/OU=IT Department/CN=localhost"

# # docker build . -t my_app



#####VERSION FROM THE TAG
IMAGE_ID=${{ secrets.DOCKER_REGISTRY_URL }}/${{ secrets.DOCKER_REPOSITORY_NAME }}/$IMAGE_NAME
# Strip git ref prefix from version
VERSION=$(echo "${{ github.ref }}" | sed -e 's,.*/\(.*\),\1,')
# Strip "v" prefix from tag name
[[ "${{ github.ref }}" == "refs/tags/"* ]] && VERSION=$(echo $VERSION | sed -e 's/^v//')
# Use Docker `latest` tag convention
[ "$VERSION" == "master" ] && VERSION=latest
echo IMAGE_ID=$IMAGE_ID
echo VERSION=$VERSION

docker tag image $IMAGE_ID:$VERSION
docker push $IMAGE_ID:$VERSION


##########In the above snippet, the version is determined from the tag - since we have multiple services and multiple different versions, I had to change that. So instead of getting github.ref, I had to read the value(s) from the VERSION file:
IMAGE_ID=${{ secrets.DOCKER_REGISTRY_URL }}/${{ secrets.DOCKER_REPOSITORY_NAME }}/$IMAGE_NAME
VERSION=$(cat service1/VERSION)
echo IMAGE_ID=$IMAGE_ID
echo VERSION=$VERSION
docker tag image $IMAGE_ID:$VERSION
docker push $IMAGE_ID:$VERSION








.PHONY: release
# Current branch-commit (example: master-ab01c1z)
BRANCH  = $$(git rev-parse --abbrev-ref HEAD)
SHA 	= $$(git rev-parse HEAD)
CURRENT	= $$(echo $(BRANCH) | sed 's/\//-/g')-$$(echo $(SHA) | cut -c1-7)
TAG		= $(CURRENT)
COMPOSE_RELEASE	= docker-compose -f docker-compose.yml

# Setup a development environment
configure:
	@./scripts/create-env
	@ln -s docker-compose.dev.yml docker-compose.override.yml

# Build release images
build:
	@./scripts/build

# Push release images
push:
	@./scripts/push

release: build push

# Build release image
build-ci:
	@echo "building release..."
	@echo "[i] tag: $(TAG)"
	@TAG=$(TAG) $(COMPOSE_RELEASE) build

# TODO: Start services and check if they are available with eg. healthcheck(.js)
smoketest-ci:
	@echo "starting smoketest for release..."

# Push release image
push-ci:
	@echo "pushing release..."
	@echo "[i] tag: $(TAG)"
	@TAG=$(TAG) $(COMPOSE_RELEASE) push

release-ci: build-ci smoketest-ci push-ci

# Provision dev, staging, qa and prod env
provision:
	@./scripts/provision

provision-teardown:
	@cd operations/provision/terraform; terraform destroy; cd -

# Deploy
deploy:
	@echo "[i] Not implemented yet"





GIT_SHA1 = $(shell git rev-parse --verify HEAD)
IMAGES_TAG = ${shell git describe --exact-match --tags 2> /dev/null || echo 'latest'}
IMAGE_PREFIX = my-super-awesome-monorepo-

IMAGE_DIRS = $(wildcard app/* platform/*)

# All targets are `.PHONY` ie allways need to be rebuilt
.PHONY: all ${IMAGE_DIRS}

# Build all images
all: ${IMAGE_DIRS}

# Build and tag a single image
${IMAGE_DIRS}:
	$(eval IMAGE_NAME := $(subst /,-,$@))
	docker build -t ${DOCKERHUB_OWNER}/${IMAGE_PREFIX}${IMAGE_NAME}:${IMAGES_TAG} -t ${DOCKERHUB_OWNER}/${IMAGE_PREFIX}${IMAGE_NAME}:latest --build-arg TAG=${IMAGE_PREFIX}${IMAGE_NAME} --build-arg GIT_SHA1=${GIT_SHA1} $@
	docker push ${DOCKERHUB_OWNER}/${IMAGE_PREFIX}${IMAGE_NAME}:${IMAGES_TAG}
	docker push ${DOCKERHUB_OWNER}/${IMAGE_PREFIX}${IMAGE_NAME}:latest