FROM daocloud.io/node:8.4.0-onbuild

RUN mkdir /app
ADD ./ /app
WORKDIR /app
RUN npm install yarn -g
RUN yarn install
RUN npm run build

EXPOSE 3001

CMD npm run start
