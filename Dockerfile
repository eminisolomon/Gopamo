FROM node:alpine

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["node", "dist/main"]
