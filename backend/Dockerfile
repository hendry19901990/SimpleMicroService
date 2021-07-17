FROM node:12.14.1-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN apk update && apk add bash

EXPOSE 8080
EXPOSE 4444
EXPOSE 5672

#CMD [ "node", "server.js" ]
