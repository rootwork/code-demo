<?php
/**
 * @file
 * Responsive department base theme functions.
 */

/**
 * Implements hook_css_alter.
 */
function project_c_base_responsive_css_alter(&$css) {
  // Completely remove the base theme styles.
  unset($css['profiles/project_c/themes/project_c_base/styles/base_style.css']);

  // Disable some core css. Uncomment as necessary.
  // unset($css['modules/system/system.base.css']);
  // unset($css['modules/system/system.menus.css']);
  // unset($css['modules/system/system.theme.css']);
  unset($css['modules/system/system.messages.css']);
  unset($css['modules/field/theme/field.css']);
}

/**
 * Implements hook_theme_registry_alter().
 */
function project_c_base_responsive_theme_registry_alter(&$theme_registry) {
  if (isset($theme_registry['node'])) {
    // Disable the project_c_base theme node preprocess function, because it does
    // pretty crazy things to the content render array, especially for people
    // profiles.
    $project_c_base_preprocess_key = array_search('project_c_base_preprocess_node', $theme_registry['node']['preprocess functions']);
    if ($project_c_base_preprocess_key) {
      unset($theme_registry['node']['preprocess functions'][$project_c_base_preprocess_key]);
    }
  }
}

/**
 * Override or insert variables into the html template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered. This is usually "html", but can also be "maintenance_page" since project_c_base_responsive_preprocess_maintenance_page() calls this function to have consistent variables.
 */
function project_c_base_responsive_preprocess_html(&$variables, $hook) {

  // Add variables and paths needed for HTML5 and responsive support.
  $variables['base_path'] = base_path();

  // Attributes for html element.
  $variables['html_attributes_array'] = array(
    'lang' => $variables['language']->language,
    'dir' => $variables['language']->dir,
  );

  // Send X-UA-Compatible HTTP header to force IE to use the most recent
  // rendering engine.
  // This also prevents the IE compatibility mode button to appear when using
  // conditional classes on the html tag.
  if (is_null(drupal_get_http_header('X-UA-Compatible'))) {
    drupal_add_http_header('X-UA-Compatible', 'IE=edge');
  }

  // IE10 class for html element.
  $ie10_script = "
    if (Function('/*@cc_on return document.documentMode===10@*/') ()) {
      document.documentElement.className+=' ie10';
    }
  ";
  drupal_add_js($ie10_script, 'inline');

  // Return early, so the maintenance page does not call any of the code below.
  if ($hook != 'html') {
    return;
  }

  // Serialize RDF Namespaces into an RDFa 1.1 prefix attribute.
  if ($variables['rdf_namespaces']) {
    $prefixes = array();
    foreach (explode("\n  ", ltrim($variables['rdf_namespaces'])) as $namespace) {
      // Remove xlmns: and ending quote and fix prefix formatting.
      $prefixes[] = str_replace('="', ': ', substr($namespace, 6, -1));
    }
    $variables['rdf_namespaces'] = ' prefix="' . implode(' ', $prefixes) . '"';
  }

  // Classes for body element. Allows advanced theming based on context
  // (home page, node of certain type, etc.)
  if (!$variables['is_front']) {
    // Add unique class for each page.
    $path = drupal_get_path_alias($_GET['q']);
    // Add unique class for each website section.
    list($section, ) = explode('/', $path, 2);
    $arg = explode('/', $_GET['q']);
    if ($arg[0] == 'node' && isset($arg[1])) {
      if ($arg[1] == 'add') {
        $section = 'node-add';
      }
      elseif (isset($arg[2]) && is_numeric($arg[1]) && ($arg[2] == 'edit' || $arg[2] == 'delete')) {
        $section = 'node-' . $arg[2];
      }
    }
    $variables['classes_array'][] = drupal_html_class('section-' . $section);
  }
}

/**
 * Override or insert variables into the html templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("html" in this case.)
 */
function project_c_base_responsive_process_html(&$variables, $hook) {
  // Flatten out html_attributes.
  $variables['html_attributes'] = drupal_attributes($variables['html_attributes_array']);
}

/**
 * Override or insert variables in the html_tag theme function.
 */
function project_c_base_responsive_process_html_tag(&$variables) {
  $tag = &$variables['element'];

  if ($tag['#tag'] == 'style' || $tag['#tag'] == 'script') {
    // Remove redundant CDATA comments.
    unset($tag['#value_prefix'], $tag['#value_suffix']);

    // Remove redundant type attribute.
    if (isset($tag['#attributes']['type']) && $tag['#attributes']['type'] !== 'text/ng-template') {
      unset($tag['#attributes']['type']);
    }

    // Remove media="all" but leave others unaffected.
    if (isset($tag['#attributes']['media']) && $tag['#attributes']['media'] === 'all') {
      unset($tag['#attributes']['media']);
    }
  }
}

/**
 * Implement hook_html_head_alter().
 */
function project_c_base_responsive_html_head_alter(&$head) {
  // Simplify the meta tag for character encoding.
  if (isset($head['system_meta_content_type']['#attributes']['content'])) {
    $head['system_meta_content_type']['#attributes'] = array('charset' => str_replace('text/html; charset=', '', $head['system_meta_content_type']['#attributes']['content']));
  }
}

