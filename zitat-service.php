<?php
/**
 * Plugin Name:       Zitat-Service Random Quote
 * Plugin URI:        https://github.com/muhme/quote_wordpress
 * Description:       Display a random quote from the collection of the user community zitat-service.de in German 🇩🇪, English 🇬🇧, Español 🇪🇸, 日本語 🇯🇵 or Українська 🇺🇦.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.3.0
 * Author:            Heiko Lübbe
 * License:           MIT
 * License URI:       https://raw.githubusercontent.com/muhme/quote_wordpress/main/LICENSE
 * Text Domain:       zitat-service
 * Domain Path:       /languages
 *
 * @package           zitat-service
 */

if (!defined("ABSPATH")) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 * @see https://wordpress.stackexchange.com/a/407437/239194
 */
function zitat_service_zitat_service_block_init()
{
    register_block_type(__DIR__ . "/build");

    // Load MO files for PHP.
    load_plugin_textdomain( 'zitat-service', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

    // Load JSON files for JS - this is necessary if using a custom languages path!!
    $script_handle = generate_block_asset_handle( 'zitat-service/random-quote', 'editorScript' );
    wp_set_script_translations( $script_handle, 'zitat-service', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action("init", "zitat_service_zitat_service_block_init");