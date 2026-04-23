# Stage 1: build
FROM eclipse-temurin:25-jdk-jammy AS builder

WORKDIR /app

# Copy Gradle wrapper and dependency declarations first for layer caching
COPY gradlew gradlew.bat settings.gradle.kts build.gradle ./
COPY gradle ./gradle

RUN chmod +x gradlew && ./gradlew dependencies --no-daemon -q 2>/dev/null || true

# Copy source and build the fat JAR
COPY src ./src

RUN ./gradlew bootJar --no-daemon -x test

# Stage 2: runtime
FROM eclipse-temurin:25-jre-jammy

WORKDIR /app

COPY --from=builder /app/build/libs/DNAnalyzer-*-boot.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
