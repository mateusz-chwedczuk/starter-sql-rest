FROM node:12.13-alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

# Copy app config files
COPY tsconfig.json tsconfig.build.json nest-cli.json ./

# Copy app sources
COPY src src/

RUN yarn build

EXPOSE 4000

CMD ["node", "dist/main"]
