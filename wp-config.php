<?php

define('FS_METHOD', 'direct');
//define('FORCE_SSL_ADMIN', false);


/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'db715562767' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', '' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '`q5$z.-+_i9L+{L<Vu#J_3v>{b@pN6Sz{Q8Pz+nKY4ElLtMTG<? ID8E@RGYZT|X');
define('SECURE_AUTH_KEY',  'KyH1>zv|,YRL[+MC:th2n;].Kiq5Y:RWK<SHjJ#H>fhP6Up;ME Zuhy~sVTQ:}[(');
define('LOGGED_IN_KEY',    'PBqiuofd}d3dkzZO%D=9KC:oQwOC.,nX_98y<%EfFZ7,XcFOH`>+ll,s/-+-^.kN');
define('NONCE_KEY',        'DMcNtyc+x2kx/OyRJdPN$^qZJUA`+o,}P^j0E+=anO}GGw0E7z9H|GUZ4_5P-s2 ');
define('AUTH_SALT',        'Zx;Y!iH5];f2/7DR]VRzCRi5#6pA:P28M</z%FhKjB8Rwm+uUNWZN+-fUd<xM9ig');
define('SECURE_AUTH_SALT', '`RET{8~xIE5~Zu j~yaL=oV4/-.pWMcG_]B_d4U`4%%2$$T<d>d.&:E5q+N={Bd<');
define('LOGGED_IN_SALT',   'IRw=oV]bm6<@c>_meb)7=DbW4Q7ax-$9.?D%:fkih@y$qGr.50Y&D@M@=/S[T==p');
define('NONCE_SALT',       'EagPA}Y*;h^FjEXqq6Miu^nokr l7@09|c}-=$M43aU )x=$q-egO<QNf)bd}>I{');


/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'bJNgMxwx';




/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
