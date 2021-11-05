# TaskQ

Microservice boilerplate for task management app

## Architecture

| Services               | Container            | Stack                 | Ports |
| ---------------------- | -------------------- | --------------------- | ----- |
| Cache                  | redis                | Redis                 | 6379  |
| Queue                  | rabbitmq             | RabbitMQ              | 5672  |
| User DB                | user-db              | Postgres              | 5432  |
| Workspace DB           | workspace-db         | MongoDB               | 27017 |
| User CRUD service      | user-service         | TS, NestJS, TCP       | 8082  |
| Workspace CRUD service | workspace-service    | TS, NestJS, TCP       | 8083  |
| Worker service         | worker-service       | TS, NestJS, AMQP      | 8084  |
| Notification service   | notification-service | TS, NestJS, AMQP      | 8085  |
| Gateway, Swagger, Docs | gateway              | TS, NestJS, REST      | 8080  |
| Web client             | web                  | TS, NextJS, ChakraUI  | 3000  |
| Prometheus webUI       | prometheus           | Prometheus            | 3001  |
| Grafana UI             | grafana              | Grafana               | 3002  |
<!-- | Auth CRUD service      | auth-service         | TS, NestJS, TCP       | 8081  | -->

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
