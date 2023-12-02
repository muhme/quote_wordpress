#!/bin/bash
#
# Copyright (c) 2023 Heiko Lübbe
# This software is licensed under the MIT License.
# For the full license text, see the LICENSE file in the project root or visit https://opensource.org/licenses/MIT
#
# compose.sh - delete the four docker containers and build them new

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
