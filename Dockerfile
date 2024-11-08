# Build
FROM node:lts-alpine AS build

USER node
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json ./
RUN npm install --force && npm cache clean --force

COPY --chown=node:node . .
RUN npm run build

# Runtime
FROM node:lts-alpine AS runtime

USER node
WORKDIR /home/node/app

COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/package*.json ./

CMD ["npm", "run", "start:dev"]
