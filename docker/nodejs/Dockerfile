FROM node:14-alpine

WORKDIR /app

COPY ./app/package.json ./app

RUN npm install

COPY ./app /app
