#!/bin/bash
#
# scripts/deleteAllPosts.sh - delete ALL posts in WordPress, with arguments:
#   quote_wp_wordpress - cleaning on the actual version WordPress container
#   quote_wp_min       - cleaning on the minimal WordPress version container
#   w/o arguments      - cleaning on both containers
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress

# doing the installation either on 
if [ "$1" == "quote_wp_min" ]; then
  CONTAINER="quote_wp_min"
else
  CONTAINER="quote_wp_wordpress"
fi

echo "*** Delete all posts in ${CONTAINER}"
docker exec -it "${CONTAINER}" sh -c "wp post list --post_type='post' --format=ids --allow-root | xargs --no-run-if-empty -n 1 wp post delete --force --allow-root"

if [ "$#" -eq 0 ]; then
  # Um Rekursionen zu verstehen muss man zunächst Rekursionen verstehen.
  # Mira Mezini, https://www.zitat-service.de/de/quotations/1114
  $0 quote_wp_min
fi
