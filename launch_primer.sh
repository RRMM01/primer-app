#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/sibug/Math"
PORT=8000
BIND_ADDR="127.0.0.1"
LAN_MODE=0
OPEN_BROWSER=1
STOP_SERVER=0
TARGET_TAB=""
TARGET_EDGE=""
OPEN_INTRO=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --lan)
      LAN_MODE=1
      BIND_ADDR="0.0.0.0"
      shift
      ;;
    --port)
      PORT="${2:-8000}"
      shift 2
      ;;
    --tab)
      TARGET_TAB="${2:-}"
      shift 2
      ;;
    --edge)
      TARGET_EDGE="${2:-}"
      shift 2
      ;;
    --intro)
      OPEN_INTRO=1
      shift
      ;;
    --no-open)
      OPEN_BROWSER=0
      shift
      ;;
    --stop)
      STOP_SERVER=1
      shift
      ;;
    -h|--help)
      echo "Usage: ./launch_primer.sh [--lan] [--port 8000] [--tab TAB] [--edge MODE] [--no-open] [--stop]"
      echo "  default        Start local-only server on 127.0.0.1:8000 and open in browser"
      echo "  --tab TAB      Jump straight to a tab (exam, work, constellation, forge, myvault, tutor, gym)"
      echo "  --edge MODE    Launch Unfair Advantage action on open (interleave, illusions, feynman)"
      echo "  --lan          Bind 0.0.0.0 so your phone/tablet on the same Wi-Fi can open Primer Studio"
      echo "  --port N       Use custom port N"
      echo "  --no-open      Start server without calling xdg-open"
      echo "  --stop         Stop the background Primer Studio local server"
      exit 0
      ;;
    *)
      shift
      ;;
  esac
done

PID_FILE="/tmp/primer-studio-${PORT}.pid"

if [[ "${STOP_SERVER}" -eq 1 ]]; then
  STOPPED=0
  if [[ -f "${PID_FILE}" ]]; then
    PID="$(cat "${PID_FILE}" 2>/dev/null || true)"
    if [[ -n "${PID}" ]] && kill -0 "${PID}" 2>/dev/null; then
      kill "${PID}" 2>/dev/null || true
      STOPPED=1
    fi
    rm -f "${PID_FILE}"
  fi
  if pkill -f "http\.server ${PORT} .*${APP_DIR}" 2>/dev/null; then
    STOPPED=1
  fi
  if [[ "${STOPPED}" -eq 1 ]]; then
    echo "Stopped Primer Studio server on port ${PORT}."
  else
    echo "No Primer Studio server running on port ${PORT}."
  fi
  exit 0
fi

QUERY=""
if [[ -n "${TARGET_TAB}" ]]; then
  QUERY="tab=${TARGET_TAB}"
fi
if [[ -n "${TARGET_EDGE}" ]]; then
  if [[ -n "${QUERY}" ]]; then
    QUERY="${QUERY}&edge=${TARGET_EDGE}"
  else
    QUERY="edge=${TARGET_EDGE}"
  fi
fi
if [[ "${OPEN_INTRO}" -eq 1 ]]; then
  if [[ -n "${QUERY}" ]]; then
    QUERY="${QUERY}&intro=1"
  else
    QUERY="intro=1"
  fi
fi

LOCAL_URL="http://localhost:${PORT}/"
if [[ -n "${QUERY}" ]]; then
  LOCAL_URL="${LOCAL_URL}?${QUERY}"
fi

detect_lan_ip() {
  if command -v ip >/dev/null 2>&1; then
    ip route get 1.1.1.1 2>/dev/null | awk '{for(i=1;i<=NF;i++) if($i=="src") {print $(i+1); exit}}' || true
  elif command -v hostname >/dev/null 2>&1; then
    hostname -I 2>/dev/null | awk '{print $1}' || true
  fi
}

if [[ "${LAN_MODE}" -eq 1 ]]; then
  LAN_IP="$(detect_lan_ip)"
  echo "Starting Primer Studio in LAN mode on port ${PORT}..."
  echo "  This machine : ${LOCAL_URL}"
  if [[ -n "${LAN_IP}" ]]; then
    echo "  Phone/Tablet : http://${LAN_IP}:${PORT}/"
  fi
  echo "Press Ctrl+C to stop the LAN server."
  exec python3 -m http.server "${PORT}" --bind "${BIND_ADDR}" --directory "${APP_DIR}"
fi

# Start local server silently on PORT only if not already running
if ! (exec 3<>/dev/tcp/127.0.0.1/"${PORT}") 2>/dev/null; then
  nohup python3 -m http.server "${PORT}" --bind "${BIND_ADDR}" --directory "${APP_DIR}" >/dev/null 2>&1 &
  echo $! > "${PID_FILE}"
  for _ in $(seq 20); do
    if (exec 3<>/dev/tcp/127.0.0.1/"${PORT}") 2>/dev/null; then
      break
    fi
    sleep 0.1
  done
fi

if [[ "${OPEN_BROWSER}" -eq 1 ]] && command -v xdg-open >/dev/null 2>&1; then
  exec xdg-open "${LOCAL_URL}"
else
  echo "Primer Studio running at ${LOCAL_URL}"
fi
