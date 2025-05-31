# Dockerfile para backend (Node.js + Express)
FROM node:18-alpine

# Instalar netcat para el script de espera
RUN apk add --no-cache netcat-openbsd

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN chmod +x init-db.sh

EXPOSE 5000

CMD ["./init-db.sh"] 