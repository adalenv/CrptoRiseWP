(function( $ ) {

    /*
     * Input styling
     */
    $( 'input' ).each( function() {
        var placeholder = '';
        var id = $( this ).attr( 'id' );

        if (id) {
            switch ( $( this ).attr( 'type' )) {

                /*
                 * Input text HTML example:
                 *
                 * <div class="input">
                 *     <input type="text" placeholder="[label]">
                 *     <div class="underline"></div>
                 * </div>
                 */
                case 'text':
                case 'password':

                    // Question: does the label CONTAINS the input?
                    if ( $( this ).parent().is( 'label[for=' + id + ']' ) ) {

                        // Save the label text for the placeholder
                        placeholder = $.trim( $( this ).parent().text() );

                        // Remove the label text
                        $( this ).parent().contents().filter( function() {
                            return ( ! $( this ).is( 'input' ) );
                        } ).remove();

                        // Remove the label container
                        $( this ).unwrap();

                    // Question: does the label PRECEDES or FOLLOWS the input?
                    } else {
                        var label;

                        // Retrieve the label element (is it before or after?)
                        if ( $( this ).prev().is( 'label[for=' + id + ']' ) ) {
                            label = $( this ).prev();
                        } else if ( $( this ).next().is( 'label[for=' + id + ']' ) ) {
                            label = $( this ).next();
                        }

                        // Save the label text for the placeholder
                        placeholder = label.text();

                        // Remove the label element
                        label.remove();
                    }

                    // Wrap the result in our custom HTML + add placeholder
                    $( this ).wrap( '<div class="input"></div>' )
                        .after( '<div class="underline"></div>' )
                        .attr( 'placeholder', placeholder )
                        .val( '' );
                    break;

                /*
                 * Input checkbox HTML example:
                 *
                 * <div class="checkboxes">
                 *     <div class="item">
                 *         <input type="checkbox" />
                 *         <label class="label">[label]</label>
                 *     </div>
                 *     <div class="item">
                 *         <label>
                 *             <input type="checkbox" />
                 *             <span class="label">[label]</span>
                 *         </label>
                 *     </div>
                 * </div>
                 */
                case 'checkbox':

                    // Question: does the label CONTAINS the input?
                    if ( $( this ).parent().is( 'label' ) ) {

                        // Wrap the label text in a span with the "label" class
                        $( this ).parent().contents().filter( function() {
                            return this.nodeType === 3;
                        } ).wrap( '<span class="label"></span>' );

                        // Wrap label + input in the extra containers
                        $( this ).parent()
                            .wrap( '<div class="item"></div>' ).parent()
                            .wrap( '<div class="checkboxes"></div>' );
                    }

                    // Question: does the label FOLLOWS the input?
                    if ( $( this ).next().is( 'label' ) ) {

                        // Add the "label" class to the label
                        $( this ).next().addClass( 'label' );

                        // Wrap label + input in the extra containers
                        $( this ).add( $( this ).next() )
                            .wrapAll( '<div class="item"></div>' ).parent()
                            .wrap( '<div class="checkboxes"></div>' );
                    }
                    break;
            }
        }
    });

    /**
     * @function Show HTML error
     *
     * @param input          jQuery Object
     * @param error_message  String
     */
    function addInputError( input, error_message ) {
        var message = $( '<div class="message"></div>' );
        message.html( error_message );

        input.parent( '.input' )
            .addClass( 'error' )
            .after( message );
    }

    /**
     * @function Remove HTML errors
     *
     * @param form  jQuery Object
     */
    function clearInputErrors( form ) {
        form.find( '.error' ).removeClass( 'error' );
        form.find( '.message' ).remove();
    }

    /*
     * Input AJAX error handling
     */
    $( 'form#loginform' ).on( 'submit', function() {
        var url = ajax_login_object.ajaxurl;
        var data = $( this ).serialize() + '&action=ajaxlogin';

        $.ajax( {
            type: 'POST',
            dataType: 'json',
            url: url,
            data: data,

            success: function( response ) {
                clearInputErrors( $( this ) );

                if ( response.success ) {
                    window.location = response.data.referer;

                } else {
                    var originElement = $( '[name=' + response.data.origin + ']' );

                    if ( originElement.length ) {
                        addInputError( originElement, response.data.message );
                    } else {
                        addInputError( $( '#user_login' ), response.data.message );
                    }
                }
            }
        } );
    });
    $( '#wp-ajax-login' ).click( function( event ) {
        event.preventDefault();
        $( 'form#loginform' ).submit();
    } );

    /*
     * Card animation on loading
     */
    var card = $( '.card.card-login' );

    card.css( {
        transform: 'rotateX(5deg) rotateY(5deg) rotateZ(0deg) scale(.91)'
    } ).addClass( 'morphing-first' );

    setTimeout(function () {
        card.removeClass('morphing-first').css( {
            transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(1)'
        } );
    }, 600);

})( jQuery );