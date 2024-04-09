<?php
/**
 * Plugin Name:       Random Quote from Zitat-Service
 * Plugin URI:        https://github.com/muhme/quote_wordpress
 * Description:       Displays a random quote from the collection of the user community zitat-service.de in German 🇩🇪, English 🇬🇧, Español 🇪🇸, 日本語 🇯🇵 or Українська 🇺🇦.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.4.1
 * Author:            Heiko Lübbe
 * Author URI:        https://www.heikol.de
 * License:           GPLv3
 * License URI:       https://raw.githubusercontent.com/muhme/quote_wordpress/main/LICENSE.txt
 * Text Domain:       random-quote-zitat-service
 * Domain Path:       /languages
 */

namespace RandomQuoteZitatService;

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
function block_init()
{
    register_block_type(__DIR__ . "/build");

    // load MO files for PHP
    load_plugin_textdomain( 'random-quote-zitat-service', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

    // load JSON files for JS - this is necessary to use a custom languages path
    // generates the handle based on the block name and the field name
    $script_handle = generate_block_asset_handle( 'random-quote-zitat-service/random-quote', 'editorScript' );
    wp_set_script_translations( $script_handle, 'random-quote-zitat-service', plugin_dir_path( __FILE__ ) . 'languages' );
}
add_action("init", "RandomQuoteZitatService\block_init");
