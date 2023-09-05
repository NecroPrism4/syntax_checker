FROM node:lts-buster-slim

RUN mkdir /app
WORKDIR /app

COPY ./package*.json ./
RUN npm install

CMD [ -d "node_modules" ] && /bin/bash -c "npm install && npm run dev"