FROM node:17-alpine as build-stage
RUN npm instal -g http-server
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

ENV NODE_ENV production
CMD ["http-server", "build", "-p", "3000"]