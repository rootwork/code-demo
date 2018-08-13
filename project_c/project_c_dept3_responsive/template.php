<?php
/**
 * @file
 * Functions specific to the responsive department three theme.
 */

/**
 * Theme individual slides.
 *
 * This implementation displays the slides as multiple images, alternately
 * hidden by CSS media queries. This should be replaced by the <picture>
 * element when a) all PROJECT_C-required browsers support it (looking at you, IE
 * 11) and 2) a new slideshow library (instead of cycle.js) is chosen.
 *
 * @see theme_project_c_slide() in `project_c_homepage_slides.module`
 */
function project_c_dept3_responsive_project_c_slide($variables) {
  // Create new variables arrays for the calls to theme('image_formatter')
  // below. Use the medium image by default (mobile first).
 $image_medium_vars = array(
   'item' => $variables['slide']['image']['#item'],
   'image_style' => 'homepage_slide_medium_rwd',
 );
 $image_small_vars = array(
   'item' => $variables['slide']['image']['#item'],
   'image_style' => 'homepage_slide_small_rwd',
 );

  // Add classes to the two images so they can be accessed with media queries.
  $image_medium_vars['item']['attributes']['class'] = array('slide-img-medium');
  $image_small_vars['item']['attributes']['class'] = array('slide-img-small');

  $output = '';
  $output .= '<p class="slide__caption">' . render($variables['slide']['caption']) . '</p>';
  $output .= theme('image_formatter', $image_medium_vars);
  $output .= theme('image_formatter', $image_small_vars);

  return '<div class="slide">' . $output . '</div>';
}

/**
 * Implements hook_page_alter().
 *
 * On the front page, move the content bottom blocks from the main page area
 * to the first sidebar region. Why not just put these blocks in the left
 * sidebar blocks field? Because they render differently in those regions, and
 * we want them to appear as if they were in the content area, but we don't
 * want them to appear in the area next to the slides.
 */
function project_c_dept3_responsive_page_alter(&$page) {
  if (drupal_is_front_page() && isset($page['content']['system_main']['nodes'])) {
    $node = current($page['content']['system_main']['nodes']);

    // Create the first sidebar render array if it's missing. This would happen
    // if there were no blocks in the first sidebar field.
    if (!isset($page['sidebar_first'])) {
      $page['sidebar_first'] = array(
        '#theme_wrappers' => array('region'),
        '#region' => 'sidebar_first',
      );
    }

    // Put the content bottom blocks in the first sidebar.
    $page['sidebar_first'][] = array(
      'project_c_front_content_blocks' => $page['content']['system_main']['nodes'][$node['#node']->nid]['field_content_bottom_blocks'],
      '#weight' => -1
    );

    // Hide the content bottom blocks from the main node.
    hide($page['content']['system_main']['nodes'][$node['#node']->nid]['field_content_bottom_blocks']);

    // Remove featured news briefs from news listings in the second sidebar
    // (front page only). They should not appear there, and hiding them with
    // CSS messes with odd/even selectors.
    // Not proud of the need to use a regular expression here, but
    // blockreference generates markup strings and there is nowhere else in the
    // render process where we can be sure to only target front page blocks.
    foreach ($page['sidebar_second'] as $key => $render_element) {
      // This just ensures that we search through block reference fields.
      if (!isset($render_element['#field_name']) || $render_element['#field_name'] !== 'field_second_sidebar_blocks') {
        continue;
      }

      // Find any article elements with the news--featured class. Most likely.
      if (preg_match('/(<article.*news--featured).*?<\/article>/s', $render_element['#markup'], $matches)) {
        $page['sidebar_second'][$key]['#markup'] = str_replace($matches[0], '', $render_element['#markup']);
      }
    }
  }
}

/**
 * Implements hook_preprocess_hook()
 */
function project_c_dept3_responsive_preprocess_field(&$variables) {
  if ($variables['element']['#field_name'] == 'field_header_image') {
    $variables['items'][0]['#image_style'] = 'header_image_rwd';
  }
}
