# !/bin/bash
set -e

# backup every day at midnight
chmod +x /backup.sh
/usr/bin/crontab 0 0 0 * * /backup.sh >/dev/null 2>&1

# hard deletion every day at midnight
chmod +x /hard_deletion.sh
/usr/bin/crontab 0 0 0 * * /hard_deletion.sh >/dev/null 2>&1

# start cron
/usr/sbin/crond -f -l 8
