FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .
RUN yarn build

FROM node:14-stretch-slim
WORKDIR /app
COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

EXPOSE 4000
CMD yarn run start:prod