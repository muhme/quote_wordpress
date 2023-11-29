<?php
/**
 * Plugin Name: Sets Mail From
 * Version: 0.0.1
 * Description: Sets mail 'From' hard-wired to 'webmaster@docker.local'.
 * 
 * MIT License, Copyright (c) 2023 Heiko Lübbe
 * https://github.com/muhme/quote_wordpress
 */
  add_filter( 'wp_mail_from',
    function( $email ) {
	    return 'webmaster@docker.local';
    } );

