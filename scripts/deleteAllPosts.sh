#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# deleteAllPosts.sh - delete ALL posts in WordPress

echo '*** Delete all posts'
docker exec -it quote_wp_wordpress sh -c "wp post list --post_type='post' --format=ids --allow-root | xargs --no-run-if-empty -n 1 wp post delete --force --allow-root"
