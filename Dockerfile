FROM node:14-alpine3.11

RUN apk update && apk add bash

WORKDIR /usr/app

ENV ENVIRONMENT=local

COPY package.json ./
COPY . .

EXPOSE 3003

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]