/**
 * Override or insert variables into the page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("page" in this case.)
 */
function project_c_base_responsive_preprocess_page(&$variables, $hook) {

  // Add content classes.
  $variables['content_class'] = 'main-content--full-content';
  if ($variables['layout'] === 'both') {
    $variables['content_class'] = 'main-content--both-content';
  }
  elseif ($variables['layout'] === 'second' && $variables['main_menu_active_level']) {
    $variables['content_class'] = 'main-content--both-content';
  }
  elseif ($variables['layout'] === 'first') {
    $variables['content_class'] = 'main-content--left-content';
  }
  elseif ($variables['main_menu_active_level']) {
    $variables['content_class'] = 'main-content--left-content';
  }
  elseif ($variables['layout'] === 'second') {
    $variables['content_class'] = 'main-content--right-content';
  }

  $variables['content_class'] = 'main-content ' . $variables['content_class'];

  $variables['sidebar_left_classes'] = 'sidebar sidebar--left';
  if (drupal_is_front_page()) {
    $variables['sidebar_left_classes'] = 'main-content--front';
  }

  $variables['logo_vector'] = base_path() . $variables['directory'] . '/src/logos/';
  $variables['logo_raster'] = base_path() . $variables['directory'] . '/';

  if (theme_get_setting('project_c_banner_logo_type') === 'project_c-project_c') {
    $variables['logo_vector'] .= 'logo--project_c.svg';
    $variables['logo_raster'] .= 'logo--project_c.png';
  }
  else {
    $variables['logo_vector'] .= 'logo.svg';
    $variables['logo_raster'] .= 'logo.png';
  }
}

/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
function project_c_base_responsive_preprocess_maintenance_page(&$variables, $hook) {
  project_c_base_responsive_preprocess_html($variables, $hook);
}

/**
 * Override or insert variables into the maintenance page template.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("maintenance_page" in this case.)
 */
function project_c_base_responsive_process_maintenance_page(&$variables, $hook) {
  project_c_base_responsive_process_html($variables, $hook);
  // Ensure default regions get a variable. Theme authors often forget to remove
  // a deleted region's variable in maintenance-page.tpl.
  foreach (array('header', 'navigation', 'highlighted', 'help', 'content', 'sidebar_first', 'sidebar_second', 'footer', 'bottom') as $region) {
    if (!isset($variables[$region])) {
      $variables[$region] = '';
    }
  }
}

/**
 * Implements hook_preprocess_entity().
 *
 * Adds back the 'content' class (removed in this theme's version of
 * bean.tpl.php) and adds classes to the bean content wrapper depending
 * on the bean type.
 */
function project_c_base_responsive_preprocess_entity(&$variables, $hook) {
  if ($variables['entity_type'] == 'bean') {
    $variables['content_attributes_array']['class'][] = 'content';

    if ($variables['bean']->type === 'project_c_news_tags') {
      $variables['content_attributes_array']['class'][] = 'news-listing';
    }

    if ($variables['bean']->type === 'event_block') {
      $variables['content_attributes_array']['class'][] = 'event-listing';
    }

    if ($variables['bean']->type === 'project_c_people_profile_tags') {
      $variables['content_attributes_array']['class'][] = 'people-profile-listing';
    }
  }
}

/**
 * Override or insert variables into the node templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("node" in this case.)
 */
function project_c_base_responsive_preprocess_node(&$variables, $hook) {
  // Add $unpublished variable.
  $variables['unpublished'] = (!$variables['status']) ? TRUE : FALSE;

  // Set preview variable to FALSE if it doesn't exist.
  $variables['preview'] = isset($variables['preview']) ? $variables['preview'] : FALSE;

  // Add pubdate to submitted variable.
  $variables['pubdate'] = '<time pubdate datetime="' . format_date($variables['node']->created, 'custom', 'c') . '">' . $variables['date'] . '</time>';
  if ($variables['display_submitted']) {
    $variables['submitted'] = t('Submitted by !username on !datetime', array('!username' => $variables['name'], '!datetime' => $variables['pubdate']));
  }

  // Add published and preview classes to nodes.
  if ($variables['unpublished']) {
    $variables['classes_array'][] = 'node--unpublished';
  }
  elseif ($variables['preview']) {
    $variables['classes_array'][] = 'node--preview';
  }

  // If the node is unpublished, add the "unpublished" watermark class.
  if ($variables['unpublished'] || $variables['preview']) {
    $variables['classes_array'][] = 'watermark__wrapper';
  }

  // Add a class for the view mode.
  if (!$variables['teaser']) {
    $variables['classes_array'][] = 'view-mode--' . $variables['view_mode'];
  }

  // Add a class to show node is authored by current user.
  if ($variables['uid'] && $variables['uid'] == $GLOBALS['user']->uid) {
    $variables['classes_array'][] = 'node-by-viewer';
  }

  // Optionally, run node-type-specific preprocess functions, like
  // project_c_base_responsive_preprocess_node_page() or
  // project_c_base_responsive_preprocess_node_project_c_news().
  $function = __FUNCTION__ . '_' . $variables['node']->type;
  if (function_exists($function)) {
    $function($variables, $hook);
  }
}

