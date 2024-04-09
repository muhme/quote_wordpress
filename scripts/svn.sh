#!/bin/bash
#
# scripts/svn.sh - create the SVN checkout directory and update from assets/ and ZIP
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress-plugin random-quote-zitat-service see https://github.com/muhme/quote_wordpress

# -e exit if a command fails
# -u exit when attempting to use an unset variable
# -o pipefail - the pipeline's return status is the value of the last (rightmost) command to exit with a non-zero status
set -euo pipefail

SLUG=random-quote-zitat-service

echo '*** Creating SVN checkout directory `${SLUG}` with actual ZIP'

mkdir "${SLUG}"
svn co "https://plugins.svn.wordpress.org/${SLUG}" "${SLUG}"

cp -r assets "${SLUG}"
# unzip -o overwrite all
(cd "${SLUG}/trunk" && unzip -o "../../${SLUG}.zip")

cat <<EOF
You have to do something like:
$ cd random-quote-zitat-service
$ svn stat
$ svn diff
$ svn ci -m 'new version 1.4.0' --username muhme
$ svn cp trunk tags/1.4.0
$ svn ci -m 'tagging version 1.4.0'

Aftwards you can delete this directoy.
EOF
