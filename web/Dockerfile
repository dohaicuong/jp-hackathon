FROM node:14.4.0-alpine3.12

RUN yarn -v

RUN yarn global add serve

COPY ./package.json .
RUN yarn

COPY . .
RUN yarn build

ENTRYPOINT serve -p 3000 build