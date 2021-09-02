FROM node:alpine

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json .
COPY yarn.lock .
RUN yarn install

# Copying source files
COPY . .

# Building app
RUN yarn build
# RUN yarn install pm2 -g

# Running the app
CMD ["yarn", "dev"]
# # CMD [ "pm2-runtime", "npm", "start" ]
