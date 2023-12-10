#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# compose.sh - delete the five docker containers and build them new

NAME=quote_wp_
echo "Removing all docker containers ${NAME}*"
docker ps -a --format '{{.Names}}' | grep "^$NAME" | xargs docker rm -f

echo 'deleting folder wp'
rm -rf wp

echo 'Creating docker containers new'
docker compose up -d

# or doing with rebuild and w/o cache
# docker compose build --no-cache
# docker compose up -d
