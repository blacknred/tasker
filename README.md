# Tasker

Microservice boilerplate for task manager app

## Architecture

| Services             | Container            | Stack                 | Ports |
| -------------------- | -------------------- | --------------------- | ----- |
| User DB              | user-db              | Postgres              | 5432  |
| Notification DB      | notification-db      | Postgres              | 5433  |
| Task DB              | task-db              | MongoDB               | 27017 |
| Cache                | redis                | Redis                 | 6379  |
| Queue                | rabbitmq             | RabbitMQ              | 5672  |
| User CRUD service    | user-service         | TS, NestJS, TCP       | 8081  |
| Task CRUD service    | task-service         | TS, NestJS, TCP       | 8082  |
| Worker service       | worker-service       | TS, NestJS, AMQP      | 8083  |
| Notification service | notification-service | TS, NestJS, TCP       | 8084  |
| Monitoring service   | monitoring-service   | TS, NestJS, TCP       | 8085  |
| Gateway, SwaggerUI   | gateway              | TS, NestJS, REST      | 8080  |
| Web client           | web                  | TS, NextJS, ChakraUI  | 3000  |
| Prometheus webUI     | prometheus           | Prometheus            | 3001  |
| Grafana              | grafana              | Grafana               | 3002  |

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
