#!/bin/bash
#
# Copyright (c) 2023 Heiko Lübbe
# This software is licensed under the MIT License.
# For the full license text, see the LICENSE file in the project root or visit https://opensource.org/licenses/MIT
#
# install.sh - install WordPress and plugin zitat-service with WP-CLI

echo "*** installing WP-CLI"
docker exec -it quote_wp_wordpress sh -c \
  "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp && chmod 755 /usr/local/bin/wp"

echo "*** complete WordPress installation"
docker exec -it quote_wp_wordpress sh -c \
  "wp core install --allow-root --url=http://localhost:4080 --title='WordPress zitat-service plugin test' --admin_user=admin --admin_password=admin --admin_email=admin@admin.com"

echo "*** install additional languages"
docker exec -it quote_wp_wordpress sh -c "wp language core install de_DE --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install es_ES --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install ja --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install uk --allow-root"

echo "*** install plugin zitat-service"
docker cp src quote_wp_wordpress:/var/www/html/wp-content/plugins/zitat-service

echo "*** activate plugin zitat-service"
docker exec -it quote_wp_wordpress sh -c "wp plugin activate zitat-service --allow-root"

# simple running all WP-CLI commands as root (with the --allow-root) and chown user/group in the end
echo "*** recursivly chown to www-data"
docker exec -it quote_wp_wordpress sh -c "chown -R www-data:www-data /var/www/html"
