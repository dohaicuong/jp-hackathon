FROM node:14.4.0

RUN yarn global add serve

COPY ./build .

ENTRYPOINT serve -p 3000 build