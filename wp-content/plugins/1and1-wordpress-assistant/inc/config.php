<?php

// Do not allow direct access!
if ( ! defined( 'ABSPATH' ) ) {
	die();
}

/**
 * Class One_And_One_Config
 * Loads and parse the main configuration and handle the different settings
 */
class One_And_One_Config {

	/**
	 * @var One_And_One_Config
	 */
	private static $instance;

	/**
	 * @var string
	 */
	private static $dir;

	/**
	 * @var array
	 */
	private $config = array();

	/**
	 * One_And_One_Config constructor
	 */
	private function __construct() {

		if ( ! self::$dir ) {
			self::set_dir( One_And_One_Wizard::get_plugin_dir_path() . 'config/' );
		}

		self::parse_ini_params();
		self::inject_cookie_params();
	}

	/**
	 * Retrieve the Singleton object
	 *
	 * @return One_And_One_Config
	 */
	public static function get_instance() {

		if ( ! isset( self::$instance ) ) {
			self::$instance = new self;
		}
		return self::$instance;
	}

	/**
	 * Destructor (for testing purpose)
	 */
	public static function reset_instance() {
		self::$instance = null;
	}

	/**
	 * Singleton wrapper function to retrieve a specific parameter without much code
	 * Call: One_And_One_Config::get()
	 *
	 * @param  string $param
	 * @param  string $section
	 * @return string
	 */
	public static function get( $param, $section = null ) {
		return self::get_instance()->get_param( $param, $section );
	}

	/**
	 * Singleton wrapper function for feature
	 * Call: One_And_One_Config::get()
	 *
	 * @param  string $param
	 * @return boolean
	 */
	public static function feature( $param ) {
		return (bool) self::get_instance()->get_param( $param, 'features' );
	}

	/**
	 * Setup the config file(s) directory path
	 *
	 * @param string $dir
	 */
	public static function set_dir( $config_dir ) {
		self::$dir = $config_dir;
	}

	/**
	 * Retrieve a specific parameter
	 *
	 * @param  string $param
	 * @param  string $section
	 * @return string
	 */
	public function get_param( $param, $section = null ) {

		if ( ! empty( $section ) && array_key_exists( $section, $this->config ) ) {
			$config = $this->config[ $section ];
		} else {
			$config = $this->config;
		}
		if ( is_array( $config ) && array_key_exists( $param, $config ) ) {
			return $config[ $param ];
		}
		return null;
	}

	/**
	 * Parse the configuration file(s), only the main one at the moment
	 * @todo implement a method to be able to handle several configurations and merge them
	 */
	private function parse_ini_params() {
		$file_name = self::$dir . 'main.ini';

		if ( is_file( $file_name ) ) {
			$this->config = parse_ini_file( $file_name, true );
		}
	}

	/**
	 * Configuration can be overwritten by a cookie with single parameter change
	 * Each cookie name must be prefixed with "1and1-wp-assistant-config-" to work
	 */
	private function inject_cookie_params() {

		if ( array_key_exists( 'features', $this->config ) && is_array( $this->config[ 'features' ] ) ) {
			foreach ( $this->config[ 'features' ] as $param => $value ) {

				if ( isset( $_COOKIE[ '1and1-wp-assistant-config-' . $param ] ) ) {
					$this->config[ 'features' ][ $param ] = filter_var( $_COOKIE[ '1and1-wp-assistant-config-' . $param ], FILTER_SANITIZE_STRING );
				}
			}
		}
	}
}