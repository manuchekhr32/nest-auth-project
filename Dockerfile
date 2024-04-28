FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY entrypoint.sh ./
COPY .env ./

RUN npm install

COPY . .

RUN npm run build

RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "dist/main.js"]
