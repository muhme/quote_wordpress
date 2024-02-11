#!/bin/bash
#
# scripts/i18n-init.sh - Create languages/zitat-service-random-quote.pot (Portable Object Template) file
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin Zitat-Service Random Quote, see https://github.com/muhme/quote_wordpress
#
# needs gettext package installed as already in quote_wp_wordpress container
# needs WP-CLI installed in quote_wp_wordpress container as scripts/install.sh does

echo "*** Create .pot Portable Object Template (POT) file"
docker exec -it quote_wp_wordpress sh -c \
  "cd /var/www/html/wp-content/plugins/zitat-service-random-quote && \
   wp i18n make-pot . --allow-root && \
   chown www-data:www-data languages/* && \
   pwd && \
   ls -l languages/*.pot"

echo "*** Create .po files"
docker exec -it quote_wp_wordpress sh -c \
  "cd /var/www/html/wp-content/plugins/zitat-service-random-quote/languages && \
   msginit --no-translator -l de -o zitat-service-random-quote-de.po -i zitat-service-random-quote.pot && \
   msginit --no-translator -l es -o zitat-service-random-quote-es.po -i zitat-service-random-quote.pot && \
   msginit --no-translator -l ja -o zitat-service-random-quote-ja.po -i zitat-service-random-quote.pot && \
   msginit --no-translator -l uk -o zitat-service-random-quote-uk.po -i zitat-service-random-quote.pot && \
   chown www-data:www-data * && \
   pwd && \
   ls -l *.po"
