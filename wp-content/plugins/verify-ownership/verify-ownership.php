<?php
/**
* Plugin Name: Verify Ownership
* Plugin URI: http://wordpress.org/plugins/verify-ownership/
* Description: An easy way to add Google, Yahoo, Bing, Alexa and Pinterest meta tag verification codes to your site and gets ownership verified. It also adds statistics scripts to the footer of your site.
* Version: 1.2
* Author: Tiguan
* Author URI: http://tiguandesign.com
* License: GPLv2
*/

/*  Copyright 2014 Tiguan (email : themesupport [at] tiguandesign [dot] com)

    THIS PROGRAM IS FREE SOFTWARE; YOU CAN REDISTRIBUTE IT AND/OR MODIFY
    IT UNDER THE TERMS OF THE GNU GENERAL PUBLIC LICENSE AS PUBLISHED BY
    THE FREE SOFTWARE FOUNDATION; EITHER VERSION 2 OF THE LICENSE, OR
    (AT YOUR OPTION) ANY LATER VERSION.

    THIS PROGRAM IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
    BUT WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF
    MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
    SEE THE GNU GENERAL PUBLIC LICENSE FOR MORE DETAILS.

    YOU SHOULD HAVE RECEIVED A COPY OF THE GNU GENERAL PUBLIC LICENSE
    ALONG WITH THIS PROGRAM; IF NOT, WRITE TO THE FREE SOFTWARE
    FOUNDATION, INC., 51 FRANKLIN ST, FIFTH FLOOR, BOSTON, MA  02110-1301  USA
*/


/*----------------------------------------------
	Define some useful plugin constants
----------------------------------------------*/

define( 'VERIFY_OWNERSHIP_RELEASE_DATE', date_i18n( 'F j, Y', '1402642800' ) );	// Defining plugin release date
define( 'VERIFY_OWNERSHIP_VERSION', 'v1.2');									// Defining plugin version


/*----------------------------------------------
	Main Plugin Class
----------------------------------------------*/

