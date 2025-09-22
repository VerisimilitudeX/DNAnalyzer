#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRADLE_WRAPPER="$SCRIPT_DIR/gradlew"
SERVER_PORT="${DNANALYZER_SERVER_PORT:-8080}"
UI_PORT="${DNANALYZER_UI_PORT:-8088}"
UI_FILE="$SCRIPT_DIR/web/dashboard/dashboard.html"
BACKEND_LOG_DIR="$SCRIPT_DIR/build"
BACKEND_LOG_FILE="$BACKEND_LOG_DIR/web-ui-backend.log"
BOOT_JAR="$SCRIPT_DIR/build/libs/DNAnalyzer-1.2.1.jar"
UI_LOG_FILE="$BACKEND_LOG_DIR/web-ui-static.log"
PYTHON_BIN="${DNANALYZER_PYTHON_BIN:-python3}"

mkdir -p "$BACKEND_LOG_DIR"

BACKEND_PID=""
UI_PID=""

cleanup() {
  if [[ -n "$BACKEND_PID" ]] && kill -0 "$BACKEND_PID" >/dev/null 2>&1; then
    echo "\nStopping DNAnalyzer backend (PID $BACKEND_PID)..."
    kill "$BACKEND_PID" >/dev/null 2>&1 || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
  if [[ -n "$UI_PID" ]] && kill -0 "$UI_PID" >/dev/null 2>&1; then
    echo "Stopping static UI server (PID $UI_PID)..."
    kill "$UI_PID" >/dev/null 2>&1 || true
    wait "$UI_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT

if [[ ! -f "$BOOT_JAR" ]]; then
  if [[ -x "$GRADLE_WRAPPER" ]]; then
    echo "Boot jar not found. Building with Gradle (this may take a moment)..."
    if ! "$GRADLE_WRAPPER" bootJar -x test >/dev/null 2>&1; then
      echo "Gradle build failed. Check the output above and ensure dependencies are available." >&2
      exit 1
    fi
  else
    echo "Boot jar not found at $BOOT_JAR and Gradle wrapper missing." >&2
    exit 1
  fi
fi

if [[ ! -f "$BOOT_JAR" ]]; then
  echo "Unable to locate boot jar at $BOOT_JAR even after attempting a build." >&2
  exit 1
fi

echo "Starting DNAnalyzer backend on port $SERVER_PORT..."
SPRING_EXCLUDES="org.springdoc.core.configuration.SpringDocConfiguration,org.springdoc.webmvc.ui.SwaggerConfig"
java -Dloader.main=DNAnalyzer.api.ApiApplication \
  -cp "$BOOT_JAR" org.springframework.boot.loader.PropertiesLauncher \
  --server.port="$SERVER_PORT" \
  --spring.autoconfigure.exclude="$SPRING_EXCLUDES" \
  >"$BACKEND_LOG_FILE" 2>&1 &
BACKEND_PID=$!

echo "Backend logs: $BACKEND_LOG_FILE"

wait_for_port() {
  local port="$1"
  local retries=60
  for ((i=0; i<retries; i++)); do
    if lsof -Pi ":$port" -sTCP:LISTEN >/dev/null 2>&1; then
      return 0
    fi
    sleep 1
  done
  return 1
}

if wait_for_port "$SERVER_PORT"; then
  echo "Backend is ready on http://localhost:$SERVER_PORT"
else
  echo "Backend did not become ready in time. Check $BACKEND_LOG_FILE for details." >&2
  exit 1
fi

if ! command -v "$PYTHON_BIN" >/dev/null 2>&1; then
  echo "Python interpreter '$PYTHON_BIN' not found. Install Python 3 or set DNANALYZER_PYTHON_BIN." >&2
  exit 1
fi

echo "Starting static UI server on http://localhost:$UI_PORT ..."
"$PYTHON_BIN" -m http.server "$UI_PORT" --directory "$SCRIPT_DIR/web" \
  >"$UI_LOG_FILE" 2>&1 &
UI_PID=$!

if wait_for_port "$UI_PORT"; then
  echo "Static files available at http://localhost:$UI_PORT"
else
  echo "Static server failed to start. Check $UI_LOG_FILE for details." >&2
  exit 1
fi

UI_URL="http://localhost:$UI_PORT/dashboard/dashboard.html"
echo "Opening dashboard at $UI_URL"

if command -v open >/dev/null 2>&1; then
  open "$UI_URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$UI_URL"
else
  echo "Please open the dashboard manually in your browser:" >&2
  echo "  $UI_URL" >&2
fi

echo "Press Ctrl+C to stop the backend when you're done."

wait "$BACKEND_PID"
