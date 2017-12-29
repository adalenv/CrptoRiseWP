<?php

/*----------------------------------------------
    Plugin Settings
-----------------------------------------------*/

// Exit if accessed directly
if( !defined( 'ABSPATH' ) ) {
	exit;
}

?>

<div class="wrap">
	<div class="verify-ownership">

		<h2 class="vo-icon"><?php echo esc_html( get_admin_page_title() ); ?></h2>

		<div class="welcome-panel">
			<div class="welcome-panel-content">

				<form method="POST" action="options.php">
					<?php settings_fields( 'verify_ownership' );
					do_settings_sections( 'verify_ownership_options' );
					$options = get_option( 'verify_ownership_options' );
					?>

					<div class="welcome-panel-column-container">
						<div class="welcome-panel-column">

							<h4><?php _e( 'Webmaster Verification', 'verify-ownership' ); ?></h4>

							<p>
								<label><?php _e( 'Google Verification ID', 'verify-ownership' ) ?></label>
								<input id="<?php echo esc_attr( 'verify_ownership_options[google_verify]' ); ?>" class="regular-text" type="text" name="<?php echo esc_attr(
								'verify_ownership_options[google_verify]' ); ?>" value="<?php echo ( !empty( $options['google_verify'] ) ) ? esc_html( $options['google_verify'] ) : ''; ?>"/>
							</p>

							<p>
								<label><?php _e( 'Bing Verification ID', 'verify-ownership' ) ?></label>
								<input id="<?php echo esc_attr( 'verify_ownership_options[bing_verify]' ); ?>" class="regular-text" type="text" name="<?php echo esc_attr(
								'verify_ownership_options[bing_verify]' ); ?>" value="<?php echo ( !empty( $options['bing_verify'] ) ) ? esc_html( $options['bing_verify'] ) : ''; ?>"/>

							</p>

							<p>
								<label><?php _e( 'Yahoo Verification ID', 'verify-ownership' ) ?></label>
								<input id="<?php echo esc_attr( 'verify_ownership_options[yahoo_verify]' ); ?>" class="regular-text" type="text" name="<?php echo esc_attr(
								'verify_ownership_options[yahoo_verify]' ); ?>" value="<?php echo ( !empty( $options['yahoo_verify'] ) ) ? esc_html( $options['yahoo_verify'] ) : ''; ?>"/>
							</p>


							<p>
								<label><?php _e( 'Alexa Verification ID', 'verify-ownership' ) ?></label>
								<input id="<?php echo esc_attr( 'verify_ownership_options[alexa_verify]' ); ?>" class="regular-text" type="text" name="<?php echo esc_attr(
								'verify_ownership_options[alexa_verify]' ); ?>" value="<?php echo ( !empty( $options['alexa_verify'] ) ) ? esc_html( $options['alexa_verify'] ) : ''; ?>"/>
							</p>


							<p>
								<label><?php _e( 'Pinterest Verification ID', 'verify-ownership' ) ?></label>
								<input id="<?php echo esc_attr( 'verify_ownership_options[pinterest_verify]' ); ?>" class="regular-text" type="text" name="<?php echo esc_attr(
								'verify_ownership_options[pinterest_verify]' ); ?>" value="<?php echo ( !empty( $options['pinterest_verify'] ) ) ? esc_html( $options['pinterest_verify'] ) : ''; ?>"/>
							</p>

							<p>
								<label><?php _e( 'Norton Safe Web meta tag', 'verify-ownership' ) ?></label>
								<input id="<?php echo esc_attr( 'verify_ownership_options[norton_meta_tag_verify]' ); ?>" class="regular-text" type="text" name="<?php echo esc_attr(
								'verify_ownership_options[norton_meta_tag_verify]' ); ?>" value="<?php echo ( !empty( $options['norton_meta_tag_verify'] ) ) ? esc_html( $options['norton_meta_tag_verify'] ) : ''; ?>"/>
							</p>

							<label class="description">*<?php _e( 'Please enter IDs only!', 'verify-ownership' ); ?></label>

						</div>

						<div class="welcome-panel-column  welcome-panel-last">

							<p>
								<h4><?php _e( 'Site Statistics Tracker', 'verify-ownership' ); ?></h4>
								<label><?php _e( 'Google Analytics, StatCounter or any other statistics service', 'verify-ownership' ) ?></label>
								<textarea id="<?php echo esc_attr( 'verify_ownership_options[statistics_tracker]' ); ?>" class="large-text" cols="50" rows="15" name="<?php echo esc_attr( 'verify_ownership_options[statistics_tracker]' ); ?>"><?php echo ( !empty( $options['statistics_tracker'] ) ) ? esc_html( $options['statistics_tracker'] ) : ''; ?></textarea>
								<label class="description" for="<?php echo esc_attr( 'verify_ownership_options[statistics_tracker]' ); ?>">
									<?php _e( '*You can insert one or more statistic codes.', 'verify-ownership' ) ?>
								</label>
							</p>

						</div>
					</div>

					<?php submit_button(); ?>
				</form>

			</div>
		</div>

<div class="vo-title-div">
<div class="vo-title">
<?php _e( 'Instructions', 'verify-ownership' ); ?>
</div>
</div>

<div class="vo-box">

<div class="vo-box-legend">
<i class="vo-icon-help"></i>
</div>

<p class="description"><?php _e( 'In all verification fields above, you must enter only the IDs, not the entire code provided. For example, from the below code you should copy only the highlighted text:', 'verify-ownership' ); ?></p>
<strong><p>&#60;meta name="google-site-verification" content="<code>J4oGfkFxbQGrYEBcyK8MgfRTRBVZu_39HfOMSSr7kEE</code></span>" /></p></strong>

</div>

<div class="vo-title-div">
<div class="vo-title">
<?php _e( 'Version Information', 'verify-ownership' ); ?>
</div>
</div>

<div class="vo-box">

<div class="vo-box-version">
<i class="vo-icon-version"></i>
</div>

<div class="vo-infos">
<?php _e( 'Installed Version:', 'verify-ownership' ); ?>
<span>
<?php echo VERIFY_OWNERSHIP_VERSION; ?>
</span>
</div>

<div class="vo-infos">
<?php _e( 'Released date:', 'verify-ownership' ); ?>
<span>
<?php echo VERIFY_OWNERSHIP_RELEASE_DATE; ?>
</span>
</div>

</div>


	</div>
</div>
