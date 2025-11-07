FROM node:22.16.0

ENV REACT_APP_API_URL="http://localhost:8080/api"


WORKDIR /app
ADD ./package*.json /app/
ADD ./yarn.lock /app/
RUN yarn install
ADD . /app/
RUN yarn run build

CMD ["yarn", "start"]