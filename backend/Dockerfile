# Stage 0: Build the app
FROM openjdk:17-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the Gradle wrapper and build files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Download the dependencies and cache them
# ----------------------
# 1) Build stage
# ----------------------
FROM openjdk:17-jdk-slim AS build

# Set a working directory for Gradle
WORKDIR /app

# Copy Gradle wrapper and build scripts
COPY gradlew gradlew.bat /app/
COPY gradle/ gradle/
COPY build.gradle settings.gradle /app/

# Copy the backend source code
COPY src/ src/

# Make the Gradle wrapper executable (if needed)
RUN chmod +x gradlew

# (Optional) Verify dependencies
RUN ./gradlew dependencies --no-daemon

# Build the JAR
RUN ./gradlew bootJar --no-daemon

# ----------------------
# 2) Runtime stage
# ----------------------
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the JAR from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Add a basic health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
