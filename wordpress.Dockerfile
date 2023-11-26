# wordpress.Dockerfile
# hlu, Nov 11th 2022 - Nov 23rd 2022

# use latest WordPress
FROM wordpress

# use MSMTP as sendmail compatible SMTP client and deliver emails to maildev:1025
RUN apt update -qq && apt upgrade -yqq  && apt install -y msmtp
RUN echo "host maildev\nport 1025" > /etc/msmtprc
RUN echo "sendmail_path = /usr/bin/msmtp -t --read-envelope-from" > /usr/local/etc/php/php.ini

# must-use plugin to set from-mail-address "webmaster@docker.local" to prevent not usable "wordpress@localhost"
RUN mkdir -p /var/www/html/wp-content/mu-plugins
COPY sets_mail_from.php /var/www/html/wp-content/mu-plugins/sets_mail_from.php 
