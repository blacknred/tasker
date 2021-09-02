#!/usr/bin/env bash

mongo --eval "db.auth('$MONGO_INITDB_ROOT_USERNAME','$MONGO_INITDB_ROOT_PASSWORD');db.createUser({ user: '$MONGO_USER', pwd: '$MONGO_PASSWORD', roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }] });"
