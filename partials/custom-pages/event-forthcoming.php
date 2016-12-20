<?php
  global $post_count;

  $booking = get_post_meta($post->ID, '_igv_event_booking_url', true);
  $soldout = get_post_meta($post->ID, '_igv_soldout', true);
  $time = get_post_meta($post->ID, '_igv_event_datetime', true);
  $time_moment = new \Moment\Moment('@' . $time);
?>
<div class="grid-item <?php
  if ($post_count === 3) {
    echo 'item-s-4 item-m-4';
  } else if ($post_count === 2) {
    echo 'item-s-6 item-m-5';
  } else {
    echo 'item-s-12';
  }
?> text-align-center">
  <div class="card card-big">
    <a href="<?php the_permalink(); ?>">
      <?php
        if ($post_count === 1) {
          the_post_thumbnail('l-5-square');
        } else {
          the_post_thumbnail('l-4-square');
        }
      ?>
      <h2 class="margin-top-small margin-bottom-small item-s-6 item-m-5"><?php the_title(); ?></h2>
      <h4 class="margin-bottom-tiny font-style-micro"><?php echo $time_moment->format('H:i'); ?> | <?php echo $time_moment->format('l'); ?></h4>
      <h1 class="font-size-big-number margin-bottom-tiny"><?php echo $time_moment->format('d'); ?></h1>
      <h4 class="font-style-micro"><?php echo $time_moment->format('F'); ?></h4>
    </a>
      <div class="margin-top-basic text-align-center">
    <?php
      if ($soldout) {
    ?>
        <span class="link-button font-style-micro">Fully Booked</span>
    <?php
      } else if ($booking) {
    ?>
        <a href="<?php echo $booking; ?>" class="link-button font-style-micro" target="_blank" rel="noopener">Booking Now</a>
    <?php
      }
    ?>
        <a href="<?php the_permalink(); ?>" class="link-button font-style-micro">Read More</a>
      </div>
  </div>
</div>