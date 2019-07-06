FROM node:10.16.0
WORKDIR /cutten-server
COPY ./package.json /cutten-server
COPY ./yarn.lock /cutten-server
RUN yarn install
COPY . /cutten-server
CMD ["yarn", "dev"]
EXPOSE 8000
