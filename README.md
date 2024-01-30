# WordPress Plugin zitat-service.de

![WordPress plugin zitat_service](assets/screenshot-1.png)

Free and open-source WordPress plugin to display random quotes from community [zitat-service.de](https://www.zitat-service.de).

:bulb: **Tip:** Help for the WordPress plugin installation and administration is available at https://github.com/muhme/quote_wordpress/wiki.

The plugin has not yet been submitted to WordPress as it is still under development. But there is a first working version in folder [dist](dist), which is ready for download and installation. Change log is available as [CHANGELOG.md](CHANGELOG.md).

## Requirements

* WordPress >= 6.1
* PHP >= 7.4

## Test & Development Environment
<details>
  <summary>There is a docker test and development environment prepared.</summary>
To create the test and development environment run:

```
host$ git clone https://github.com/muhme/quote_wordpress
host$ cd quote_wordpress
host$ docker compose up -d
```

Six Docker containers are running:

```
host$ docker ps
IMAGE                          PORTS                                            NAMES
quote_wordpress-wordpress      0.0.0.0:4080->80/tcp                             quote_wp_wordpress
wordpress:6.1-php7.4-apache    0.0.0.0:4084->80/tcp                             quote_wp_min
phpmyadmin/phpmyadmin          0.0.0.0:4081->80/tcp                             quote_wp_phpmyadmin
mariadb                        3306/tcp                                         quote_wp_mariadb
maildev/maildev                0.0.0.0:1025->1025/tcp, 0.0.0.0:4082->1080/tcp   quote_wp_maildev
mcr.microsoft.com/playwright   0.0.0.0:4083->80/tcp                             quote_wp_playwright
```

Docker containers are:
  * quote_wp_wordpress – WordPress latest version
    * http://host.docker.internal:4080 – WordPress instance, ready for installation, test and development
    * [msmtp](https://marlam.de/msmtp/) is used as a simple SMPT client
    * A small WordPress plugin sets the sender email address (from field) fixed to 'webmaster@docker.local' and fixes the problem of undeliverable address 'wordpress@localhost' inside Docker container. Installing it as [must-use WordPress plugin](https://wordpress.org/support/article/must-use-plugins) to have it already actived.
    * has gettext package, vim and ping installed
  * quote_wp_min - minimum required PHP/WordPress version
    * http://host.docker.internal:4084 – WordPress instance, ready for installation and test
  * quote_wp_mariadb – MariaDB database
    * database available as mariadb:3306
    * user 'root', password 'root' and database 'wordpress'
  * quote_wp_phpmyadmin – phpmyadmin for database administration
    * http://localhost:4081 – phpMyAdmin to work with the database
  * quote_wp_maildev - [MailDev](https://github.com/maildev/maildev) for collecting and showing WordPress mails
    * listening for mails on maildev:1025
    * http://localhost:4082 – MailDev web interface
  * quote_wp_playwright- for E2E testing

:bulb: **Tip:** To have WordPress working with HTTP and from localhost and inside Docker container, plus access WordPress from Playwrigth container the little trick is to use the URL `http://host.docker.internal:4080`. The hostname `host.docker.internal` is identical inside docker container and on host machine, if you make the following `/etc/hosts` entry:
```bash
127.0.0.1	host.docker.internal
```

### Installation

The command-line interface for WordPress [WP-CLI](https://wp-cli.org/) is used for the script-based completion of the installation and other tasks. After creating the Docker containers `quote_wp_wordpress` and `quote_wp_min` run `scripts/install.sh` once:
```
host$ scripts/install.sh

*** Waiting for container quote_wp_wordpress
waiting for 1 resources: http://host.docker.internal:4080
*** Installing WP-CLI
*** Complete WordPress installation
Success: WordPress installed successfully.
*** Install additional languages
Language 'de_DE' installed.
Language 'es_ES' installed.
Language 'ja' installed.
Language 'uk' installed.
*** Create four additional admins with locales
*** Activate plugin zitat-service
*** Recursivly chown to www-data

*** Waiting for container quote_wp_min
waiting for 1 resources: http://host.docker.internal:4084
*** Installing WP-CLI
*** Complete WordPress installation
Success: WordPress installed successfully.
*** Install additional languages
Language 'de_DE' installed.
Language 'es_ES' installed.
Language 'ja' installed.
Language 'uk' installed.
*** Create four additional admins with locales
*** Activate plugin zitat-service
*** Recursivly chown to www-data
```

WordPress is installed with the five languages supported by the plugin. The plugin `zitat-service` is installed and activated. There are five admin users, each of whom has set one of the languages. Users are `admin`, `admin_de`, `admin_es`, `admin_ja` and `admin_uk`. Password is always `admin`.

### Testing

Automated Playwright tests are in subfolder [test](./test/) and and are described there.

### Scripts

More scripts are prepared for a pleasant and also faster development, see folder [scripts](./scripts/) and commented list of scripts there.

</details>

## License

GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe, see [LICENSE](LICENSE)

## Contact
Don't hesitate to ask if you have any questions or comments.
