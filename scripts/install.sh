#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# install.sh - install WordPress and plugin zitat-service with WP-CLI

echo "*** installing WP-CLI"
docker exec -it quote_wp_wordpress sh -c \
  "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp && chmod 755 /usr/local/bin/wp"

echo "*** complete WordPress installation"
# using 127.0.0.1	as host.docker.internal to have access from host and from Playwright docker container too
docker exec -it quote_wp_wordpress sh -c \
  "wp core install --allow-root --url=http://host.docker.internal:4080 --title='WordPress zitat-service plugin test' --admin_user=admin --admin_password=admin --admin_email=admin@admin.com"

# language English (United States) comes from installation
echo "*** install additional languages"
docker exec -it quote_wp_wordpress sh -c "wp language core install de_DE --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install es_ES --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install ja --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install uk --allow-root"

# now already existing with volume mapping
# echo "*** install plugin zitat-service"
# docker cp src quote_wp_wordpress:/var/www/html/wp-content/plugins/zitat-service

echo "*** activate plugin zitat-service"
docker exec -it quote_wp_wordpress sh -c "wp plugin activate zitat-service --allow-root"

# simple running all WP-CLI commands as root (with the --allow-root) and chown user/group in the end
echo "*** recursivly chown to www-data"
docker exec -it quote_wp_wordpress sh -c "chown -R www-data:www-data /var/www/html"
