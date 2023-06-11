FROM node:lts-alpine

ENV HOST 0.0.0.0
EXPOSE 3000

RUN mkdir -p /usr/src/nuxt-webserver
WORKDIR /usr/src/nuxt-webserver

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "/usr/src/nuxt-webserver/.output/server/index.mjs" ]

