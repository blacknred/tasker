# Taskapp Api Gagteway

## Stack

Nginx

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


* authorization/session
* domain object/service (that gets you 99% of data) with data aggregation(combining all the json, protobuf, etc) and returning.
* metrics(background non-block thread pools)
* swagger
* elk logging
* http to tcp
* health status

* security(cors, helmet, ddos)
* caching

data aggregation can be direct or via the separate gateway to isolate domain specific routing and data aggreagtions e.g. Product API Gateway.
