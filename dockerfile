FROM node:lts-buster-slim

RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./
RUN npm install

CMD [ -d "node_modules" ] && "npm i && npm run dev"