#!/bin/bash
#
# scripts/i18n-init.sh - Create languages/random-quote-zitat-service.pot (Portable Object Template) file
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress
#
# needs gettext package installed as already in quote_wp_wordpress container
# needs WP-CLI installed in quote_wp_wordpress container as scripts/install.sh does

echo "*** Create .pot Portable Object Template (POT) file"
docker exec -it quote_wp_wordpress sh -c \
  "cd /var/www/html/wp-content/plugins/random-quote-zitat-service && \
   wp i18n make-pot . --allow-root && \
   chown www-data:www-data languages/* && \
   pwd && \
   ls -l languages/*.pot"

echo "*** Create .po files"
docker exec -it quote_wp_wordpress sh -c \
  "cd /var/www/html/wp-content/plugins/random-quote-zitat-service/languages && \
   msginit --no-translator -l de -o random-quote-zitat-service-de.po -i random-quote-zitat-service.pot && \
   msginit --no-translator -l es -o random-quote-zitat-service-es.po -i random-quote-zitat-service.pot && \
   msginit --no-translator -l ja -o random-quote-zitat-service-ja.po -i random-quote-zitat-service.pot && \
   msginit --no-translator -l uk -o random-quote-zitat-service-uk.po -i random-quote-zitat-service.pot && \
   chown www-data:www-data * && \
   pwd && \
   ls -l *.po"
