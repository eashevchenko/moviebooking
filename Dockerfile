FROM node:9.4.0

ENV APP_HOME /usr/src/app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD package.json $APP_HOME

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python

RUN npm install -g pm2 node-gyp
RUN npm install

#ADD . $APP_HOME
COPY . $APP_HOME/

EXPOSE 3000
EXPOSE 12345