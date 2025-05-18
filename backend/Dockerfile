# Use an official Node.js runtime as a parent image
FROM node:current-slim

# Install OpenSSL (if needed)
RUN apt-get update -y && apt-get install -y openssl

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the prisma folder (including schema.prisma) into the container
COPY prisma ./prisma

# Copy the rest of the project files into the container
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the app's port
EXPOSE 3000

# Command to start the app
CMD ["npm", "run", "dev"]
