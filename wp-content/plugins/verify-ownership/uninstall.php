<?php

/*----------------------------------------------------------------
	Uninstall Verify Ownership - deletes plugin data in database
----------------------------------------------------------------*/

// Exit if accessed directly
if( !defined( 'ABSPATH' ) ) {
	exit;
}

if( !defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

delete_option( 'verify_ownership_options' );