FROM node:alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production --immutable --inline-builds

COPY . .

RUN yarn run build

CMD ["yarn", "run", "start:prod"]
