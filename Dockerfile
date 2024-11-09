FROM node:lts-alpine AS build
USER node

RUN mkdir -p /home/node
WORKDIR /home/node

COPY --chown=node:node package*.json ./
RUN npm i --force
RUN npm cache clean --force
RUN rm -rf /tmp/*

COPY --chown=node:node . .

FROM node:lts-alpine
COPY --from=build /home/node/node_modules ./node_modules
COPY --from=build /home/node/tsconfig*.json ./
COPY --from=build /home/node/package*.json ./
COPY --from=build /home/node/src ./src
COPY --from=build /home/node/test ./test/
COPY --from=build /home/node/doc ./dist/doc/

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]