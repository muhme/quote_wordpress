#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# pack.sh - create the installable plugin zip

# -e exist if a command fails
# -u attempt to use an unset variable.
# -o pipefail the pipeline's return status is the value of the last (rightmost) command to exit with a non-zero status
set -euo pipefail

TMP=/tmp/$(basename $0).$$
trap 'rm -rf $TMP' 0

#
# main
#
VERSION=`egrep "ZITAT_SERVICE_VERSION.*[0-9].[0-9].[0-9]" src/zitat_service_widget.php | awk -F "'" '{print $4}'`
ZIP="dist/zitat_service_widget_$VERSION.zip"

echo '*** Pack plugin as ZIP file'

# create zip
(cd src && zip -r "../${ZIP}" . --quiet)

# work is done
echo "packed as $ZIP"
