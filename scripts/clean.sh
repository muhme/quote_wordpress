#!/bin/bash
#
# scripts/clean.sh - delete all Docker containers and the network
#                    or use 'docker compose down'
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress

PREFIX="quote_wp_"
NETWORK_NAME="quote_wordpress_default"

echo '*** Remove following Docker containers'
docker ps -a --format '{{.Names}}' | grep "^${PREFIX}" | xargs -r docker rm -f

echo '*** Remove following Docker network'
if docker network inspect "$NETWORK_NAME" >/dev/null 2>&1; then
  docker network rm "$NETWORK_NAME"
fi
