#!/bin/bash
set -e

# delete old notifications(500+) per user
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname notifications <<-EOSQL
	CREATE USER docker;
	CREATE DATABASE docker;
	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
EOSQL

# delete users deleted 30+ days ago
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname users <<-EOSQL
	CREATE USER docker;
	CREATE DATABASE docker;
	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
EOSQL

# delete projects deleted 30+ days
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname projects <<-EOSQL
	CREATE USER docker;
	CREATE DATABASE docker;
	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
EOSQL