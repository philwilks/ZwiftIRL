FROM node:16.5-alpine3.13
LABEL maintainer="Remon Lam <remon@containerstack.io>"

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY . ./

RUN npm install --silent && \
    npm install react-scripts@3.4.1 -g --silent

CMD ["npm", "start"]