/**
 * Preprocess template variables for news callout nodes.
 *
 * @see project_c_base_responsive_preprocess_node()
 */
function project_c_base_responsive_preprocess_node_project_c_news(&$variables) {
  $variables['classes_array'][] = 'news';
  $variables['title_attributes_array']['class'][] = 'news__title';

  // When displayed in the `teaser_2` view mode, this node is a featured news
  // callout, and therefore should have the `news--featured` variant class.
  if ($variables['view_mode'] === 'teaser_2') {
    $variables['classes_array'][] = 'news--featured';

    // Nodes with the teaser_2 view mode can also be 'news--brief's if they
    // are part of a bean with the 'brief' variant (e.g. they are placed in)
    // the sidebar.
    if (isset($variables['project_c_news_variant']) && $variables['project_c_news_variant'] === 'brief') {
      $variables['classes_array'][] = 'news--brief';
    }
  }

  // When displayed in the `teaser_3` view mode, this node is displayed in
  // a sidebar, and therefore should have the `news--brief` variant class.
  // Follow the rabbit hole:
  // Project_cNewsTagsBean::view() checks the $bean->variant value, which is set in:
  // project_c_block_block_view_alter() which checks the $block->region value, which
  // is set in project_c_base_responsive_blockreference_formatter_default() for
  // blocks added to the page via one of the three blockreference fields.
  if ($variables['view_mode'] === 'teaser_3') {
    $variables['classes_array'][] = 'news--brief';
  }

  if (empty($variables['field_image'])) {
    $variables['classes_array'][] = 'news--no-image';
  }
}

/**
 * Preprocess template variables for people profile nodes.
 *
 * @see project_c_base_responsive_preprocess_node()
 */
function project_c_base_responsive_preprocess_node_project_c_people_profile(&$variables) {
  $variables['classes_array'][] = 'people-profile';
  $variables['title_attributes_array']['class'][] = 'people-profile__name';

  // When displayed in the `teaser` view mode, this node is a standard people
  // profile listing item, and should have the `people-profile--listing` class.
  if ($variables['view_mode'] === 'teaser') {
    $variables['classes_array'][] = 'people-profile--listing';
    $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__listing';
  }

  // When displayed in the `teaser_2` view mode, this node is a people
  // spotlight, and therefore should have the `people-profile--spotlight`
  // variant class.
  if ($variables['view_mode'] === 'teaser_2') {
    $variables['classes_array'][] = 'people-profile--spotlight';
    $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__spotlight';
  }

  // When displayed in the `teaser_3` view mode, this node is displayed in
  // a sidebar, and therefore should have the `people-profile--simple` variant class.
  if ($variables['view_mode'] === 'teaser_3') {
    $variables['classes_array'][] = 'people-profile--simple';
    $variables['theme_hook_suggestions'][] = 'node__' . $variables['type'] . '__simple';
  }

  if (empty($variables['field_people_profile_image'])) {
    $variables['classes_array'][] = 'people-profile--no-image';
  }
}

/**
 * Theme header image fields for all nodes.
 *
 * This output is extremely simplified since this field instance:
 * - has only one value ever (cardinality: 1)
 * - should never display the label (even if set to in the view mode)
 * - doesn't need a lot of wrapper divs
 *
 * This also overrides the image style from the default 'header_image' set
 * in the view mode to a wider one used for responsive themes.
 */
function project_c_base_responsive_field__field_header_image($variables) {
  $item = array_shift($variables['items']);
  $item['#item']['attributes']['class'][] = 'content__image';
  return drupal_render($item);
  return '<div class="content__image-wrapper">' . drupal_render($item) . '</div>';
}

/**
 * Theme blockreference fields.
 *
 * Simplify the markup by:
 * - Never displaying the field label.
 * - Removing some wrapper divs (while leaving just one wrapper for CSS identification).
 */
function project_c_base_responsive_field__blockreference($variables) {
  $output = '';

  foreach ($variables['items'] as $item) {
    $output .= drupal_render($item);
  }

  return '<div class="' . $variables['classes'] . '"' . $variables['attributes'] . '>' . $output . '</div>';
}

/**
 * Theme image fields for news callout nodes.
 *
 * This output is extremely simplified since this field instance:
 * - has only one value ever (cardinality: 1)
 * - should never display the label (even if set to in the view mode)
 * - doesn't need a lot of wrapper divs
 */
function project_c_base_responsive_field__field_image__project_c_news($variables) {
  $item = array_shift($variables['items']);
  $item['#path']['options']['attributes']['class'][] = 'news__image-link';
  $item['#item']['attributes']['class'][] = 'news__image';
  return '<div class="news__image-wrapper">' . drupal_render($item) . '</div>';
}

/**
 * Theme published date for news callout nodes.
 *
 * This output is extremely simplified since this field instance:
 * - has only one value ever (cardinality: 1)
 * - should never display the label (even if set to in the view mode)
 * - doesn't need a lot of wrapper divs
 */
