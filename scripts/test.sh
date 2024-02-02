#!/bin/bash
#
# scripts/test.sh - running end-to-end tests
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress plugin zitat-service-random-quote, see https://github.com/muhme/quote_wordpress

CONTAINER="quote_wp_wordpress"
WP_BASE_URL="http://host.docker.internal:4080";
SECOND_RUN=""
# first argument is container name?
if [ "$1" = "quote_wp_min" ] || [ "$1" = "quote_wp_wordpress" ]; then
    if [ "$1" = "quote_wp_min" ]; then
        CONTAINER="${1}"
        WP_BASE_URL="http://host.docker.internal:4084";
    fi
    # eaten
    shift
else
    SECOND_RUN="quote_wp_min"
fi

echo "*** Testing: WP_BASE_URL=${WP_BASE_URL} npx playwright test $*"

# you can hand-over arguments to npx playwright test e.g.
# host$ scripts/test.sh quote_wp_wordpress --project=chromium-logged-in -g \'Language not set\' 
docker exec -it quote_wp_playwright sh -c "WP_BASE_URL=${WP_BASE_URL} npx playwright test $*"

if [ "${SECOND_RUN}" != "" ]; then
  # Um Rekursionen zu verstehen muss man zunächst Rekursionen verstehen.
  # Mira Mezini, https://www.zitat-service.de/de/quotations/1114
  $0 "${SECOND_RUN}" $*
fi
