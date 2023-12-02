#!/bin/bash
#
# Copyright (c) 2023 Heiko Lübbe
# This software is licensed under the MIT License.
# For the full license text, see the LICENSE file in the project root or visit https://opensource.org/licenses/MIT
#
# clean.sh - delete all quote_wp_* docker containers

echo 'Removing all docker containers quote_wp_*'
docker ps -a --format '{{.Names}}' | grep '^quote_wp_' | xargs docker rm -f
