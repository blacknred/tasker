# !/bin/bash
set -e

# backup every day at midnight
chmod +x /backup.sh
/usr/bin/crontab 0 0 0 * * pg_dumpall -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" | gzip > dump_$(date +%Y-%m-%d_%H_%M_%S).pgsql.gz

# # hard deletion every day at midnight
# chmod +x /hard_deletion.sh
# /usr/bin/crontab 0 0 0 * * /hard_deletion.sh >/dev/null 2>&1

# # delete old notifications(500+) per user
# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname notifications <<-EOSQL
# 	CREATE USER docker;
# 	CREATE DATABASE docker;
# 	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
# EOSQL
# # delete users deleted 30+ days ago
# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname users <<-EOSQL
# 	CREATE USER docker;
# 	CREATE DATABASE docker;
# 	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
# EOSQL
# # delete projects deleted 30+ days
# psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname projects <<-EOSQL
# 	CREATE USER docker;
# 	CREATE DATABASE docker;
# 	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
# EOSQL

# start cron
/usr/sbin/crond -f -l 8
