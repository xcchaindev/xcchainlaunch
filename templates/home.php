<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" >
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <title><?php echo wp_get_document_title(); ?></title>
    <?php
      if (function_exists( 'wp_robots_sensitive_page' )) {
        // wp_robots_sensitive_page(); // @To-Do need params
      } else {
        wp_sensitive_page_meta();
      }
    ?>
    <style type="text/css">
      HTML, BODY {
        margin: 0;
        padding: 0;
      }
    </style>
    <script type="text/javascript">
      window.SO_LAUNCHPAD_ROOT = "<?php echo ONOUT_LPWP_URL ?>/";
    </script>
    <script src="https://unpkg.com/react/umd/react.production.min.js" integrity="sha256-S0lp+k7zWUMk2ixteM6HZvu8L9Eh//OVrt+ZfbCpmgY=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" integrity="sha256-IXWO0ITNDjfnNXIu5POVfqlgYoop36bDzhodR6LW5Pc=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" integrity="sha256-FQUj4FWIUqeZquRw7hj9th+JzyYO5tqO/YaHYhFWrjM=" crossorigin="anonymous"></script>
    <script defer="defer" src="<?php echo ONOUT_LPWP_URL ?>wordpress_vendor/static/js/main.js"></script>
    <link href="<?php echo ONOUT_LPWP_URL ?>wordpress_vendor/static/css/main.css" rel="stylesheet">
    <?php
    if (isset($lottery_data['custom_html_before_head_close'])) {
      echo wp_specialchars_decode( $lottery_data[ 'custom_html_before_head_close' ], ENT_QUOTES );
    }
    ?>
</head>
<body <?php body_class() ?>>
<noscript>You need to enable JavaScript to run this app.</noscript>
<div id="root"></div>
<?php wp_footer(); ?>
</body>
</html>