FROM node:alpine AS development

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -g

COPY . .

RUN npm run build

# Production Stage
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --production

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
