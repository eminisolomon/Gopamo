FROM node:alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --legacy-peer-deps

CMD ["node", "dist/main"]
