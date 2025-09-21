#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GRADLE_WRAPPER="$SCRIPT_DIR/gradlew"
SERVER_PORT="${DNANALYZER_SERVER_PORT:-8080}"
UI_FILE="$SCRIPT_DIR/web/dashboard/dashboard.html"
BACKEND_LOG_DIR="$SCRIPT_DIR/build"
BACKEND_LOG_FILE="$BACKEND_LOG_DIR/web-ui-backend.log"

if [[ ! -x "$GRADLE_WRAPPER" ]]; then
  echo "Gradle wrapper not found at $GRADLE_WRAPPER" >&2
  exit 1
fi

mkdir -p "$BACKEND_LOG_DIR"

BACKEND_PID=""

cleanup() {
  if [[ -n "$BACKEND_PID" ]] && kill -0 "$BACKEND_PID" >/dev/null 2>&1; then
    echo "\nStopping DNAnalyzer backend (PID $BACKEND_PID)..."
    kill "$BACKEND_PID" >/dev/null 2>&1 || true
    wait "$BACKEND_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT

echo "Starting DNAnalyzer backend on port $SERVER_PORT..."
"$GRADLE_WRAPPER" -Dspring-boot.run.main-class=DNAnalyzer.api.ApiApplication \
  bootRun --args="--server.port=$SERVER_PORT" \
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

if [[ ! -f "$UI_FILE" ]]; then
  echo "UI file not found at $UI_FILE" >&2
  exit 1
fi

UI_URL="file://$UI_FILE"
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
