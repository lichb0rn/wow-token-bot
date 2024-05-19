FROM node:lts-alpine

RUN mkdir -p /home/node/bot
WORKDIR /home/node/bot

COPY package.json /home/node/bot

RUN npm install

CMD ["npm", "start"]

