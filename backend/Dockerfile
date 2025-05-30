# Dockerfile para backend (Node.js + Express)
FROM node:18-alpine

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app

# Add permissions for node user
RUN chown -R node:node /app

# Switch to node user
USER node

# Copy package files
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY --chown=node:node . .

EXPOSE 3001

CMD ["npm", "run", "dev"] 