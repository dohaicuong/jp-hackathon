FROM node:14.4.0-alpine3.12

WORKDIR /app

RUN yarn global add serve

COPY ./build .

ENTRYPOINT serve -p 3000 build