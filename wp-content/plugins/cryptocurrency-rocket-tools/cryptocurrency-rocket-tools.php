<?php
/**
 * @package Cryptocurrency Rocket Tools
 */
/*
Plugin Name: Cryptocurrency Rocket Tools
Description: CR Tools is an easy-to-use plugin providing features: table of current cryptocurrency prices, graph of historical cryptocurrency prices and cryptocurrency converter.
Version: 1.2
Author: Webstulle
Author URI: http://webstulle.com/
License: GPL2 or later
*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

// Define plugin url global
define('CRTOOLS_URL', plugin_dir_url( __FILE__ ));
define('CC_API_URL', 'https://www.cryptocompare.com/api/data');

// Add admin menu
require_once(dirname(__FILE__) . '/includes/admin.php');
add_action( 'init', array( 'CRToolsAdmin', 'init' ) );

require_once(dirname(__FILE__) . '/includes/shortcodes.php');

function crtools() {

    wp_enqueue_script( 'jquery');

    wp_enqueue_script( 'crtools', CRTOOLS_URL.'assets/js/crtools.min.js');

    wp_enqueue_style( 'crtools-css', CRTOOLS_URL.'assets/css/main.css');
}
add_action( 'wp_enqueue_scripts', 'crtools' );

// Define suported shortcodes
add_shortcode( 'crtools-table', 'crtools_table_shortcode' );
add_shortcode( 'crtools-converter', 'crtools_converter_shortcode' );
add_shortcode( 'crtools-graph', 'crtools_graph_shortcode' );

// Add custom CSS
add_action('wp_head', 'crtools_get_custom_css', 1000);

// Define ajaxurl variable
add_action('wp_head', 'crtools_ajaxurl');

function crtools_ajaxurl()
{
    echo '<script type="text/javascript">
           var ajaxurl = "' . admin_url('admin-ajax.php') . '";
         </script>';
}

// Define ajax function
add_action( 'wp_ajax_get_coin_list', 'get_coin_list_callback' );
add_action( 'wp_ajax_nopriv_get_coin_list', 'get_coin_list_callback' );

function get_coin_list_callback()
{

    header('Access-Control-Allow-Origin: *');
    echo file_get_contents(CC_API_URL . '/coinlist/');

    wp_die();
}

// Define ajax function
add_action( 'wp_ajax_get_start_date', 'get_start_date_callback' );
add_action( 'wp_ajax_nopriv_get_start_date', 'get_start_date_callback' );

function get_start_date_callback()
{
    $return = array(
        'Response' => 'Error',
        'Message' => '',
        'Date' => '',
    );

    if($_GET['coin'] != ''){

        $response =  json_decode(file_get_contents(CC_API_URL.'/coinlist/'));

        if($response->Response == 'Success')
        {
            $coinID = get_object_vars($response->Data)[$_GET['coin']]->Id;

            $response =  json_decode(file_get_contents(CC_API_URL . '/coinsnapshotfullbyid/?id=' . $coinID));

            if($response->Response == 'Success')
            {
                $date = $response->Data->General->StartDate;

                $return = array(
                    'Response' => 'Success',
                    'Message' => $response->Message,
                    'Date' => $date,
                );

            }
            else
                $return = array(
                    'Response' => 'Error',
                    'Message' => $response->Message,
                    'Date' => '',
                );
        }
        else
            $return = array(
                'Response' => 'Error',
                'Message' => $response->Message,
                'Date' => '',
            );
    }
    else
        $return = array(
            'Response' => 'Error',
            'Message' => 'Missing coin parameter',
            'Date' => '',
        );

    echo json_encode($return, JSON_UNESCAPED_SLASHES);

    wp_die();
}

