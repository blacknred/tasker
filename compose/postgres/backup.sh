# !/bin/bash
set -e

# backup every midnight
# chmod +x /backup.sh
/usr/bin/crontab 0 0 0 * * pg_dumpall -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" | gzip > dump_$(date +%Y-%m-%d_%H_%M_%S).pgsql.gz

# start cron
/usr/sbin/crond -f -l 8
