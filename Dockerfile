FROM node:lts-alpine AS build
USER node

RUN mkdir -p /home/node
WORKDIR /home/node

COPY --chown=node:node package*.json ./
RUN npm i --force
RUN npm cache clean --force
RUN rm -rf /tmp/*

COPY --chown=node:node . .

CMD [ "npm", "run", "start:dev" ]