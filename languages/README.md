# Language Files

This folder contains the language translations for internationalisation (I18N). Supported languages by the WordPress block widget plugin `zitat-service` are the same five as supported by the user community [https://www.zitat-service.de](www.zitat-service.de) and the used API [https://api.zitat-service.de](api.zitat-service.de). The five languages are German (de), English (en), Spanish (es), Japanese (ja) and Ukrainian (uk). 

WordPress uses different locales for the languages, e.g. Argentinian Spanish (es_AR) and Mexican Spanish (es_MX). This plugin does not differentiate between the different locales for a language. From English in plugins source code four translations are created and the four translated language files are then used to create translations for the 20 locales. All English language locales are not handled and in these cases (as well as for unsupported languages) the English strings of the plugin source are simply used.

The Gutenberg WordPress block widget needs two different types of translation files, .mo for PHP  and .json for JavaScript. `wp i18n make-json` is used to create the translation files for JavaSript. As we need only the bundled `build/index.js` version, all others are deleted after running `wp i18n make-json`.

The different file formats used are:
* .pot Portable Object Template (POT), from plugin extraced translatable strings
* .po Portable Object (PO), translated POT file
* .mo Machine Object, compiled binary version for PHP
* .json JavaScript Object Notation, translation strings for JavaScript

This folder contains:
| Number | File | Usage |
| ------ | ---- | ----- |
| 1 | zitat-service.pot | extracted strings, created by `wp i18n make-pot` with script `i18n-init.sh` |
| 4 | zitat-service-*.po | copied strings, created by `msginit` with script `i18n-init.sh`, afterwards translated |
| 20 | zitat-service-*.mo | compiled language files for PHP, created by `msgfmt` with script `i18n-create.sh` |
| 20 | zitat-service-*.json | translation files for JavaScript, created by `wp i18n make-json` with script `i18n-create.sh` |

## Update Process

Unfortunately, the update process is not yet automated. Create a new .pot and translate new strings manually into the four .po files and apply all line number changes:
```
host$ npm run build
quote_wp_wordpress$ cd /var/www/html/wp-content/plugins/zitat-service
quote_wp_wordpress$ wp i18n make-pot ./ /tmp/new.pot --allow-root
```
