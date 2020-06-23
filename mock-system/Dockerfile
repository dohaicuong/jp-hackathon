FROM node:14.4.0-alpine3.12

COPY ./package.json .
RUN yarn

COPY . .

ENTRYPOINT yarn start