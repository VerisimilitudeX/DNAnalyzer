FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install Java 17 and Python
RUN apt-get update \
    && apt-get install -y openjdk-17-jdk python3 python3-pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="$JAVA_HOME/bin:$PATH"

WORKDIR /workspace