function project_c_base_responsive_field__field_published_date__project_c_news($variables) {
  $item = array_shift($variables['items']);
  return '<div class="news__date">' . drupal_render($item) . '</div>';
}

/**
 * Theme body content for news callout nodes.
 *
 * This output is extremely simplified since this field instance:
 * - has only one value ever (cardinality: 1)
 * - should never display the label (even if set to in the view mode)
 * - doesn't need a lot of wrapper divs
 */
function project_c_base_responsive_field__field_body__project_c_news($variables) {
  $item = array_shift($variables['items']);
  return '<div class="news__body">' . drupal_render($item) . '</div>';
}

/**
 * Theme the featured news callout field for news tags beans.
 *
 * This output is extremely simplified since this field instance:
 * - has only one value ever (cardinality: 1)
 * - should never display the label (even if set to in the view mode)
 * - doesn't need a lot of wrapper divs
 */
function project_c_base_responsive_field__field_featured_news_callout($variables) {
  $item = array_shift($variables['items']);

  if (isset($variables['element']['#object']->variant)) {
    foreach ($item['node'] as $key => $node) {
      if (!is_numeric($key)) {
        continue;
      }
      $item['node'][$key]['#node']->project_c_news_variant = $variables['element']['#object']->variant;
    }
  }

  return drupal_render($item);
}

/**
 * Theme image fields for people profile nodes.
 *
 * This output is extremely simplified, like the news fields above.
 */
function project_c_base_responsive_field__field_people_profile_image__project_c_people_profile($variables) {
  $item = array_shift($variables['items']);
  $item['#path']['options']['attributes']['class'][] = 'people-profile__image-link';
  $item['#item']['attributes']['class'][] = 'people-profile__image';
  return '<div class="people-profile__image-wrapper">' . drupal_render($item) . '</div>';
}

/**
 * Theme work title fields for people profile nodes.
 *
 * This output is extremely simplified, as above.
 */
function project_c_base_responsive_field__field_people_work_title__project_c_people_profile($variables) {
  $item = array_shift($variables['items']);
  return drupal_render($item);
}

/**
 * Theme email fields for people profile nodes.
 *
 * This output is extremely simplified, as above.
 */
function project_c_base_responsive_field__field_people_email__project_c_people_profile($variables) {
  $item = array_shift($variables['items']);
  $output = '';

  // Render the label, if it's not hidden.
  if (!$variables['label_hidden']) {
    $output .= '<div class="people-profile__email-label">' . $variables['label'] . ': </div>';
  }

  // This field is just a text field, rather than an email field from the
  // email module. It's displayed with the default formatter, which has no
  // additional markup. Make it a mailto: link.
  $email = drupal_render($item);
  $output .= l($email, 'mailto:' . $email);
  return $output;
}

/**
 * Theme spotlight fields for people profile nodes.
 *
 * This output is extremely simplified, as above.
 */
function project_c_base_responsive_field__field_spotlight__project_c_people_profile($variables) {
  $item = array_shift($variables['items']);
  return drupal_render($item);
}

/**
 * Theme summary fields for people profile nodes.
 *
 * This output is extremely simplified, as above.
 */
function project_c_base_responsive_field__field_people_summary__project_c_people_profile($variables) {
  $item = array_shift($variables['items']);
  return drupal_render($item);
}

/**
 * Theme overview fields for people profile nodes, simplified.
 */
function project_c_base_responsive_field__field_people_overview__project_c_people_profile($variables) {
  $item = array_shift($variables['items']);
  return '<div class="people-profile__overview">' . drupal_render($item) . '</div>';
}

/**
 * Preprocess field template variables.
 */
