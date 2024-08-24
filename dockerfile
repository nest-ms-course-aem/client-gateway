FROM node:21-alpine3.19

WORKDIR /usr/src/app

# this * includes the lock
COPY package*.json ./ 

RUN yarn install

COPY . .

EXPOSE 3000

