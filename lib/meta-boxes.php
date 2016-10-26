<?php

/* Get post objects for select field options */
function get_post_objects( $query_args ) {
$args = wp_parse_args( $query_args, array(
    'post_type' => 'post',
) );
$posts = get_posts( $args );
$post_options = array();
if ( $posts ) {
    foreach ( $posts as $post ) {
        $post_options [ $post->ID ] = $post->post_title;
    }
}
return $post_options;
}


/**
 * Include and setup custom metaboxes and fields.
 *
 * @category YourThemeOrPlugin
 * @package  Metaboxes
 * @license  http://www.opensource.org/licenses/gpl-license.php GPL v2.0 (or later)
 * @link     https://github.com/WebDevStudios/CMB2
 */

/**
 * Hook in and add metaboxes. Can only happen on the 'cmb2_init' hook.
 */
add_action( 'cmb2_init', 'igv_cmb_metaboxes' );
function igv_cmb_metaboxes() {

  // Start with an underscore to hide fields from custom fields list
  $prefix = '_igv_';

  /**
   * Metaboxes declarations here
   * Reference: https://github.com/WebDevStudios/CMB2/blob/master/example-functions.php
   */

   $luminary_meta = new_cmb2_box( array(
    'id'            => $prefix . 'luminary_meta',
    'title'         => esc_html__( 'Luminary Metabox', 'cmb2' ),
    'object_types'  => array( 'luminaries', ), // Post type
  ) );

  $luminary_meta->add_field( array(
    'name'       => esc_html__( 'Related posts', 'cmb2' ),
    'desc'       => esc_html__( 'select multiple other posts here to display as related posts', 'cmb2' ),
    'id'         => $prefix . 'related_posts',
    'type'       => 'post_search_text',
    'post_type'  => array('post', 'page', 'luminaries'),
  ) );

}
?>
