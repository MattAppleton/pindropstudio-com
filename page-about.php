<?php
get_header();
?>

<main id="main-content">

<?php
if( have_posts() ) {
  while( have_posts() ) {
    the_post();
  ?>
  <article id="page" <?php post_class('container'); ?>>
    <div class="grid-row margin-top-basic margin-bottom-basic">
      <?php render_divider('<span class="about-page-drawer-trigger" data-target="people">People</span> | <span class="about-page-drawer-trigger" data-target="partners">Partners</span> | <span class="about-page-drawer-trigger active" data-target="about">About</span>'); ?>
    </div>
    <div id="about-drawer-people" class="grid-row about-page-drawer">
      <div class="grid-item item-s-12 item-m-8 offset-m-2 margin-bottom-basic">
        // people
      </div>
    </div>
    <div id="about-drawer-partners" class="grid-row about-page-drawer">
      <div class="grid-item item-s-12 item-m-8 offset-m-2 margin-bottom-basic">
        // partners
      </div>
    </div>
    <div id="about-drawer-about" class="grid-row about-page-drawer active">
      <div class="grid-item item-s-12 item-m-8 offset-m-2 margin-bottom-basic">
        <?php the_content(); ?>
      </div>
    </div>

    <?php get_template_part('partials/connect'); ?>

  </article>
<?php
  }
} else {
?>
  <section id="page" class="container">
    <div class="grid-row">
      <article class="u-alert grid-item item-s-12"><?php _e('Sorry, no pages matched your criteria'); ?></article>
    </div>
  </section>
<?php
} ?>

</main>

<?php
get_footer();
?>