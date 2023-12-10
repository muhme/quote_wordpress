#!/bin/bash
#
# Copyright (c) 2023 Heiko Lübbe
# This software is licensed under the MIT License.
# For the full license text, see the LICENSE file in the project root or visit https://opensource.org/licenses/MIT
#
# deleteAllPosts.sh - create the installable plugin zip

# -e exist if a command fails
# -u attempt to use an unset variable.
# -o pipefail the pipeline's return status is the value of the last (rightmost) command to exit with a non-zero status
set -euo pipefail

docker exec -it quote_wp_wordpress sh -c "wp post list --post_type='post' --format=ids --allow-root | xargs -n 1 wp post delete --force --allow-root"
