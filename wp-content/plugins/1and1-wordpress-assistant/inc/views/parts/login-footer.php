		</div>

		<div class="card-footer">
			<?php $action = isset( $_REQUEST['action'] ) ? $_REQUEST['action'] : 'login'; ?>

			<?php
			switch ( $action ) {
				case 'login':
			?>

			<a href="<?php echo esc_url( wp_lostpassword_url() ); ?>" class="btn btn-secondary float-left">
				<?php esc_html_e( 'Lost your password?' ); ?>
			</a>

			<a href="#" id="wp-ajax-login" class="btn">
				<?php esc_html_e( 'Log In' ); ?>
			</a>

			<?php
				break;

			default:
				break;
			}
			?>
		</div>
	</div>
</section>