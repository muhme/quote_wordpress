#!/bin/bash
#
# scripts/clean.sh - delete all quote_wp_* docker containers
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress

echo '*** Removing all docker containers quote_wp_*'
docker ps -a --format '{{.Names}}' | grep '^quote_wp_' | xargs -r docker rm -f
