#!/usr/bin/env bash

# Get the cli and make it available to use.
# wget http://127.0.0.1:15672/cli/rabbitmqadmin
# chmod +x rabbitmqadmin
# mv rabbitmqadmin /etc/rabbitmq

( sleep 10 && \
rabbitmqctl add_user $RABBITMQ_USER $RABBITMQ_PASSWORD && \
rabbitmqctl set_user_tags $RABBITMQ_USER administrator && \
rabbitmqctl set_permissions -p / $RABBITMQ_USER  ".*" ".*" ".*" && \
rabbitmqctl add_vhost tasker && \
rabbitmqctl set_permissions -p tasker guest ".*" ".*" ".*" && \
./rabbitmqadmin declare exchange --vhost=tasker name=some_exchange type=direct && \
./rabbitmqadmin declare queue --vhost=tasker name=$RABBITMQ_QUEUE durable=true && \
./rabbitmqadmin --vhost=tasker declare binding source="some_exchange" destination_type="queue" destination=$RABBITMQ_QUEUE routing_key="some_routing_key" ) & \
rabbitmq-server