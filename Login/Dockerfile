# FROM node:21

# WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 3009

# CMD ["node", "app.js"]
# Use the official Node.js image from the Docker Hub
FROM node:21 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Rebuild native modules to ensure compatibility
RUN npm rebuild bcrypt

# Copy the rest of the application code
COPY . .

# Optional: If you are using TypeScript, build the application
# RUN npm run build

# Use a smaller, production-ready Node.js image
FROM node:21-slim

# Set the working directory
WORKDIR /app

# Copy the node_modules and built application code from the build stage
COPY --from=build /app /app

# Expose the port the app runs on
EXPOSE 3009

# Command to run the application
CMD ["node", "app.js"]
