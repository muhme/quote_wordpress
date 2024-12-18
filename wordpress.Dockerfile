#
# wordpress.Dockerfile - Create docker container quote_wp_wordpress
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress
# 

# Use the latest default WordPress Docker image
# FROM wordpress
# 18 December 2024: Default Docker image version is still 6.5.4, explicit set 6.7.1
FROM wordpress:6.7.1-php8.3-apache

# Use MSMTP as sendmail compatible SMTP client and deliver emails to maildev:1025
RUN apt-get update -qq && apt-get upgrade -yqq  && apt-get install -y msmtp
RUN echo "host maildev\nport 1025" > /etc/msmtprc
RUN echo "sendmail_path = /usr/bin/msmtp -t --read-envelope-from" > /usr/local/etc/php/php.ini

# Plugin as 'must-use' to set from-mail-address "webmaster@docker.local" to prevent not usable "wordpress@localhost"
RUN mkdir -p /var/www/html/wp-content/mu-plugins
COPY misc/sets_mail_from.php /var/www/html/wp-content/mu-plugins/sets_mail_from.php 

# Install gettext for I18N, vim and ping for comfort
RUN apt-get install -y gettext iputils-ping vim
