FROM mhart/alpine-node:14.17.3
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
