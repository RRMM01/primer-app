#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/home/sibug/Math"
PORT=8000
BIND_ADDR="127.0.0.1"
LAN_MODE=0
OPEN_BROWSER=1

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
    --no-open)
      OPEN_BROWSER=0
      shift
      ;;
    -h|--help)
      echo "Usage: ./launch_primer.sh [--lan] [--port 8000] [--no-open]"
      echo "  default   Start local-only server on 127.0.0.1:8000 and open in browser"
      echo "  --lan     Bind 0.0.0.0 so your phone/tablet on the same Wi-Fi can open Primer Studio"
      echo "  --port N  Use custom port N"
      echo "  --no-open Start server without calling xdg-open"
      exit 0
      ;;
    *)
      shift
      ;;
  esac
done

LOCAL_URL="http://localhost:${PORT}/"

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
