#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/sibug/Math"
PORT=8000
URL="http://localhost:${PORT}/"

# Start local server silently on port 8000 only if not already running
if ! (exec 3<>/dev/tcp/127.0.0.1/"${PORT}") 2>/dev/null; then
  nohup python3 -m http.server "${PORT}" --bind 127.0.0.1 --directory "${APP_DIR}" >/dev/null 2>&1 &
  for _ in $(seq 1 20); do
    if (exec 3<>/dev/tcp/127.0.0.1/"${PORT}") 2>/dev/null; then
      break
    fi
    sleep 0.1
  done
fi

exec xdg-open "${URL}"
