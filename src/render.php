<?php
/**
 * src/render.js - PHP based frontend, block.json configured renderer
 *
 * GPLv3 License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress-plugin Zitat-Service Random Quote see https://github.com/muhme/quote_wordpress
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once plugin_dir_path(__FILE__) . "helper.php";
?>

<div
  <?php echo wp_kses_data(get_block_wrapper_attributes()); ?>>
  <?php echo wp_kses_post(ZitatServiceRandomQuote\retrieveQuote($attributes)); ?>
</div>
