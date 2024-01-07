<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
require_once plugin_dir_path(__FILE__) . 'helper.php';
?>

<div
  <?php echo get_block_wrapper_attributes(); ?>>
  <?php echo wp_kses_post(fetchQuote($attributes['language'])); ?>
</div>
