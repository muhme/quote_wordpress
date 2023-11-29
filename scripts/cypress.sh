#
# Copyright (c) 2023 Heiko Lübbe
# This software is licensed under the MIT License.
# For the full license text, see the LICENSE file in the project root or visit https://opensource.org/licenses/MIT
#
# cypress.sh - open Cypress GUI on local host

echo "open Cypress for WordPress installation or test"
cd test && npx cypress open
