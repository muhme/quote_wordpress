<?php
/**
 * Plugin Name:       Random Quote
 * Plugin URI:        https://github.com/muhme/quote_wordpress
 * Description:       Displays a random quote from the collection of the user community zitat-service.de.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.3.0
 * Author:            Heiko Lübbe
 * License:           MIT
 * License URI:       https://raw.githubusercontent.com/muhme/quote_wordpress/main/LICENSE
 * Text Domain:       zitat-service
 *
 * @package           zitat-service
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function zitat_service_zitat_service_block_init()
{
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'zitat_service_zitat_service_block_init');

function zitat_service_enqueue_block_frontend_scripts()
{
    wp_enqueue_script(
        'zitat-service-frontend', // Handle for the script.
        plugin_dir_url(__FILE__) . 'src/frontend.js', // Path to the frontend.js file.
        array(), // Dependency array.
        '1.0.0', // Version number.
        true// Enqueue in the footer.
    );

	// Set script type to 'module'
    wp_script_add_data('zitat-service-frontend', 'type', 'module');
}
add_action('wp_enqueue_scripts', 'zitat_service_enqueue_block_frontend_scripts');
