# Notes

> You need to create a keyfile to replicaset member authentication: `openssl rand -base64 756 > keyfile; chmod 400 keyfile; chown 999:999 keyfile`

> You need to call `rs.initiate(conf)` to initialize replicaset after all instances are up so either

1. run `docker-compose up`, then `sleep 10` and then run script with `rs.initiate(conf)` on primary container
2. or just use healthcheck script

> secondary nodes elect a new primary node if the previous one is stopped

> connect backend: `mongodb://127.0.0.1:27017,127.0.0.1:27018/?replicaSet=rs0`
> connect host viewers to primary: `mongodb://127.0.0.1:27017/?replicaSet=rs0`
