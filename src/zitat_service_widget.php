<?php
/*
Plugin Name: Zitat Service
Description: Random quote from the user community zitat-service.de for quotations in the languages: Deutsch 🇩🇪, English 🇬🇧, Español 🇪🇸, 日本語 🇯🇵 and Українська 🇺🇦.
Plugin URI: https://github.com/muhme/quote_wordpress
Author: Heiko Lübbe
Version: 1.1.0
Author URI: https://www.heikol.de
License: MIT License, Copyright (c) 2023 Heiko Lübbe
License URI: https://github.com/muhme/quote_wordpress/LICENSE
 *
 * https://github.com/muhme/quote_wordpress
 */

define('ZITAT_SERVICE_VERSION', '1.1.0');
// define('ZITAT_SERVICE_API_URL', 'http://host.docker.internal:3000/v1');
define('ZITAT_SERVICE_API_URL', 'https://api.zitat-service.de/v1');
// list of valid languages as from https://api.zitat-service.de/v1/languages
define('LANGUAGES', ['de', 'es', 'en', 'ja', 'uk']);

// Creating the widget
class ZitatServiceWidget extends WP_Widget
{
    /**
     * get actual language w/o locale and fall back to 'en' if not supported
     */
    public function getActualLanguage($language)
    {
        // use WordPress' user locale if language is not set
        $language = $language ?? get_user_locale();

        // from e.g. 'de-DE' extract the first two characters to get the language w/o country
        $langShort = substr($language, 0, 2);

        // extracted language is valid or default to 'en'
        return in_array($langShort, LANGUAGES) ? $langShort : 'en';
    }

    public function __construct()
    {
        parent::__construct(
            'zitat-service', // Base ID
            'Zitat Service' // Widget name in UI
        );
    }

    // widget front-end
    public function widget($args, $instance)
    {
        if (isset($instance['title'])) {
            $title = apply_filters('widget_title', $instance['title']);
        } else {
            $title = '';
        }

        // before and after widget arguments are defined by themes
        echo $args['before_widget'];
        if (!empty($title)) {
            echo $args['before_title'] . $title . $args['after_title'];
        }

        $url = ZITAT_SERVICE_API_URL . '/quote_html?contentOnly=true&V_' . ZITAT_SERVICE_VERSION . '_W' . '&language=' . $this->getActualLanguage($instance['language'] ?? null);

        $response = wp_remote_get($url);

        if (is_wp_error($response)) {
            $body = 'ERROR!';
        } else {
            $body = wp_remote_retrieve_body($response);
        }

        echo __($body, 'text_domain');

        echo $args['after_widget'];

    }

    // widget backend
    public function form($instance)
    {
        if (isset($instance['title'])) {
            $title = $instance['title'];
        } else {
            $title = __('New title', 'text_domain');
        }
        // widget admin form
        ?>
<p>
<label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:');?></label>
<input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo esc_attr($title); ?>" />
</p>
<?php
}

    // updating widget replacing old instances with new
    public function update($new_instance, $old_instance)
    {
        $instance = array();
        $instance['title'] = (!empty($new_instance['title'])) ? strip_tags($new_instance['title']) : '';
        return $instance;
    }

}

// register and load the widget
function zitat_service_load_widget()
{
    register_widget('ZitatServiceWidget');
}
add_action('widgets_init', 'zitat_service_load_widget');

// add shortcode
function zitat_service_shortcode($attributes)
{
    ob_start();
    the_widget('ZitatServiceWidget', $attributes);
    return ob_get_clean();
}
add_shortcode('zitat_service', 'zitat_service_shortcode');

?>
