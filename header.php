<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package mtsitetheme
 */

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

	<meta name="google-site-verification" content="PzmCEwv-4sc030hGBAG6NQYrI2W1AqjbXl0PuA5cRLE" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

	<meta name="description" content="Molly Tenenbaum, poet and old-time banjo player in Seattle, is the author of NOW and BY A THREAD. Her CDs are INSTEAD OF A PONY and GOOSE AND GANDER.
">
    <meta name="keywords" content="molly tenenbaum, poetry, old-time banjo, frailing, clawhammer, verse, poems, teacher, banjo lessons, music lessons, poetry workshops, recordings, bookings, weddings, gigs, teaching, books, chapbook, old-time music, square dance,  string band, fiddle,"  />
    <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
    <link rel="shortcut icon" href="/favicon.ico" />



<!-- css from old site -->
<link type="text/css" rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/CSS/reset.css" media="screen" />
<link type="text/css" rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/CSS/base.css" media="screen" />
<link type="text/css" rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/CSS/main.css" media="screen" />
<link type="text/css" rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/CSS/highslide.css" />    <!-- For modal windows / galleries  -->

<!-- -->

<?php
/* The presence/absence of the following line
 * affects the layout of the site.
 */  ?>
<link type="text/css" rel="stylesheet" href="<?php echo esc_url( get_template_directory_uri() ); ?>/layouts/sidebar-content.css" media="screen" />


<!-- scripts from old site -->

<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/scripts/mootools.js"     type="text/javascript"></script>
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/scripts/highslide.js"    type="text/javascript"></script>   <!-- For modal windows / galleries  -->
<script src="<?php echo esc_url( get_template_directory_uri() ); ?>/scripts/main.js"         type="text/javascript"></script>
<script type="text/javascript">/* <![CDATA[ */ houseKeeping(); /* ]]> */</script>
<script type="text/javascript" src="<?php echo esc_url( get_template_directory_uri() ); ?>/scripts/arc90_imgcaption.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.1.0.min.js"></script>



<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="profile" href="http://gmpg.org/xfn/11">

<?php wp_head(); ?>
</head>

<body id="home" <?php body_class(); ?>>
<div id="page" class="site">

	<header id="masthead" class="site-header" role="banner">
		<div class="site-branding">

			$description = get_bloginfo( 'description', 'display' );
			if ( $description || is_customize_preview() ) : ?>
				<p class="site-description"><?php echo $description; /* WPCS: xss ok. */ ?></p>
			<?php
			endif; ?>
		</div><!-- .site-branding -->

		<nav id="site-navigation" class="main-navigation" role="navigation">
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->

	<div id="content" class="site-content">
