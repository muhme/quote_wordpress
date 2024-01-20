#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# clean.sh - delete all quote_wp_* docker containers

echo '*** Removing all docker containers quote_wp_*'
docker ps -a --format '{{.Names}}' | grep '^quote_wp_' | xargs docker rm -f
