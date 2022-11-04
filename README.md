# Taskapp

<img src="services/web/static/images/logo.svg" width="75"/>

Microservice monorepo boilerplate for task management app

[![CI](https://github.com/blacknred/full-taskapp/workflows/Build%20and%20release/badge.svg)](https://github.com/blacknred/full-taskapp/actions)

## Architecture

| Services             | Container            | Stack                    | Ports  |
| -------------------- | -------------------- | ------------------------ | ------ |
| Redis                | redis                | Redis                    | 6379   |
| Queue                | rabbitmq             | RabbitMQ                 | 5672   |
| DB                   | postgres             | Postgres                 | 5432   |
| Prometheus           | prometheus           | Prometheus               | 9090   |
| User CRUD            | user-service         | TS, NestJs, TCP          | 8080   |
| Auth CRUD            | auth-service         | TS, NestJs, TCP          | 8081   |
| Workspace CRUD       | workspace-service    | TS, NestJs, TCP, AMQP    | 8082   |
| Billing CRUD         | billing-service      | TS, NestJs, TCP, AMQP    | 8083   |
| Notification worker  | notification-service | TS, NestJs, AMQP         | 8084   |
| Workerbot worker     | workerbot-service    | TS, NestJs, AMQP         | 8085   |
| Dev Web              | web                  | TS, NextJS               | 3000   |
| Grafana UI           | grafana              | Grafana                  | 3001   |
| API Gateway          | gateway              | Nginx, REST, Swagger, FE | 80/443 |

- for a real world scenario you definitely need an easily sharded nosql db instead of ordbms

## Run the project

### Setup

1. Fork/Clone this repo

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

### Build and Run the App

1. Set the Environment variables in .env.dev

1. Fire up the Containers

   ```sh
   make network
   make dev-check
   make dev
   ```

### Release

1. Build and push images to the hub

```sh
$ make release
# will ask you for a version tag or fallback to branchname-commithash
QUEST:   Version tag?:[master-87265e6] -> 1.0.0 
INFO:    Starting build for version 1.0.0
```

### Production

1. Set the Environment variables in .env

1. Run the containers:

   ```sh
   make network
   make prod-build
   make prod
   ```
