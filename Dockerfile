FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG DATABASE_URL=postgresql://postgres:postgres@db:5432/library_db?schema=public
ENV DATABASE_URL=${DATABASE_URL}

RUN npm run build

EXPOSE 3000

CMD [ "sh", "-c", "npx prisma migrate deploy && npm start" ]