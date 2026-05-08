# Use the official lightweight Node.js image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install production dependencies
RUN npm install --only=production

# Copy local code
COPY . .

# Expose port
EXPOSE 8080

# Start the application
CMD ["node", "index.js"]
