#!/bin/bash
#
# scripts/test.sh - running end-to-end tests
#
# GPLv3 License, Copyright (c) 2023 - 2026 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress

WP_BASE_URL="http://host.docker.internal:4080"; # quote_wp_wordpress
SECOND_RUN=""
# first argument is container name?
if [ "$1" = "quote_wp_min" ] || [ "$1" = "quote_wp_wordpress" ]; then
    if [ "$1" = "quote_wp_min" ]; then
        WP_BASE_URL="http://host.docker.internal:4084";
    fi
    # eat container name
    shift
else
    SECOND_RUN="quote_wp_min"
fi

echo "*** Testing: WP_BASE_URL=${WP_BASE_URL} npx playwright test $*"

# Already using --last-failed?
LAST_FAILED_MODE=""
for arg in "$@"; do
  if [ "$arg" = "--last-failed" ]; then
    LAST_FAILED_MODE="1"
    break
  fi
done

# you can hand-over arguments to npx playwright test e.g.
# host$ scripts/test.sh quote_wp_wordpress --project=chromium-logged-in -g \'Language not set\'
docker exec -it quote_wp_playwright sh -c "WP_BASE_URL=${WP_BASE_URL} npx playwright test $*"
exit_status=$?
if [ ${exit_status} -ne 0 ] && [ "${LAST_FAILED_MODE}" != "1" ]; then
  echo "*** Exit status ${exit_status} - it looks like tests failed, try the failed tests only"
  docker exec -it quote_wp_playwright sh -c "WP_BASE_URL=${WP_BASE_URL} npx playwright test $* --last-failed"
fi

if [ "${SECOND_RUN}" != "" ]; then
  # Um Rekursionen zu verstehen muss man zunächst Rekursionen verstehen.
  # Mira Mezini, https://www.zitat-service.de/de/quotations/1114
  $0 "${SECOND_RUN}" "$*"
fi
