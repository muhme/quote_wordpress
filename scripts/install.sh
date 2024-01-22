#!/bin/bash
#
# scripts/install.sh - install WordPress and plugin zitat-service with WP-CLI
#
# MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress

echo "*** Waiting for container"
node_modules/wait-on/bin/wait-on -l -t "60s" "http://host.docker.internal:4080/" 

echo "*** Installing WP-CLI"
docker exec -it quote_wp_wordpress sh -c \
  "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp && chmod 755 /usr/local/bin/wp"

echo "*** Complete WordPress installation"
# using 127.0.0.1	as host.docker.internal to have access from host and from Playwright docker container too
docker exec -it quote_wp_wordpress sh -c \
  "wp core install --allow-root --url=http://host.docker.internal:4080 --title='WordPress zitat-service plugin test' --admin_user=admin --admin_password=admin --admin_email=admin@admin.com"

# language English (United States) comes from installation
echo "*** Install additional languages"
docker exec -it quote_wp_wordpress sh -c "wp language core install de_DE --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install es_ES --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install ja --allow-root"
docker exec -it quote_wp_wordpress sh -c "wp language core install uk --allow-root"

echo "*** Create four additional admins with locales"
# this is a new installation, so new user IDs start with 2
docker exec -it quote_wp_wordpress sh -c \
 "wp user create admin_de admin_de@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 2 locale 'de_DE'                                              --allow-root && 
  wp user create admin_es admin_es@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 3 locale 'es_ES'                                              --allow-root && 
  wp user create admin_ja admin_ja@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 4 locale 'ja'                                                 --allow-root && 
  wp user create admin_uk admin_uk@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 5 locale 'uk'                                                 --allow-root" 

# now already existing with volume mapping
# echo "*** install plugin zitat-service"
# docker cp src quote_wp_wordpress:/var/www/html/wp-content/plugins/zitat-service

echo "*** Activate plugin zitat-service"
docker exec -it quote_wp_wordpress sh -c "wp plugin activate zitat-service --allow-root"

# simple running all WP-CLI commands as root (with the --allow-root) and chown user/group in the end
echo "*** Recursivly chown to www-data"
docker exec -it quote_wp_wordpress sh -c "chown -R www-data:www-data /var/www/html 2>/dev/null"
