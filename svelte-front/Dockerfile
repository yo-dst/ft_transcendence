FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY svelte.config.js ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]
