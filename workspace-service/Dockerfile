# Keeping all the unnecessary bloat in the development image.
FROM node:alpine As development
ENV NODE_ENV=development
WORKDIR /usr/src/app
# USER node
# We copying only package*.json files before run npm install to make sure install command
# should run only when either package*.json or yarn.lock files change.
COPY package*.json yarn.lock ./
# we install only devDependencies due to the container being used as a “builder”
RUN yarn --dev install && yarn cache clean
COPY . .
RUN yarn build

FROM node:alpine as production
# node prune utility to reduce node_modules
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin
# make sure we are use production mode on build time
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
# USER node
# same as development but without devDependencies
COPY package*.json ./
RUN yarn install --production=true --frozen-lockfile && yarn cache clean
# run node prune
RUN /usr/local/bin/node-prune
COPY . .
# Here we copy the built /dist folder from the development image
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]