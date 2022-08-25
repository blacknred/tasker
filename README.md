# Taskapp

Microservice boilerplate for task management app

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
| Dev Web landing      | web                  | TS, NextJS, Tailwind     | 3000   |
| Dev Web spa          | web-spa              | TS, React, Tailwind      | 3001   |
| Grafana UI           | grafana              | Grafana                  | 3002   |
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

### Production

1. Set the Environment variables in .env

1. Run the containers:

   ```sh
   make network
   make prod-build
   make prod
   ```
