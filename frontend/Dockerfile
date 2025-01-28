# Stage 0: Build the app
FROM 913524908137.dkr.ecr.us-east-1.amazonaws.com/base-images/node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for better caching
COPY package*.json ./

# Build argument and environment variable for backend URL
ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Stage 1: Run the app
FROM 913524908137.dkr.ecr.us-east-1.amazonaws.com/base-images/node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the built app and dependencies
COPY --from=build /app ./

# Expose port 3000 (Next.js default port)
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "start"]

