<?php

/**
 * @file
 * Contains micro.page.inc.
 *
 * Page callback for Micro Content entities.
 */

use Drupal\Core\Render\Element;

/**
 * Prepares variables for Micro Content templates.
 *
 * Default template: micro.html.twig.
 *
 * @param array $variables
 *   An associative array containing:
 *   - elements: An associative array containing the user information and any
 *   - attributes: HTML attributes for the containing element.
 */
function template_preprocess_micro(array &$variables) {
  // Fetch Micro Entity Object.
  $micro = $variables['elements']['#micro'];

  // Helpful $content variable for templates.
  foreach (Element::children($variables['elements']) as $key) {
    $variables['content'][$key] = $variables['elements'][$key];
  }
}
