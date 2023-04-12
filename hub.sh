#!/usr/bin/env bash
set -e

bold=$(tput bold)
normal=$(tput sgr0)
USER="${bold}$(tput setaf 2)USER:   ${normal}"
PASSWORD="${bold}$(tput setaf 4)PASSWORD:  ${normal}"

read -r -p "${USER} Docker Hub user? -> " HUB_USER
read -r -p "${PASSWORD} Docker Hub password? -> " HUB_PASSWORD

if [ -z "${HUB_USER}" ] || [ -z "${HUB_PASSWORD}" ]; then
  echo "Please set Docker hub credentials"
  exit 1
else
  docker login -u ${HUB_USER} -p ${HUB_PASSWORD}
  echo "${HUB_USER} Successfully logged in to Docker Hub"
fi



# 	openssl req -x509 -nodes -newkey rsa:2048 -keyout key.pem -out cert.pem -sha256 -days 365 \
#     -subj "/C=GB/ST=London/L=London/O=Alros/OU=IT Department/CN=localhost"