#
# wordpress.Dockerfile - create docker container quote_wp_wordpress
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# https://github.com/muhme/quote_wordpress
# 

# use latest WordPress - actual 6.4.2
FROM wordpress

# use MSMTP as sendmail compatible SMTP client and deliver emails to maildev:1025
RUN apt-get update -qq && apt-get upgrade -yqq  && apt-get install -y msmtp
RUN echo "host maildev\nport 1025" > /etc/msmtprc
RUN echo "sendmail_path = /usr/bin/msmtp -t --read-envelope-from" > /usr/local/etc/php/php.ini

# must-use plugin to set from-mail-address "webmaster@docker.local" to prevent not usable "wordpress@localhost"
RUN mkdir -p /var/www/html/wp-content/mu-plugins
COPY misc/sets_mail_from.php /var/www/html/wp-content/mu-plugins/sets_mail_from.php 

# install gettext for I18N, vim and ping for comfort
RUN apt-get install -y gettext iputils-ping vim
