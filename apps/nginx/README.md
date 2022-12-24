# Taskapp Api Gateway

## Stack

Nginx(+njs)

## Features

Proxy/Gateway(nginx)

- Api gateway
  - auth(request) guard
  - http cache
  - api versioning
  - proxying HTTP1.1 microservices
- Infrastructure proxy
  - Auth(inner) guard
  - proxying TCP: redis, postgres
  - proxying HTTP1.1: kibana, grafana, prometheus-ui, rabbitmq managment
- Static serve
  - frontends
  - swagger-ui
- Misc
  - ballancing
  - security: ddos, helmet, cors, ssl
  - metrics(Prometheus)
  - opentracing

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```
