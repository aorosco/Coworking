# Dockerfile para frontend (React)
FROM node:18-slim

# Install wget and other dependencies
RUN apt-get update && apt-get install -y wget python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Add permissions for node user
RUN chown -R node:node /app

# Switch to node user
USER node

# Copy package files
COPY --chown=node:node package*.json ./

# Install dependencies with specific platform
RUN npm install --platform=linux --arch=x64

# Copy source files
COPY --chown=node:node . .

EXPOSE 3000

ENV VITE_API_URL=http://localhost:5000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 