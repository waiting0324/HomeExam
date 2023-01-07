FROM node:14.14.0-alpine3.12

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 8080

# 設置時區
RUN ln -sf /usr/share/zoneinfo/Asia/Taipei /etc/localtime

CMD ["npm", "run", "start"]