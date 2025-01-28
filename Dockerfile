# Use the official OpenJDK image from Docker Hub as the base image
FROM openjdk:17-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper and build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Download the dependencies and cache them
RUN ./gradlew dependencies --no-daemon

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

# Add a health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s CMD curl -f http://localhost:8080/actuator/health || exit 1

# Command to run the Spring Boot app
ENTRYPOINT ["java", "-jar", "app.jar"]
