FROM node:lts-alpine

WORKDIR /home/node/bot

COPY package.json /home/node/bot

RUN npm install --quiet

CMD ["npm", "start"]

