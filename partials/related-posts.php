<?php
  $related_posts = get_post_meta($post->ID, '_igv_related_posts', true);
  if ($related_posts) {
    $related_posts = explode(', ', $related_posts);
?>
<div class="grid-row">
<?php
    global $post;
    foreach($related_posts as $post_id) {
      $post = get_post($post_id);
      setup_postdata($post);
?>
  <div class="grid-item item-s-12 item-m-4 text-align-center">
    <a href="<?php the_permalink(); ?>">
      <?php the_post_thumbnail('post-thumbnail', array('class' => 'margin-bottom-tiny')); ?>
      <h3 class="margin-bottom-small"><?php the_title(); ?></h3>
    </a>
    <a class="link-button font-uppercase" href="<?php the_permalink(); ?>">Read More</a>
  </div>
<?php
    }
    wp_reset_postdata();
?>
</div>
<?php
  }
