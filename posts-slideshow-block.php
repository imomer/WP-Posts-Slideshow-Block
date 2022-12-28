<?php

/**
 * Plugin Name: Posts Slideshow Block
 * Description: Custom gutenberg posts slideshow block for rtCamp assignment.
 * Author: Omer Hussain
 * Author URI: https://imomer.com
 */

/**
 * Assets
 */
function posts_slideshow_block_assets()
{
  // CSS
  wp_enqueue_style('posts-slideshow-block-style', plugin_dir_url(__FILE__) . 'assets/css/psb-style.css', [], true);

  // JS
  wp_enqueue_script('posts-slideshow-block-js', plugin_dir_url(__FILE__) . 'assets/js/psb-script.js', ['wp-blocks', 'wp-element', 'wp-editor'], true);

  // If not in admin
  if (!is_admin()) {
    wp_enqueue_script('posts-slideshow-block-slider-js', plugin_dir_url(__FILE__) . 'assets/js/psb-slider.js', [], true, true);
  }
}
add_action('enqueue_block_assets', 'posts_slideshow_block_assets');

/**
 * Dynamic Block Render
 */
function psb_dynamic_block_render_callback($attributes)
{

  // Vars
  $remotePosts = $attributes['remotePosts'];
  $hidePostThumb = $attributes['hidePostThumb'];
  $hidePostDate = $attributes['hidePostDate'];
  $hidePostExcerpt = $attributes['hidePostExcerpt'];
  $perSlide = $attributes['perSlide'];

  // Output
  ob_start();
  if (isset($remotePosts) && count($remotePosts) > 0) {

    echo '<style>.psb__slide{flex: 0 0 calc(100% / ' . (isset($perSlide) ? $perSlide : 2) . ')}</style>';

    echo '<div id="psb__wrapper">';
    echo '<div class="psb__slider">';

    // Post loop
    foreach ($remotePosts as $remotePost) {

      echo '<div class="psb__slide">';

      if (!isset($hidePostThumb) || $hidePostThumb == '') {
        echo '<div class="psb__post-thumb" style="background-image: url(' . $remotePost['episode_featured_image'] . ')"></div>';
      }

      echo '<h6 class="psd__post-title"><a href="' . $remotePost['link'] . '" target="_blank">' . $remotePost['title']['rendered'] . '</a></h6>';

      if (!isset($hidePostDate) || $hidePostDate == '') {
        echo '<div class="psb__post-date">' . date('F j, Y', strtotime($remotePost['date'])) . '</div>';
      }

      if (!isset($hidePostExcerpt) || $hidePostExcerpt == '') {
        echo '<div class="psb__post-excerpt">' . $remotePost['excerpt']['rendered'] . '</div>';
      }

      echo '</div>';
    }

    echo '</div>';
    echo '<div class="psb__controls">
      <span id="psb_prev" class="psb__control">
        <img src="' . plugin_dir_url(__FILE__) . '/assets/images/icon-prev.svg" alt="Previous" />
      </span>
      <span id="psb_next" class="psb__control">
        <img src="' . plugin_dir_url(__FILE__) . '/assets/images/icon-next.svg" alt="Next" />
      </span>
    </div>';
    echo '</div>';
  }

  return ob_get_clean();
}

/**
 * Dynamic Block
 */
function psb_dynamic_block()
{
  register_block_type('psb/posts-slideshow-block', array(
    'render_callback' => 'psb_dynamic_block_render_callback'
  ));
}
add_action('init', 'psb_dynamic_block');