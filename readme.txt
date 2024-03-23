=== Random Quote from Zitat-Service ===
Contributors: muhme
Donate link: https://github.com/muhme/quote_wordpress
Tags: quote, citation, proverb, inspirational quotes, quote of the day (QOTD)
Requires at least: 6.1
Tested up to: 6.4
Stable tag: 1.4.0
Requires PHP: 7.4
License: GPLv3
License URI: https://raw.githubusercontent.com/muhme/quote_wordpress/main/LICENSE.txt

Displays a random quote from user community zitat-service.de in English, German, Spanish, Japanese and Ukrainian.

== Description ==

The WordPress plugin *Random Quote from Zitat-Service* displays a random quote from the collection of the
user community [zitat-service.de/en](https://www.zitat-service.de/en). The selection of
quotes comes from the five languages Deutsch 🇩🇪, English 🇬🇧, Español 🇪🇸, 日本語 🇯🇵 and Українська 🇺🇦.
We have been online since 2007, free of charge and without advertising.

Instructions for installation and configuration can be found at [wiki](https://github.com/muhme/quote_wordpress/wiki).

There is a WordPress demo installation with plugin *Random Quote from Zitat-Service* running online at [wp-demo.zitat-service.de](https://wp-demo.zitat-service.de).

== Usage of External API.zitat-service.de ==

The WordPress plugin fetches all data from [api.zitat-service.de](https://api.zitat-service.de).
Terms of use and privacy statement can be found in the [Imprint](https://www.zitat-service.de/en/start/contact).

The random quotes on the frontend of the WordPress website are fetched by PHP code that runs on the WordPress server.
This means that the process of retrieving quotes does not involve tracking or recording any user-specific data.
Instead, it operates within the server environment, ensuring user privacy and compliance with guidelines that
prohibit tracking users without their consent.

The displayed quotes, along with their respective authors and sources, are linked externally to websites
such as zitat-service.de and Wikipedia to provide users with additional context and information.
It's important to note that all external links are activated only after manual verification by the admin team
at zitat-service.de, ensuring the reliability and accuracy of the linked content.

== Frequently Asked Questions ==

= Where can I report a problem or request an improvement? =

Please use [github.com/muhme/quote_wordpress/issues](https://github.com/muhme/quote_wordpress/issues).

== Screenshots ==

1. This screenshot combines the display in the list of plugins and the backend view with the selection of quotes in the "English" language and the "Dance" category.

== Changelog ==

For changelog in detail see [CHANGELOG.md](https://github.com/muhme/quote_wordpress/blob/main/CHANGELOG.md)

= 1.4.0 =
* WordPress Plugin Review Team requested changes, including plugin name change and updated all dependencies.

= 1.3.0 =
* First implementation as Gutenberg block editor plugin.

For older versions see [CHANGELOG.md](https://github.com/muhme/quote_wordpress/blob/main/CHANGELOG.md)

== Upgrade Notice ==

If you are using an earlier development version with short codes, you must remove the short codes and start with a new configuration of the block editor widget.
