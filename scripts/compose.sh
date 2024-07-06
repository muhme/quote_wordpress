#!/bin/bash
#
# scripts/compose.sh - Delete the five docker containers and build them new
# samples:
#   scripts/compose.sh
#   scripts/compose.sh build – Run compose build --no-cache first
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress

# Clean up first, just in case
scripts/clean.sh

if [ $# -eq 1 ] && [ "$1" = "build" ] ; then
  echo '*** Docker compose build --no-cache'
  docker compose build --no-cache
fi

echo '*** Docker compose up'
docker compose up -d
