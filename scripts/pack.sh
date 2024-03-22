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

# to have created date now
rm -f random-quote-zitat-service.zip

# for packing list see https://developer.wordpress.org/plugins/plugin-basics/best-practices/#folder-structure
npm run plugin-zip

# work is done
echo '*** Packed:'
ls -l random-quote-zitat-service.zip
