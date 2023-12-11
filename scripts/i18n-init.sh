#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# i18n-init.sh - Create languages/zitat-service.pot (Portable Object Template) file
#
# needs gettext package installed as already in quote_wp_wordpress container
# needs WP-CLI installed in quote_wp_wordpress container as scripts/install.sh does

echo "*** Create .pot Portable Object Template (POT) file"
docker exec -it quote_wp_wordpress sh -c \
  "cd /var/www/html/wp-content/plugins/zitat-service && \
   wp i18n make-pot . --allow-root && \
   chown www-data:www-data languages/* && \
   pwd && \
   ls -l languages/*.pot"

echo "*** Create .po files"
docker exec -it quote_wp_wordpress sh -c \
  "cd /var/www/html/wp-content/plugins/zitat-service/languages && \
   msginit --no-translator -l de -o zitat-service-de.po -i zitat-service.pot && \
   msginit --no-translator -l es -o zitat-service-es.po -i zitat-service.pot && \
   msginit --no-translator -l ja -o zitat-service-ja.po -i zitat-service.pot && \
   msginit --no-translator -l uk -o zitat-service-uk.po -i zitat-service.pot && \
   chown www-data:www-data * && \
   pwd && \
   ls -l *.po"
