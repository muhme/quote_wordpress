#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# test.sh - end-to-end test for WordPress plugin zitat_service

# you can hand-over arguments to npx playwright test e.g.
# host$ scripts/test.sh --project=chromium
docker exec -it quote_wp_playwright sh -c "npx playwright test $*"
