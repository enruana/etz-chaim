#!/bin/bash
# Vigila el último despliegue de Railway: consulta cada 20 s, hasta 12 min, y termina al llegar a un estado final.
# Uso: scripts/watch_deploy.sh   (tras `railway up --detach`; conviene lanzarlo en segundo plano)
cd "$(dirname "$0")/.." || exit 1
for i in $(seq 1 36); do
  linea=$(timeout 40 railway deployment list --json 2>/dev/null | python3 -I -c 'import json,sys; d=json.load(sys.stdin); x=d[0]; print(x.get("status"), x.get("id","")[:8], x.get("createdAt",""))' 2>/dev/null)
  echo "[$i] $linea"
  case "$linea" in SUCCESS*|FAILED*|CRASHED*|REMOVED*) echo "FIN: $linea"; exit 0;; esac
  sleep 20
done
echo "FIN: tiempo agotado"
