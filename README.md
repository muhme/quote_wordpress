# WordPress Plugin zitat-service.de

Under Development: WordPress plugin to display random quotes from community [zitat-service.de](https://www.zitat-service.de).

## Test & Development Environment
<details>
  <summary>There is a docker test and development environment prepared.</summary>
This is a docker stack for testing the WordPress plugin.

```bash
git clone https://github.com/muhme/quote_wordpress
cd quote_wordpress
docker compose up -d
```

Four Docker containers are running:

```
host$ docker ps
IMAGE                       PORTS                                            NAMES
quote_wordpress-wordpress   0.0.0.0:3080->80/tcp                             quote_wp_wordpress
phpmyadmin/phpmyadmin       0.0.0.0:3081->80/tcp                             quote_wp_phpmyadmin
mariadb                     3306/tcp                                         quote_wp_mariadb
maildev/maildev             0.0.0.0:1025->1025/tcp, 0.0.0.0:3082->1080/tcp   quote_wp_maildev
```

Docker containers are:
  * quote_wp_wordpress – WordPress CMS
    * http://localhost:3080 – WordPress instance, ready for installation
    * WordPress files are available mapped to docker host in directory 'wp'
    * [msmtp](https://marlam.de/msmtp/) is used as a simple SMPT client
    * A small WordPress plugin sets the sender email address (from field) fixed to 'webmaster@docker.local' and fixes the problem of undeliverable address 'wordpress@localhost' inside Docker container. Installing it as [must-use WordPress plugin](https://wordpress.org/support/article/must-use-plugins) to have it already actived.
  * quote_wp_mariadb – MariaDB database
    * database available as mariadb:3306
    * user 'root', password 'root' and database 'wordpress'
  * quote_wp_phpmyadmin – phpmyadmin for database administration
    * http://localhost:3081 – phpMyAdmin to work with the database
  * quote_wp_maildev - [MailDev](https://github.com/maildev/maildev) for collecting and showing mails
    * listening for mails on maildev:1025
    * http://localhost:3082 – MailDev web interface

</details>


## License

MIT License, Copyright (c) 2023 Heiko Lübbe, see [LICENSE](LICENSE)

## Contact
Don't hesitate to ask if you have any questions or comments.
