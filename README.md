# WordPress Plugin zitat-service.de

WordPress plugin to display random quotes from community [zitat-service.de](https://www.zitat-service.de).

:bulb: **Tip:** Help for the WordPress plugin installation and administration is available at https://github.com/muhme/quote_wordpress/wiki.

## Test & Development Environment
<details>
  <summary>There is a docker test and development environment prepared.</summary>
This is a docker stack for testing the WordPress plugin.

```bash
git clone https://github.com/muhme/quote_wordpress
cd quote_wordpress
docker compose up -d
```

Five Docker containers are running:

```
host$ docker ps
IMAGE                       PORTS                                            NAMES
quote_wordpress-wordpress   0.0.0.0:4080->80/tcp                             quote_wp_wordpress
phpmyadmin/phpmyadmin       0.0.0.0:4081->80/tcp                             quote_wp_phpmyadmin
mariadb                     3306/tcp                                         quote_wp_mariadb
maildev/maildev             0.0.0.0:1025->1025/tcp, 0.0.0.0:4082->1080/tcp   quote_wp_maildev
cypress/included            0.0.0.0:4083->80/tcp                             quote_wp_cypress
```

Docker containers are:
  * quote_wp_wordpress – WordPress CMS
    * http://localhost:4080 – WordPress instance, ready for installation
    * WordPress files are available mapped to docker host in directory 'wp'
    * [msmtp](https://marlam.de/msmtp/) is used as a simple SMPT client
    * A small WordPress plugin sets the sender email address (from field) fixed to 'webmaster@docker.local' and fixes the problem of undeliverable address 'wordpress@localhost' inside Docker container. Installing it as [must-use WordPress plugin](https://wordpress.org/support/article/must-use-plugins) to have it already actived.
  * quote_wp_mariadb – MariaDB database
    * database available as mariadb:3306
    * user 'root', password 'root' and database 'wordpress'
  * quote_wp_phpmyadmin – phpmyadmin for database administration
    * http://localhost:4081 – phpMyAdmin to work with the database
  * quote_wp_maildev - [MailDev](https://github.com/maildev/maildev) for collecting and showing mails
    * listening for mails on maildev:1025
    * http://localhost:4082 – MailDev web interface
  * quote_wp_cypress - [Cypress](https://www.cypress.io/) for headless end2end testing

</details>


## License

MIT License, Copyright (c) 2023 Heiko Lübbe, see [LICENSE](LICENSE)

## Contact
Don't hesitate to ask if you have any questions or comments.
