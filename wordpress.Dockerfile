#
# wordpress.Dockerfile - create docker container quote_wp_wordpress
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service, see https://github.com/muhme/quote_wordpress
# 

# use latest WordPress - actual 6.4.2, Apr-13-2024: you have to manual update to 6.5.2 and run the tests again
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
