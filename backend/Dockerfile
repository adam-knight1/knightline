# ----------------------
# 1) Build stage
# ----------------------
FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Copy Gradle wrapper and build scripts
COPY gradlew gradlew.bat /app/
COPY gradle/ gradle/
COPY build.gradle settings.gradle /app/

# Copy source code
COPY src/ src/

RUN chmod +x gradlew
RUN ./gradlew dependencies --no-daemon  # (Optional) Caches dependencies
RUN ./gradlew bootJar --no-daemon

# ----------------------
# 2) Runtime stage
# ----------------------
FROM openjdk:17-jdk-slim

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
