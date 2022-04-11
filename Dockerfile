FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn

RUN yarn build

