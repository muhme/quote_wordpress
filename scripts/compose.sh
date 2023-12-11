#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# compose.sh - delete the five docker containers and build them new

NAME=quote_wp_
echo "*** Removing all docker containers ${NAME}*"
docker ps -a --format '{{.Names}}' | grep "^$NAME" | xargs docker rm -f

if [ $# -eq 1 ] && [ "$1" = "build" ] ; then
  echo '*** Docker compose build --no-cache'
  docker compose build --no-cache
fi

echo '*** Docker compose up'
docker compose up -d
