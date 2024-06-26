#!/bin/bash
#
# scripts/install.sh - install WordPress and plugin random-quote-zitat-service with WP-CLI, with arguments:
#   quote_wp_wordpress - doing installation on the actual version WordPress container
#   quote_wp_min - doing installation on the minimal WordPress version container
#   w/o arguments - doing the installation on both containers
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress

# doing the installation either on 
if [ "$1" == "quote_wp_min" ]; then
  URL="http://host.docker.internal:4084"
  CONTAINER="quote_wp_min"
else
  URL="http://host.docker.internal:4080"
  CONTAINER="quote_wp_wordpress"
fi

# needed before using node_modules/wait-on/bin/wait-on
echo "*** npm install"
npm install

echo "*** Waiting for container ${CONTAINER}"
node_modules/wait-on/bin/wait-on -l -t "60s" "${URL}" 

echo "*** Installing WP-CLI"
docker exec -it "${CONTAINER}" sh -c \
  "curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && mv wp-cli.phar /usr/local/bin/wp && chmod 755 /usr/local/bin/wp"

echo "*** Complete WordPress installation"
# using 127.0.0.1	as host.docker.internal to have access from host and from Playwright docker container too
docker exec -it "${CONTAINER}" sh -c \
  "wp core install --allow-root --url="${URL}" --title='Random Quote from Zitat-Service Plugin Test' --admin_user=admin --admin_password=admin --admin_email=admin@admin.com"

# language English (United States) comes from installation
echo "*** Install additional languages"
docker exec -it "${CONTAINER}" sh -c "wp language core install de_DE --allow-root"
docker exec -it "${CONTAINER}" sh -c "wp language core install es_ES --allow-root"
docker exec -it "${CONTAINER}" sh -c "wp language core install ja --allow-root"
docker exec -it "${CONTAINER}" sh -c "wp language core install uk --allow-root"

echo "*** Create four additional admins with locales"
# this is a new installation, so new user IDs start with 2
docker exec -it "${CONTAINER}" sh -c \
 "wp user create admin_de admin_de@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 2 locale 'de_DE'                                              --allow-root && 
  wp user create admin_es admin_es@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 3 locale 'es_ES'                                              --allow-root && 
  wp user create admin_ja admin_ja@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 4 locale 'ja'                                                 --allow-root && 
  wp user create admin_uk admin_uk@admin.com --role=administrator --user_pass=admin --allow-root &&
  wp user meta update 5 locale 'uk'                                                 --allow-root" 

# now already existing with volume mapping
# echo "*** install plugin 'Random Quote from Zitat-Service'"
# docker cp src "${CONTAINER}":/var/www/html/wp-content/plugins/random-quote-zitat-service

# build the plugin block in creating the files in the 'build' folder
# but folder 'build' is owned by www-data, on Ubuntu in WSL2 in Windows, therefore run as sudo
echo '*** sudo npm run build'
sudo npm run build

echo "*** Activate plugin 'Random Quote from Zitat-Service'"
docker exec -it "${CONTAINER}" sh -c "wp plugin activate random-quote-zitat-service --allow-root"

# simple running all WP-CLI commands as root (with the --allow-root) and chown user/group in the end
echo "*** Recursivly chown to www-data"
docker exec -it "${CONTAINER}" sh -c "chown -R www-data:www-data /var/www/html 2>/dev/null"

# started without arguments? then actual WordPress version is installed and we continue with minimal version 
if [ "$#" -eq 0 ]; then
  # Um Rekursionen zu verstehen muss man zunächst Rekursionen verstehen.
  # Mira Mezini, https://www.zitat-service.de/de/quotations/1114
  $0 quote_wp_min
fi
