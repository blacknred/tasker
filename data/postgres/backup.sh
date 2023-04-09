#!/bin/bash
set -e

pg_dumpall -v ON_ERROR_STOP=1  --username "$POSTGRES_USER" | gzip > db_backup.pgsql.gz
