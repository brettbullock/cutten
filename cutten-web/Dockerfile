FROM node:10.16.0
WORKDIR /cutten-web
COPY ./package.json /cutten-web
COPY ./yarn.lock /cutten-web
COPY ./tsconfig.json /cutten-web
ENV NODE_ENV=development
RUN yarn install
COPY . /cutten-web
CMD ["yarn", "dev"]
EXPOSE 9000