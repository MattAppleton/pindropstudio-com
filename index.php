<?php
get_header();
?>

<main id="main-content">
  <section id="posts" class="container">
    <div id="shuffle-preloader"></div>
    <div id="shuffle-container" class="grid-row hidden">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
?>
        <article <?php post_class('shuffle-item item-s-12 item-m-6 item-l-4'); ?> id="post-<?php the_ID(); ?>">
          <div class="card">
            <?php the_post_thumbnail('l-4', array('class' => 'margin-bottom-tiny')); ?>

            <h4 class="font-style-micro font-size-small margin-bottom-small text-align-center"><?php the_time('d F Y'); ?></h4>
            <h3 class="margin-bottom-small text-align-center"><?php the_title(); ?></h3>

            <?php the_excerpt(); ?>
          </div>
        </article>

<?php
  }
} else {
?>
        <article class="u-alert grid-item item-s-12"><?php _e('Sorry, no posts matched your criteria :{'); ?></article>
<?php
} ?>

    </div>
  </section>

  <?php get_template_part('partials/pagination'); ?>

</main>

<?php
get_footer();
?>