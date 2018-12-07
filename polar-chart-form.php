<?php
/**
 * Create a polar chart that is controlled via form
 *
 * @link              http://innovatedentalmarketing.com
 * @since             1.0.0
 * @package           Innovate_Client
 *
 * @wordpress-plugin
 * Plugin Name:       Polar Chart Form
 * Plugin URI:        https://github.com/chasing6/polar-chart-form
 * Description:       Create a form driven polar chart.
 * Version:           0.1.0
 * Author:            Scott McCoy
 * Author URI:        https://github.com/chasing6/
 * Text Domain:       polar-chart-form
 * Domain Path:       /languages
 * GitHub Plugin URI: https://github.com/chasing6/polar-chart-form
 */

define('PCF_VERSION', '0.1.0');

class PolarChartForm {

  public function init(){
    add_shortcode('polar_chart', [$this, 'render_shortcode']);
    add_action( 'wp_enqueue_scripts', [$this, 'register_styles']);
    add_action( 'wp_enqueue_scripts', [$this, 'register_scripts']);
  }

  public function register_scripts(){
    wp_register_script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js');
    wp_register_script('polar-chart', plugin_dir_url(__FILE__) . 'assets/js/polar-chart.js', array('jquery', 'chartjs'), PCF_VERSION);

  }

  public function register_styles(){
    wp_register_style('polar-chart', plugin_dir_url(__File__) . 'assets/css/polar-chart-form.min.css', PCF_VERSION);
  }

  public function render_shortcode(){
    wp_enqueue_style('polar-chart');
    wp_enqueue_script('polar-chart');
    wp_enqueue_script('chartjs');
    $output = 'output';
    ob_start();
    include ('pcf-shortcode-template.php');
    $output = ob_get_clean();
    return $output;
  }

}

$control = new PolarChartForm();

$control->init();
