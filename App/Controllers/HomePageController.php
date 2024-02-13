<?php
namespace ONOUT_LPWP\Controllers;

use ONOUT_LPWP\Controller;


class HomePageController extends Controller {
  public function handle() {
    add_action( 'template_include', array( $this, 'template' ) );
  }

	public function template($template) {
    if ( ( is_front_page() || is_home() ) and ( get_option('onout_lpwp_as_homepage') == 'true') ) {

      return ONOUT_LPWP_TEMPLATE_DIR  .'/home.php';
    }

    return $template;
	}





}