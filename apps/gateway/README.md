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
  - proxying HTTP1.1: grafana, prometheus-ui, jaeger, rabbitmq managment, alertmanager
- Static serve
  - frontends
  - swagger-ui
- Misc
  - ballancing
  - security: ddos, helmet, cors, ssl
  - metrics(Prometheus)
  - opentracing
