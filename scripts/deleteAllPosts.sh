#!/bin/bash
#
# MIT License, Copyright (c) 2023 Heiko Lübbe
# WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
#
# deleteAllPosts.sh - delete ALL posts in WordPress

docker exec -it quote_wp_wordpress sh -c "wp post list --post_type='post' --format=ids --allow-root | xargs -n 1 wp post delete --force --allow-root"
