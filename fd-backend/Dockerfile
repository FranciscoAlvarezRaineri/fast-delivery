# Node.js base image
FROM node:18-alpine

# Establish working directory
WORKDIR /app

# Copy necessary files
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Build
RUN npm run build

# Exposing the port
EXPOSE 8080

# Define environment variable for port
ENV PORT=8080

# Running the application
CMD ["npm", "run", "start:prod"]