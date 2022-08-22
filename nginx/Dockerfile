FROM node:alpine as build
RUN apk add --no-cache g++ make py3-pip
# RUN apk add --no-cache libc6-compat
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY package*.json yarn.lock ./
RUN yarn --dev install && yarn cache clean
COPY . .
RUN yarn build && yarn export

FROM umputun/nginx-le:latest as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
# serving static fe
COPY --from=build /usr/src/app/out /usr/share/nginx/html

# ???
# We need nginx to perform the Let’s Encrypt validation But nginx won’t start if the certificates are missing.
# So what do we do? Create a dummy certificate, start nginx, delete the dummy and request the real certificates.
# This will check if your certificate is up for renewal every 12 hours as recommended by Let’s Encrypt.
# This makes nginx reload its configuration (and certificates) every six hours in the background and launches nginx in the foreground.
# 1. ssl only on prod(le-nginx) and http on dev(nginx) - bad decision
# 2. different http & https configs based domain ENV - http available only throuth /.well-known
# 3. full https with le & sss - this

# FROM nginx:mainline-alpine
# nginx reload its configuration (and certificates) every six hours
# CMD [ "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'" ]