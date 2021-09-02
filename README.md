# Tasker

Microservice boilerplate for task manager app

## Architecture

| Services           | Container       | Stack                    | Ports |
| ------------------ | ----------------| ------------------------ | ----- |
| User DB            | user-db         | Postgres                 | 5432  |
| Task DB            | task-db         | MongoDB                  | 27017 |
| Cache              | redis           | Redis                    | 6379  |
| Message broker     | rabbitmq        | RabbitMQ                 | 5672  |
| User service       | user-service    | TS, NestJS, TCP          | 4001  |
| Task service       | task-service    | TS, NestJS, AMQP         | 4002  |
| Email service      | email-service   | TS, NestJS, AMQP         | 4003  |
| Auth service       | auth-service    | TS, NestJS, TCP          | 4004  |
| Gateway, SwaggerUI | gateway         | TS, NestJS, REST         | 4000  |
| Web client         | web             | TS, NextJS, ChakraUI     | 3000  |

## Run the project

### Setup

1. Fork/Clone this repo

1. Download [Docker](https://docs.docker.com/docker-for-mac/install/) (if necessary)

### Build and Run the App

1. Set the Environment variables in .env.test

1. Fire up the Containers

   ```sh
   make network
   make test:check
   make test
   ```

### Production

1. Set the Environment variables in .env

1. Run the containers:

   ```sh
   make network
   make prod:buid
   make prod
   ```
