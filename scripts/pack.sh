#!/bin/bash
#
# scripts/pack.sh - create the installable plugin zip
#
# GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress

# -e exist if a command fails
# -u attempt to use an unset variable.
# -o pipefail the pipeline's return status is the value of the last (rightmost) command to exit with a non-zero status
set -euo pipefail

TMP=/tmp/$(basename $0).$$
trap 'rm -rf $TMP' 0

#
# main
#
# e.g. ' * Version:           1.3.0'
VERSION=`grep "Version:" zitat-service.php | awk '{print $3}'`
ZIP="dist/zitat-service-$VERSION.zip"

echo '*** Packing plugin'

# create zip
# Synchronize the contents of the zip archive with the current directory.
# -r: Recursively include directories.
(cd src && zip --filesync -r "../${ZIP}" . --quiet)
zip "${ZIP}" assets/screenshot-1.png zitat-service.php readme.txt --quiet

# work is done
zipinfo "${ZIP}"
