#!/usr/bin/env bash
mongo ${MONGO_DB} \
  --host localhost \
  --port 27017 \
  -u root \
  -p root \
  --authenticationDatabase admin \
  --eval "db.createUser({user: '${MONGO_USER}', pwd: '${MONGO_PASSWORD}', roles:[{role:'readWrite', db: '${MONGO_DB}'}]});"
