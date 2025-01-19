# Use the official OpenJDK image from Docker Hub as the base image
FROM openjdk:17-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper and build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Download the dependencies (use gradle to cache dependencies)
RUN ./gradlew build --no-daemon

# Copy the application source code
COPY src src

# Build the project (this will create the JAR file)
RUN ./gradlew bootJar --no-daemon

# Use a smaller image to run the JAR file
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the built JAR file from the previous image
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the application port (change if needed)
EXPOSE 8080

# Command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
