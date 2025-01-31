# ---------------------------------
# Stage 0: Build the Next.js app
# ---------------------------------
FROM 913524908137.dkr.ecr.us-east-1.amazonaws.com/base-images/node:18-alpine AS build

WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Build arg for your backend URL
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Next.js app for production
RUN npm run build

# ---------------------------------
# Stage 1: Run the app
# ---------------------------------
FROM 913524908137.dkr.ecr.us-east-1.amazonaws.com/base-images/node:18-alpine

WORKDIR /app

# Copy built app + node_modules from build stage
COPY --from=build /app ./

EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]
