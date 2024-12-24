FROM node:18-buster

RUN apt-get update && apt-get install -y \
  ffmpeg \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g typescript ts-node nodemon

COPY . .

EXPOSE 3000
