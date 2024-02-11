#
# mariadb.Dockerfile - create docker container quote_wp_mariadb with databases `wordpress` and `wp_min`
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin Zitat-Service Random Quote, see https://github.com/muhme/quote_wordpress
# 
FROM mariadb
RUN mkdir -p /docker-entrypoint-initdb.d && echo "CREATE DATABASE wp_min; grant all on wp_min.* to 'wordpress'@'%' identified by 'wordpress';" > /docker-entrypoint-initdb.d/wp_min.sql
CMD ["mariadbd"]
