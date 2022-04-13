FROM mhart/alpine-node:14.17.3
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN apk add --no-cache --virtual .gyp \
    python \
    make \
    g++ \
    && npm install \
    && apk del .gyp

COPY . .

CMD ["npm", "run", "start:watch"]
