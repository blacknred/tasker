#!/bin/sh

/usr/bin/mc config host rm local
/usr/bin/mc config host add --quiet --api s3v4 local http://minio:9000 $MINIO_ACCESS_KEY $MINIO_SECRET_KEY
/usr/bin/mc rb --force local/somebucketname1/
/usr/bin/mc mb --quiet local/somebucketname1/
/usr/bin/mc policy set public local/somebucketname1
echo "*** MC setup is succeed. ***"
