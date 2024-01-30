# Language Files

This folder contains the language translations for internationalisation (I18N). Supported languages for the WordPress plugin `zitat-service` by source code are the same five languages as supported by the user community [https://www.zitat-service.de](www.zitat-service.de) and the used API [https://api.zitat-service.de](api.zitat-service.de). These five languages are German (de), English (en), Spanish (es), Japanese (ja) and Ukrainian (uk). 

WordPress uses different locales for the languages, among other locales e.g. Argentine Spanish (es_AR) and Mexican Spanish (es_MX) for the Spanish language. This plugin does not differentiate between the different locales for a language. The English strings are extracted from the source code of the plugin and four translations are created. These four translated language files are copied as the 20 locales. All English language locales are not handled and in these cases (as well as for unsupported languages) the English strings of the plugin source are used.

The Gutenberg WordPress block widget needs two different file types for the translation, `.mo` for PHP  and `.json` for JavaScript. `wp i18n make-json` is used to create the translation files for JavaSript. As we only need the bundled JavaScript version `build/index.js`, only this `.json` file is used and all others are deleted.

The different file formats used are:
* .pot Portable Object Template (POT), from plugin extraced translatable strings
* .po Portable Object (PO), translated POT file
* .mo Machine Object, compiled binary version for PHP
* .json JavaScript Object Notation, translation strings for JavaScript

This folder contains:
| Number | File | Usage |
| ------ | ---- | ----- |
| 1 | zitat-service.pot | extracted strings, created by `wp i18n make-pot` with script `i18n-init.sh` |
| 4 | zitat-service-*.po | copied strings, created by `msginit` with script `i18n-init.sh`, afterwards to be translated |
| 20 | zitat-service-*.mo | compiled language files for PHP, created by `msgfmt` with script `i18n-create.sh` |
| 20 | zitat-service-*.json | translation files for JavaScript, created by `wp i18n make-json` with script `i18n-create.sh` |

## Initial Creation

```
host$ scripts/i18n-init.sh
```

Afterwards the `msgstr` in the `.po` files have to be filled with the translation manually.

## Create Language Translation Files

Once all four `.po` files are translated, the 20 `.mo` and the 20 `.json` files have to be created:

```
host$ docker exec -it quote_wp_wordpress /var/www/html/wp-content/plugins/zitat-service/scripts/i18n-create.sh
```

## Update Process

Unfortunately, the update process is not yet automated. Create a new `.pot` file and apply all line number changes, copy new strings, translate them into the four `.po` files. Afterwards create the translation files with script `i18n-create.sh`.
```
host$ npm run build
quote_wp_wordpress$ cd /var/www/html/wp-content/plugins/zitat-service
quote_wp_wordpress$ wp i18n make-pot ./ temporary_new.pot --allow-root
```
