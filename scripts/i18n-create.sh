#!/bin/bash
#
# scripts/i18n-create.sh - create .mo and .json from .po files
#
# MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# intended to be run in quote_wp_wordpress container
# needs gettext package installed as already in quote_wp_wordpress container
# needs WordPress CLI installed, as already in quote_wp_wordpress container
# needs bash version >= 4, see echo $BASH_VERSION

set -e # stop on 1st failed command

# define languages and their locales with associative array
declare -A LANGUAGES
LANGUAGES=(
    ["de"]="de_DE de_DE_formal de_AT de_CH de_CH_informal"
    ["es"]="es_ES es_CR es_VE es_AR es_MX es_CO es_EC es_PE es_DO es_CL es_UY es_PR es_GT"
    ["ja"]="ja"
    ["uk"]="uk"
)

# destination folder
cd /var/www/html/wp-content/plugins/zitat-service/languages

# create 20 .mo files
echo "*** Create .mo binary message catalog files for PHP"
rm -f *.mo
for lang in "${!LANGUAGES[@]}"; do
    locales=${LANGUAGES[$lang]}
    for locale in $locales; do
      # echo "*** $lang $locale"
      msgfmt "zitat-service-${lang}.po" -o "zitat-service-${locale}.mo"
    done
done
chown -R www-data:www-data .
echo "*** Created `ls *.mo|wc -l` machine object files in `pwd`:"
ls -l *.mo

# create 20 .json files
echo "*** Create .json translation files for JavaScript"
rm -f *.json
for lang in "${!LANGUAGES[@]}"; do
    locales=${LANGUAGES[$lang]}
    for locale in $locales; do
      # echo "*** $lang $locale"
      if [ "${locale}" != "${lang}" ] ; then
        # create .po for the locale temporary if not the same file
        cp "zitat-service-${lang}.po" "zitat-service-${locale}.po"
      fi
      # make json files and delete all except the json for build/index.js
      wp i18n make-json "zitat-service-${locale}.po" --no-purge --quiet --allow-root
      for file in zitat-service-${locale}-*.json; do
        grep -q "\"build\\\/index.js\"" "${file}" || rm "${file}"
      done
      if [ "${locale}" != "${lang}" ] ; then
        # delete temporary .po for the locale if not the language file
        rm "zitat-service-${locale}.po"
      fi
    done
done
chown -R www-data:www-data .
echo "*** Created `ls *.json|wc -l` JSON files in `pwd`:"
ls -l *.json
