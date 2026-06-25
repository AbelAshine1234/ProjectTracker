FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY prisma/ ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 5000
ENV PORT=5000

CMD ["npm", "run", "docker:start"]
