#!/bin/bash
#
# scripts/install.sh - Install WordPress and plugin random-quote-zitat-service with WP-CLI, with arguments:
#   quote_wp_wordpress - Doing installation on the actual version WordPress container
#   quote_wp_min - Doing installation on the minimal WordPress version container
#   w/o arguments - Doing the installation on both containers
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress

# The installation takes place either as quote_wp_min or quote_wp_wordpress
if [ "$1" == "quote_wp_min" ]; then
  URL="http://host.docker.internal:4084"
  CONTAINER="quote_wp_min"
else
  URL="http://host.docker.internal:4080"
  CONTAINER="quote_wp_wordpress"
fi

# Needed before using node_modules/wait-on/bin/wait-on
echo "*** npm install"
npm install

echo "*** Waiting for container ${CONTAINER}"
node_modules/wait-on/bin/wait-on -l -t "60s" "${URL}" 

echo "*** Installing WP-CLI"
docker exec -it "${CONTAINER}" sh -c \
  "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp && chmod 755 /usr/local/bin/wp"

echo "*** Complete WordPress installation"
# Using 127.0.0.1	as host.docker.internal to have access from host and from Playwright docker container too
docker exec -it "${CONTAINER}" sh -c \
  "wp core install --allow-root --url="${URL}" --title='Random Quote from Zitat-Service Plugin Test' --admin_user=admin --admin_password=admin --admin_email=admin@admin.com"

# Language English (United States) comes from installation
echo "*** Install additional languages"
docker exec -it "${CONTAINER}" sh -c "wp language core install de_DE --allow-root"
docker exec -it "${CONTAINER}" sh -c "wp language core install es_ES --allow-root"
docker exec -it "${CONTAINER}" sh -c "wp language core install ja --allow-root"
docker exec -it "${CONTAINER}" sh -c "wp language core install uk --allow-root"

echo "*** Create four additional admins with locales"
# This is a new installation, so new user IDs start with 2
docker exec -it "${CONTAINER}" sh -c \
 "wp user create admin_de admin_de@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 2 locale 'de_DE'                                              --allow-root && 
  wp user create admin_es admin_es@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 3 locale 'es_ES'                                              --allow-root && 
  wp user create admin_ja admin_ja@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 4 locale 'ja'                                                 --allow-root && 
  wp user create admin_uk admin_uk@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 5 locale 'uk'                                                 --allow-root" 

# Build the plugin block in creating the files in the 'build' folder
echo '*** sudo npm run build'
current_user=$(whoami)
build_dir_owner=$(ls -ld "build" | awk '{print $3}')
# Folder 'build' is owned by e.g. root on e.g. Ubuntu?
if [ "${current_user}" != "${build_dir_owner}" ] ; then
  echo "*** Actual user is \"${current_user}\" and directory \"build\" is owned by \"${build_dir_owner}\", please confirm sudo access"  
  sudo npm run build
else
  npm run build
fi

echo "*** Activate plugin 'Random Quote from Zitat-Service'"
docker exec -it "${CONTAINER}" sh -c "wp plugin activate random-quote-zitat-service --allow-root"

# Simple running all WP-CLI commands as root (with the --allow-root) and chown user/group in the end
echo "*** Recursivly chown to www-data"
docker exec -it "${CONTAINER}" sh -c "chown -R www-data:www-data /var/www/html 2>/dev/null"

# Started without arguments? then actual WordPress version is installed and we continue with minimal version 
if [ "$#" -eq 0 ]; then
  # To understand recursion, you first need to understand recursion.
  # Mira Mezini, https://www.zitat-service.de/de/quotations/1114
  $0 quote_wp_min
fi
