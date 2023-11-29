#!/bin/bash
#
# Copyright (c) 2023 Heiko Lübbe
# This software is licensed under the MIT License.
# For the full license text, see the LICENSE file in the project root or visit https://opensource.org/licenses/MIT
#
# install.sh - install WordPress and plugin zitat-service with headless Cypress
#            - cypress options can be added with CYPRESS_OPTIONS env var, e.g. CYPRESS_OPTIONS="video=true"

config_cypress_options=""
if [ "$CYPRESS_OPTIONS" != "" ]; then
    config_cypress_options="--config $CYPRESS_OPTIONS"
fi

echo "installing WordPress and plugin zitat-service"
docker exec -it quote_wp_cypress sh -c "cypress run --spec cypress/e2e/install.cy.js $config_cypress_options"
