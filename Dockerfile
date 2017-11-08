FROM daocloud.io/node:8.4.0

RUN mkdir /app
ADD ./ /app
WORKDIR /app
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org \
	&& cnpm install \
	&& npm run build

EXPOSE 3001

CMD npm run start