if( !class_exists( 'Verify_Ownership' ) ) {

	class Verify_Ownership {

		public $options;
		public $plugin_options;


/*----------------------------------------------
	Function Construct
----------------------------------------------*/

		public function __construct() {

			add_action( 'admin_init', array( $this, 'admin_init' ) );

			add_action( 'after_setup_theme', array( $this, 'after_setup_theme' ) );

			add_action( 'admin_menu', array( $this, 'add_menu' ) );

			add_action( 'wp_head', array( $this, 'vo_head' ) );

			add_action( 'wp_footer', array( $this, 'vo_footer' ), 999);

			add_action( 'plugins_loaded', array( $this, 'verify_ownership_translations' ) );

			add_action( 'admin_enqueue_scripts',  array( $this, 'vo_enqueue_styles' ) );

			$plugin = plugin_basename( __FILE__ );
			add_filter( "plugin_action_links_$plugin", array( $this, 'vo_settings_link' ) );

			$this->plugin_options = get_option( 'verify_ownership_options' );

		}


/*----------------------------------------------
	Activate the plugin
----------------------------------------------*/

		public static function activate() {
			// Nothing to do yet
		}


/*----------------------------------------------
	Deactivate the plugin
----------------------------------------------*/

		public static function deactivate() {
			// Nothing to do yet
		}


/*----------------------------------------------
	Hook into WP admin_init
----------------------------------------------*/

		public function admin_init( $options ) {

				$this->init_settings();
		}


/*----------------------------------------------
	Hook into WP after_setup_theme
----------------------------------------------*/

		public function after_setup_theme() {

		}


/*----------------------------------------------
	Load plugin textdomain
----------------------------------------------*/

		public function verify_ownership_translations() {
			load_plugin_textdomain( 'verify-ownership', false, basename( dirname( __FILE__ ) ) . '/languages' );
		}


/*----------------------------------------------
	CSS style of the plugin options page
----------------------------------------------*/

	function vo_enqueue_styles() {

		wp_enqueue_style( 'vo-styles', plugin_dir_url( __FILE__ ) . 'css/sbp_style.min.css' );	//	change to style.dev.css to debug your plugin style

		}


/*----------------------------------------------
	Init settings
----------------------------------------------*/

		public function init_settings() {
			register_setting(
				'verify_ownership',
				'verify_ownership_options',
				array( $this, 'verify_ownership_sanitize' )
			);

		}


/*----------------------------------------------
	Add options page menu
----------------------------------------------*/

		public function add_menu() {

			add_options_page(
				__( 'Verify Ownership Settings', 'verify-ownership' ),
				__( 'Verify Ownership', 'verify-ownership' ),
				'manage_options',
				'verify-ownership',
				array( $this, 'vo_settings_page' )
				);
		}


/*----------------------------------------------
	Settings page function
----------------------------------------------*/

		public function vo_settings_page() {
			if( !current_user_can( 'manage_options' ) ) {
				wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
			}

			// Render the settings template
			include( sprintf( "%s/templates/settings.php", dirname( __FILE__ ) ) );
		}


/*----------------------------------------------
	Hook into wp_head
----------------------------------------------*/

		public function vo_head() {

			$vo_options = ( $this->plugin_options );

			if( !empty( $vo_options['google_verify'] ) ) {
				echo '<meta name="google-site-verification" content="' . esc_attr( $vo_options['google_verify'] ) . '" />' . "\n";
			}

			if( !empty( $vo_options['bing_verify'] ) ) {
				echo '<meta name="msvalidate.01" content="' . esc_attr( $vo_options['bing_verify'] ) . '" />' . "\n";
			}

			if( !empty( $vo_options['yahoo_verify'] ) ) {
				echo '<meta name="y_key" content="' . esc_attr( $vo_options['yahoo_verify'] ) . '" />' . "\n";
			}

			if( !empty( $vo_options['alexa_verify'] ) ) {
				echo '<meta name="alexaVerifyID" content="' . esc_attr( $vo_options['alexa_verify'] ) . '" />' . "\n";
			}

			if( !empty( $vo_options['pinterest_verify'] ) ) {
				echo '<meta name="p:domain_verify" content="' . esc_attr( $vo_options['pinterest_verify'] ) . '" />' . "\n";
			}

			if( !empty( $vo_options['norton_meta_tag_verify'] ) ) {
				echo '<meta name="norton-safeweb-site-verification" content="' . esc_attr( $vo_options['norton_meta_tag_verify'] ) . '" />' . "\n";
			}

		}


/*----------------------------------------------
	Hook into wp_footer
----------------------------------------------*/

		public function vo_footer() {

			$vo_options = ( $this->plugin_options );

			if( !empty( $vo_options['statistics_tracker'] ) ) {
				echo $vo_options['statistics_tracker'];
			}

		}



/*----------------------------------------------
	Sanitize Options
----------------------------------------------*/

		public function verify_ownership_sanitize( $input ) {

			$output = array();

			foreach( $input as $key => $tiguan ) {

				switch( $key ) {
					case 'google_verify':
					$output[$key] = wp_filter_post_kses( $tiguan );
					break;
					case 'yahoo_verify':
					$output[$key] = wp_filter_post_kses( $tiguan );
					break;
					case 'alexa_verify':
					$output[$key] = wp_filter_post_kses( $tiguan );
					break;
					case 'pinterest_verify':
					$output[$key] = wp_filter_post_kses( $tiguan );
					break;
					case 'bing_verify':
					$output[$key] = wp_filter_post_kses( $tiguan );
					break;
					case 'norton_meta_tag_verify':
					$output[$key] = wp_filter_post_kses( $tiguan );
					break;
					case 'statistics_tracker':
					$output[$key] = wp_kses_stripslashes( $tiguan );
					break;

				}

			}

			return $output;
		}


/*----------------------------------------------
	Add settings link to plugin activate page
----------------------------------------------*/

		public function vo_settings_link( $links ) {

			$settings_link = '<a href="options-general.php?page=verify-ownership">' . __( 'Settings', 'verify-ownership' ) . '</a>';
			array_unshift( $links, $settings_link );
			return $links;
		}
	}
}



/*----------------------------------------------
	Initialize Plugin
----------------------------------------------*/

if( class_exists( 'Verify_Ownership' ) ) {

	// Installation and uninstallation hooks
	register_activation_hook( __FILE__, array( 'Verify_Ownership', 'activate' ) );
	register_deactivation_hook( __FILE__, array( 'Verify_Ownership', 'deactivate' ) );

	// instantiate the plugin class
	$verify_ownership = new Verify_Ownership();

}
