<?php
defined( 'ABSPATH' ) || exit;

spl_autoload_register( function ( $class ) {

  if ( strpos( $class, 'ONOUT_LPWP' ) !== false ) {
    require __DIR__ . '/../' . str_replace( [ '\\', 'ONOUT_LPWP' ], [ '/', 'App' ], $class ) . '.php';

  }
} );

foreach ( glob( __DIR__ . '/Controllers/*.php' ) as $file ) {
  $class = '\ONOUT_LPWP\Controllers\\' . basename( $file, '.php' );
  if ( class_exists( $class ) ) {
    $obj = new $class;
  }

}