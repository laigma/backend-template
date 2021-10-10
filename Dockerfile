# build stage
FROM node:11.6.0

WORKDIR /src

COPY . ${WORKDIR}

RUN npm install

EXPOSE 8102

CMD [ "npm", "run", "start" ]
