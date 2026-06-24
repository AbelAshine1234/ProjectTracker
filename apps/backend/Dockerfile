FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy source
COPY . .

EXPOSE 5000
ENV PORT=5000

# Run the development server with watch mode
CMD ["npm", "run", "dev"]
