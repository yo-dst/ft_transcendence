FROM node:19-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit dev

COPY ./build ./build

ENV PORT=5173
ENV HOST=0.0.0.0

CMD [ "node", "build" ]
