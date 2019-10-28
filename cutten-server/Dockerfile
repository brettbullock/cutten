FROM node:10.16.0
WORKDIR /cutten-server
COPY ./package.json /cutten-server
COPY ./yarn.lock /cutten-server
ENV NODE_ENV=development
RUN yarn install
COPY . /cutten-server
CMD ["yarn", "start"]
EXPOSE 8000
