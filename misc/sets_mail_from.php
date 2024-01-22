<?php
/**
 * Plugin Name: Sets Mail From
 * Version: 0.0.1
 * Description: Sets mail 'From' hard-wired to 'webmaster@docker.local'.
 * 
 * misc/sets_mail_from.pho - must-use WordPress plugin to set email From hard-wired in docker env
 *
 * MIT License, Copyright (c) 2023 - 2024 Heiko Lübbe
 * WordPress plugin zitat-service, see https://github.com/muhme/quote_wordpress
 * 
 */
  add_filter( 'wp_mail_from',
    function( $email ) {
	    return 'webmaster@docker.local';
    } );