function project_c_base_responsive_preprocess_field(&$variables) {
  $field_name = $variables['element']['#field_name'];

  if ($field_name === 'field_people_research_focus') {
    $variables['classes_array'][] = 'people-profile__research-focus';
  }
  else if ($field_name === 'field_people_outreach_focus') {
    $variables['classes_array'][] = 'people-profile__outreach-focus';
  }
  else if ($field_name === 'field_people_instruction_focus') {
    $variables['classes_array'][] = 'people-profile__instruction-focus';
  }
  else if ($field_name === 'field_people_additional_links') {
    $variables['classes_array'][] = 'people-profile__additional-links';
  }
  else if ($field_name === 'field_people_honors_and_awards') {
    $variables['classes_array'][] = 'people-profile__honors-and-awards';
  }
  else if ($field_name === 'field_people_honors_and_awards') {
    $variables['classes_array'][] = 'people-profile__honors-and-awards';
  }
  else if ($field_name === 'field_people_publications') {
    $variables['classes_array'][] = 'people-profile__publications';
  }
  else if ($field_name === 'field_people_prof_activities') {
    $variables['classes_array'][] = 'people-profile__professional-activities';
  }
  else if ($field_name === 'field_people_departments') {
    $variables['classes_array'][] = 'people-profile__departments';
  }
  else if ($field_name === 'field_people_concentrations') {
    $variables['classes_array'][] = 'people-profile__concentrations';
  }
  else if ($field_name === 'field_people_acadvise_graduate') {
    $variables['classes_array'][] = 'people-profile__acadvise-graduate';
  }
  else if ($field_name === 'field_people_education') {
    $variables['classes_array'][] = 'people-profile__education';
  }
}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function project_c_base_responsive_preprocess_block(&$variables, $hook) {
  // Add BEM-ish classes for all blocks.
  $variables['classes_array'][] = 'block--' . $variables['block']->region;
  if (drupal_is_front_page()) {
    $variables['classes_array'][] = 'block--front';
  }
  // Add BEM-ish classes specific to BEAN blocks.
  if ($variables['block']->module == 'bean') {
    $bean = bean_load_delta($variables['block']->delta);
    $bem_component_name = str_replace('_', '-', $bean->type);
    // TODO: add template suggestion and class for region the block is in.
    $bean_variant = !empty($bean->variant) ? $bean->variant : NULL;
    $variables['classes_array'][] = $bean_variant ? $bem_component_name . '--' . $bean->variant : $bem_component_name;
  }
  // Use a template with no wrapper for the page's main content.
  if ($variables['block_html_id'] == 'block-system-main') {
    $variables['theme_hook_suggestions'][] = 'block--no_wrapper';
  }

  // Classes describing the position of the block within the region.
  if ($variables['block_id'] == 1) {
    $variables['classes_array'][] = 'first';
  }
  // The last_in_region property is set in project_c_page_alter().
  if (isset($variables['block']->last_in_region)) {
    $variables['classes_array'][] = 'last';
  }
  $variables['classes_array'][] = $variables['block_zebra'];

  $variables['title_attributes_array']['class'][] = 'block--title';

  // Add Aria Roles via attributes.
  switch ($variables['block']->module) {
    case 'system':
      switch ($variables['block']->delta) {
        case 'main':
          // Note: the "main" role goes in the page.tpl, not here.
          break;
        case 'help':
        case 'powered-by':
          $variables['attributes_array']['role'] = 'complementary';
          break;
        default:
          // Any other "system" block is a menu block.
          $variables['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'menu':
    case 'menu_block':
    case 'blog':
    case 'book':
    case 'comment':
    case 'forum':
    case 'shortcut':
    case 'statistics':
      $variables['attributes_array']['role'] = 'navigation';
      $classes[] = 'navigation';
      break;
    case 'search':
      $variables['attributes_array']['role'] = 'search';
      break;
    case 'help':
    case 'aggregator':
    case 'locale':
    case 'poll':
    case 'profile':
      $variables['attributes_array']['role'] = 'complementary';
      break;
    case 'node':
      switch ($variables['block']->delta) {
        case 'syndicate':
          $variables['attributes_array']['role'] = 'complementary';
          break;
        case 'recent':
          $variables['attributes_array']['role'] = 'navigation';
          break;
      }
      break;
    case 'user':
      switch ($variables['block']->delta) {
        case 'login':
          $variables['attributes_array']['role'] = 'form';
          break;
        case 'new':
        case 'online':
          $variables['attributes_array']['role'] = 'complementary';
          break;
      }
      break;
  }

  // Add required wrapper class for slideshows.
  if ($variables['block']->delta === 'homepage_slide') {
    $variables['classes_array'][] = 'slideshow-wrapper';
  }
}

/**
 * Override or insert variables into the block templates.
 *
 * @param $variables
 *   An array of variables to pass to the theme template.
 * @param $hook
 *   The name of the template being rendered ("block" in this case.)
 */
function project_c_base_responsive_process_block(&$variables, $hook) {
  // Drupal 7 should use a $title variable instead of $block->subject.
  $variables['title'] = isset($variables['block']->subject) ? $variables['block']->subject : '';
}

/**
 * Implements hook_page_alter().
 *
 * Look for the last block in the region. This is impossible to determine from
 * within a preprocess_block function.
 *
 * @param $page
 *   Nested array of renderable elements that make up the page.
 */
function project_c_base_responsive_page_alter(&$page) {
  // Look in each visible region for blocks.
  foreach (system_region_list($GLOBALS['theme'], REGIONS_VISIBLE) as $region => $name) {
    if (!empty($page[$region])) {
      // Find the last block in the region.
      $blocks = array_reverse(element_children($page[$region]));
      while ($blocks && !isset($page[$region][$blocks[0]]['#block'])) {
        array_shift($blocks);
      }
      if ($blocks) {
        $page[$region][$blocks[0]]['#block']->last_in_region = TRUE;
      }
    }
  }

  // Add a setting to tell the slideshow script where to place the slideshow
  // pager.
  // @see /profiles/project_c/themes/project_c_base/javascript/script.js
  $page['content']['#attached']['js'][] = array(
    'type' => 'setting',
    'data' => array('project_c_base_responsive' => array('slide_container' => '.block-project_c-homepage-slides')),
  );
}

/**
 * Implements hook_form_BASE_FORM_ID_alter().
 *
 * Prevent user-facing field styling from screwing up node edit forms by
 * renaming the classes on the node edit form's field wrappers.
 */
function project_c_base_responsive_form_node_form_alter(&$form, &$form_state, $form_id) {
  // Remove if #1245218 is backported to D7 core.
  foreach (array_keys($form) as $item) {
    if (strpos($item, 'field_') === 0) {
      if (!empty($form[$item]['#attributes']['class'])) {
        foreach ($form[$item]['#attributes']['class'] as &$class) {
          // Core bug: the field-type-text-with-summary class is used as a JS hook.
          if ($class != 'field-type-text-with-summary' && strpos($class, 'field-type-') === 0 || strpos($class, 'field-name-') === 0) {
            // Make the class different from that used in theme_field().
            $class = 'form-' . $class;
          }
        }
      }
    }
  }
}

/**
 * Implements hook_form_BASE_FORM_ID_alter().
 *
 * Modify the search form to adjust styles.
 *
 * @see project_c_search_form()
 */
function project_c_base_responsive_form_project_c_search_form_alter(&$form, &$form_state, $form_id) {
  $form['s']['#prefix'] = '<div class="search-input">';
  $form['submit']['#suffix'] = '</div>';

  $form['search_site']['#attributes']['class'][] = 'search-site';
}

/**
 * Returns HTML for primary and secondary local tasks.
 *
 * @ingroup themeable
 */
function project_c_base_responsive_menu_local_tasks(&$variables) {
  $output = '';

  if (!empty($variables['primary'])) {
    $variables['primary']['#prefix'] = '<h2 class="visually-hidden">' . t('Primary tabs') . '</h2>';
    $variables['primary']['#prefix'] .= '<ul class="tabs local-tasks">';
    $variables['primary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['primary']);
  }
  if (!empty($variables['secondary'])) {
    $variables['secondary']['#prefix'] = '<h2 class="visually-hidden">' . t('Secondary tabs') . '</h2>';
    $variables['secondary']['#prefix'] .= '<ul class="tabs tabs--secondary local-tasks local-tasks--secondary">';
    $variables['secondary']['#suffix'] = '</ul>';
    $output .= drupal_render($variables['secondary']);
  }

  return $output;
}

/**
 * Returns HTML for a single local task link.
 *
 * @ingroup themeable
 */
function project_c_base_responsive_menu_local_task($variables) {
  // Views uses hook_menu_local_task without using hook_menu_local_tasks, which breaks all the styling.
  if (isset($variables['element']['#parents'][0]) && $variables['element']['#parents'][0] === 'displays') {
    // Use core's theme hook instead.
    return theme_menu_local_task($variables);
  }
  $link = $variables['element']['#link'];
  $link_text = $link['title'];

  // Add BEM-style class names.
  $link['localized_options']['attributes']['class'][] = 'local-tasks__link';
  $class = 'local-tasks__item';

  if (!empty($variables['element']['#active'])) {
    // Add text to indicate active tab for non-visual users.
    $active = ' <span class="visually-hidden">' . t('(active tab)') . '</span>';

    // If the link does not contain HTML already, check_plain() it now.
    // After we set 'html'=TRUE the link will not be sanitized by l().
    if (empty($link['localized_options']['html'])) {
      $link['title'] = check_plain($link['title']);
    }
    $link['localized_options']['html'] = TRUE;
    $link_text = t('!local-task-title!active', array('!local-task-title' => $link['title'], '!active' => $active));

    $link['localized_options']['attributes']['class'][] = 'is-active';
    $class .= ' is-active';
  }

  return '<li class="' . $class . '">' . l($link_text, $link['href'], $link['localized_options']) . "</li>\n";
}

/**
 * Implements hook_preprocess_menu_link().
 */
function project_c_base_responsive_preprocess_menu_link(&$variables, $hook) {
  // Normalize menu item classes to be an array.
  if (empty($variables['element']['#attributes']['class'])) {
    $variables['element']['#attributes']['class'] = array();
  }
  $menu_item_classes =& $variables['element']['#attributes']['class'];
  if (!is_array($menu_item_classes)) {
    $menu_item_classes = array($menu_item_classes);
  }

  // Normalize menu link classes to be an array.
  if (empty($variables['element']['#localized_options']['attributes']['class'])) {
    $variables['element']['#localized_options']['attributes']['class'] = array();
  }
  $menu_link_classes =& $variables['element']['#localized_options']['attributes']['class'];
  if (!is_array($menu_link_classes)) {
    $menu_link_classes = array($menu_link_classes);
  }

  // Add BEM-style classes to the menu item classes.
  $extra_classes = array('menu__item');
  foreach ($menu_item_classes as $key => $class) {
    switch ($class) {
      // Menu module classes.
      case 'expanded':
      case 'collapsed':
      case 'leaf':
      case 'active':
      // Menu block module classes.
      case 'active-trail':
        $extra_classes[] = 'is-' . $class;
        break;
      case 'has-children':
        $extra_classes[] = 'is-parent';
        break;
    }
  }
  $menu_item_classes = array_merge($extra_classes, $menu_item_classes);

  // Add BEM-style classes to the menu link classes.
  $extra_classes = array('menu__link');
  if (empty($menu_link_classes)) {
    $menu_link_classes = array();
  }
  else {
    foreach ($menu_link_classes as $key => $class) {
      switch ($class) {
        case 'active':
        case 'active-trail':
          $extra_classes[] = 'is-' . $class;
          break;
      }
    }
  }
  $menu_link_classes = array_merge($extra_classes, $menu_link_classes);
}

/**
 * Returns HTML for status and/or error messages, grouped by type.
 */
function project_c_base_responsive_status_messages($variables) {
  $output = '';

  foreach (drupal_get_messages($variables['display']) as $type => $messages) {
    $heading = project_c_base_responsive_get_message_header($type);
    $icon = project_c_base_responsive_get_message_icon($type);

    switch ($type) {
      case 'status meta':
        $output .= "<div class=\"messages messages--metadata\">\n";
        break;
      case 'status project_c':
        $output .= "<div class=\"messages messages--post-status messages--published\">\n";
        break;
      case 'warning project_c':
        $output .= "<div class=\"messages messages--post-status messages--published-draft\">\n";
        break;
      case 'error project_c':
        $output .= "<div class=\"messages messages--post-status messages--unpublished\">\n";
        break;
      default:
        $output .= "<div class=\"messages messages--$type\">\n";
    }

    if ($heading) {
      $output .= '<h2 class="visually-hidden">' . $heading . "</h2>\n";
    }

    if ($icon) {
      $output .= '<div class="messages__icon">' . $icon . "</div>";
    }

    if (count($messages) > 1) {
      $output .= " <ul class=\"messages__list\">\n";
      foreach ($messages as $message) {
        $output .= '  <li class="messages__item">' . $message . "</li>\n";
      }
      $output .= " </ul>\n";
    }
    else {
      $output .= "<div class=\"messages__message\">" . reset($messages) . "</div>";
    }
    $output .= "</div>\n";
  }
  return $output;
}

/**
 * Returns a header for a status message type.
 */
function project_c_base_responsive_get_message_header($type) {
  $status_headings = array(
    'status' => t('Status message'),
    'error' => t('Error message'),
    'warning' => t('Warning message'),
    'status meta' => t('Post metadata'),
    'status project_c' => t('Post published'),
    'error project_c' => t('Post unpublished'),
    'warning project_c' => t('Post published with draft'),
  );

  return isset($status_headings[$type]) ? $status_headings[$type] : false;
}

/**
 * Returns an icon for a status message type.
 */
function project_c_base_responsive_get_message_icon($type) {
  $svg_output_prefix = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 64 64">';
  $svg_output_suffix = '</svg>';

  switch ($type) {
    case 'error':
      $svg_icon_data = '<path d="M63.416 51.416c-0-0-0.001-0.001-0.001-0.001l-19.415-19.416 19.415-19.416c0-0 0.001-0 0.001-0.001 0.209-0.209 0.36-0.453 0.457-0.713 0.265-0.711 0.114-1.543-0.458-2.114l-9.172-9.172c-0.572-0.572-1.403-0.723-2.114-0.458-0.26 0.097-0.504 0.248-0.714 0.457 0 0-0 0-0.001 0.001l-19.416 19.416-19.416-19.416c-0-0-0-0-0.001-0.001-0.209-0.209-0.453-0.36-0.713-0.457-0.711-0.266-1.543-0.114-2.114 0.457l-9.172 9.172c-0.572 0.572-0.723 1.403-0.458 2.114 0.097 0.26 0.248 0.505 0.457 0.713 0 0 0 0 0.001 0.001l19.416 19.416-19.416 19.416c-0 0-0 0-0 0.001-0.209 0.209-0.36 0.453-0.457 0.713-0.266 0.711-0.114 1.543 0.458 2.114l9.172 9.172c0.572 0.572 1.403 0.723 2.114 0.458 0.26-0.097 0.504-0.248 0.713-0.457 0-0 0-0 0.001-0.001l19.416-19.416 19.416 19.416c0 0 0.001 0 0.001 0.001 0.209 0.209 0.453 0.36 0.713 0.457 0.711 0.265 1.543 0.114 2.114-0.458l9.172-9.172c0.572-0.572 0.723-1.403 0.458-2.114-0.097-0.26-0.248-0.504-0.457-0.713z" fill="#000000"></path>';
      break;
    case 'warning':
      $svg_icon_data = '<path d="M26,64l12,0c1.105,0 2,-0.895 2,-2l0,-9c0,-1.105 -0.895,-2 -2,-2l-12,0c-1.105,0 -2,0.895 -2,2l0,9c0,1.105 0.895,2 2,2Z" fill="#000000"></path><path d="M26,46l12,0c1.105,0 2,-0.895 2,-2l0,-42c0,-1.105 -0.895,-2 -2,-2l-12,0c-1.105,0 -2,0.895 -2,2l0,42c0,1.105 0.895,2 2,2Z" fill="#000000"></path>';
      break;
    case 'status meta':
    case 'status project_c':
    case 'warning project_c':
    case 'error project_c':
      return false;
    default:
      $svg_icon_data = '<path d="M54 8l-30 30-14-14-10 10 24 24 40-40z" fill="#000000"></path>';
  }

  return $svg_output_prefix . $svg_icon_data . $svg_output_suffix;
}

/**
 * Returns HTML for a marker for new or updated content.
 */
function project_c_base_responsive_mark($variables) {
  $type = $variables['type'];

  if ($type == MARK_NEW) {
    return ' <mark class="highlight-mark">' . t('new') . '</mark>';
  }
  elseif ($type == MARK_UPDATED) {
    return ' <mark class="highlight-mark">' . t('updated') . '</mark>';
  }
}

/**
 * Implements hook_preprocess_project_c_event_item().
 */
function project_c_base_responsive_preprocess_project_c_event_item(&$variables) {
  // Add template suggestions for event variants (e.g. caption).
  // @see project_c_block_get_bean_block_bundle_variant().
  if (isset($variables['element']['#bean']->variant)) {
    $variables['theme_hook_suggestions'][] = 'project_c_event_item__' . $variables['element']['#bean']->variant;
  }
}

/**
 * Implements hook_preprocess_container().
 */
function project_c_base_responsive_preprocess_container(&$variables) {
  // Bail if there is no source setting for this container element.
  if (!isset($variables['element']['source'])) {
    return;
  }

  if ($variables['element']['source'] === 'project_c-event-bean-no-events') {
    // Replace the default legacy classes with classes from the style guide.
    $variables['element']['#attributes']['class'] = array(
      'event',
      'event--missing',
    );
  }
}

/**
 * Theme individual slides.
 *
 * @see theme_project_c_slide() in `project_c_homepage_slides.module`
 */
function project_c_base_responsive_project_c_slide($variables) {
  return '<div class="slide">
            <p class="slide__caption">'. render($variables['slide']['caption']) .'</p>
            ' . render($variables['slide']['image']) . '
          </div>';
}

/**
 * Removes HTML 'size' attribute from input fields, as it breaks CSS max-width.
 *
 * Implements theme_textfield().
 */
function project_c_base_responsive_textfield($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'text';

  // Removes 'size' attribute
  element_set_attributes($element, array('id', 'name', 'value', 'maxlength'));
  _form_set_class($element, array('form-text'));

  $extra = '';
  if ($element['#autocomplete_path'] && !empty($element['#autocomplete_input'])) {
    drupal_add_library('system', 'drupal.autocomplete');
    $element['#attributes']['class'][] = 'form-autocomplete';

    $attributes = array();
    $attributes['type'] = 'hidden';
    $attributes['id'] = $element['#autocomplete_input']['#id'];
    $attributes['value'] = $element['#autocomplete_input']['#url_value'];
    $attributes['disabled'] = 'disabled';
    $attributes['class'][] = 'autocomplete';
    $extra = '<input' . drupal_attributes($attributes) . ' />';
  }

  $output = '<input' . drupal_attributes($element['#attributes']) . ' />';

  return $output . $extra;
}

/**
 * Removes HTML 'size' attribute from password fields, as it breaks CSS
 * max-width.
 *
 * Implements theme_password().
 */
function project_c_base_responsive_password($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'password';
  // Removes 'size' attribute
  element_set_attributes($element, array('id', 'name', 'maxlength'));
  _form_set_class($element, array('form-text'));

  return '<input' . drupal_attributes($element['#attributes']) . ' />';
}

/**
 * Removes HTML 'size' attribute from select elements, as it breaks CSS
 * max-width.
 *
 * Implements theme_select().
 */
function project_c_base_responsive_select($variables) {
  $element = $variables['element'];
  // Removes 'size' attribute
  element_set_attributes($element, array('id', 'name'));
  _form_set_class($element, array('form-select'));

  return '<select' . drupal_attributes($element['#attributes']) . '>' . form_select_options($element) . '</select>';
}

/**
 * Overrides theming of individual file upload field. To theme the wrapper div,
 * see theme_file_managed_file() in modules/file/file.module.
 *
 * Removes HTML 'size' attribute from file upload elements, as it breaks CSS
 * max-width. Adds a label.
 *
 * Implements theme_file().
 */
function project_c_base_responsive_file($variables) {
  $element = $variables['element'];
  $element['#attributes']['type'] = 'file';
  // Removes 'size' attribute
  element_set_attributes($element, array('id', 'name'));
  _form_set_class($element, array('form-file'));

  return '<label class="form-file-label"><span style="display: none;" class="form-file-label__text">Choose file</span><input' . drupal_attributes($element['#attributes']) . ' /></label>';
}

/**
 * Removes HTML 'size' attribute from webform email fields, as it breaks CSS
 * max-width.
 *
 * Implements theme_webform_email().
 */
function project_c_base_responsive_webform_email($variables) {
  $element = $variables['element'];

  // This IF statement is mostly in place to allow our tests to set type="text"
  // because SimpleTest does not support type="email".
  if (!isset($element['#attributes']['type'])) {
    $element['#attributes']['type'] = 'email';
  }

  // Convert properties to attributes on the element if set.
  // Removes 'size' attribute
  foreach (array('id', 'name', 'value') as $property) {
    if (isset($element['#' . $property]) && $element['#' . $property] !== '') {
      $element['#attributes'][$property] = $element['#' . $property];
    }
  }
  _form_set_class($element, array('form-text', 'form-email'));

  return '<input' . drupal_attributes($element['#attributes']) . ' />';
}
