FROM node:10.16.0
WORKDIR /src
COPY package.json /src
COPY yarn.lock /src
RUN yarn install
COPY . /src
CMD ["yarn", "dev"]
EXPOSE 8000
