#!/bin/bash
#
# scripts/pack.sh - create the installable plugin zip
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service see https://github.com/muhme/quote_wordpress
#
# packing ZIP archive without version, as WordPress is stupid using ZIP file name as plugin directory name

# -e exit if a command fails
# -u exit when attempting to use an unset variable
# -o pipefail - the pipeline's return status is the value of the last (rightmost) command to exit with a non-zero status
set -euo pipefail

echo '*** Packing plugin'

if [ $# -eq 1 ] && [ "$1" = "full" ]; then

    echo '*** i18n-create.sh'
    docker exec -it quote_wp_wordpress /var/www/html/wp-content/plugins/random-quote-zitat-service/scripts/i18n-create.sh

    echo '*** ncu – node check updates -> ncu -u && npm install'
    ncu -e 2

    echo '*** npm audit – node package manager audit'
    npm audit

    echo '*** npm run lint:css – node package manager linting CSS'
    npm run lint:css

    echo '*** npm run lint:js – node package manager linting JavaScript -> npm run lint:js:fix'
    npm run lint:js

    echo '*** npm run format – node package manager source code formatting'
    npm run format

    echo '*** npm run build'
    npm run build

    echo '*** scripts/compose.sh build'
    scripts/compose.sh build

    echo '*** scripts/install.sh'
    scripts/install.sh

    echo '*** scripts/test.sh --workers=2'
    scripts/test.sh --workers=2
fi

# to have created date now
rm -f random-quote-zitat-service.zip

# for packing list see https://developer.wordpress.org/plugins/plugin-basics/best-practices/#folder-structure
npm run plugin-zip

# work is done
echo '*** Packed:'
ls -l random-quote-zitat-service.zip
