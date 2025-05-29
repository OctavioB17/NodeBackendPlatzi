# Construct
FROM node:20-alpine AS builder

WORKDIR /app

# Copy files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY src/ ./src/

# Compile TypeScript
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy necessary files from the build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# Expose port
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/index.js"]
