<?php

/**
 * @file
 * Default theme implementation to display a single Drupal page.
 *
 * The doctype, html, head and body tags are not in this template. Instead they
 * can be found in the html.tpl.php template in this directory.
 *
 * Available variables:
 *
 * General utility variables:
 * - $base_path: The base URL path of the Drupal installation. At the very
 *   least, this will always default to /.
 * - $directory: The directory the template is located in, e.g. modules/system
 *   or themes/bartik.
 * - $is_front: TRUE if the current page is the front page.
 * - $logged_in: TRUE if the user is registered and signed in.
 * - $is_admin: TRUE if the user has permission to access administration pages.
 *
 * Site identity:
 * - $front_page: The URL of the front page. Use this instead of $base_path,
 *   when linking to the front page. This includes the language domain or
 *   prefix.
 * - $logo: The path to the logo image, as defined in theme configuration.
 * - $site_name: The name of the site, empty when display has been disabled
 *   in theme settings.
 * - $site_slogan: The slogan of the site, empty when display has been disabled
 *   in theme settings.
 *
 * Navigation:
 * - $main_menu (array): An array containing the Main menu links for the
 *   site, if they have been configured.
 * - $secondary_menu (array): An array containing the Secondary menu links for
 *   the site, if they have been configured.
 * - $breadcrumb: The breadcrumb trail for the current page.
 *
 * Page content (in order of occurrence in the default page.tpl.php):
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title: The page title, for use in the actual HTML content.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 * - $messages: HTML for status and error messages. Should be displayed
 *   prominently.
 * - $tabs (array): Tabs linking to any sub-pages beneath the current page
 *   (e.g., the view and edit tabs when displaying a node).
 * - $action_links (array): Actions local to the page, such as 'Add menu' on the
 *   menu administration interface.
 * - $feed_icons: A string of all feed icons for the current page.
 * - $node: The node object, if there is an automatically-loaded node
 *   associated with the page, and the node ID is the second argument
 *   in the page's path (e.g. node/12345 and node/12345/revisions, but not
 *   comment/reply/12345).
 *
 * Regions:
 * - $page['help']: Dynamic help text, mostly for admin pages.
 * - $page['highlighted']: Items for the highlighted content region.
 * - $page['content']: The main content of the current page.
 * - $page['sidebar_first']: Items for the first sidebar.
 * - $page['sidebar_second']: Items for the second sidebar.
 * - $page['header']: Items for the header region.
 * - $page['footer']: Items for the footer region.
 *
 * @see template_preprocess()
 * @see template_preprocess_page()
 * @see template_process()
 * @see html.tpl.php
 *
 * @ingroup themeable
 */
?>

<div class="body-wrapper">

  <header class="header" role="banner">

    <div class="logo">
      <object type="image/svg+xml" data="<?php print $logo_vector; ?>">
        <a href="http://project_c.project_c.edu" title="College of Agricultural and Life Sciences"><img src="<?php print $logo_raster; ?>"/></a>
      </object>
    </div>

    <?php if ($site_name || $site_slogan): ?>
      <div class="banner">
        <?php if ($site_slogan): ?>
          <?php if ($is_front): ?>
            <h2 class="banner__site-slogan">
          <?php else: ?>
            <div class="banner__site-slogan">
          <?php endif; ?>
            <?php print $site_slogan; ?>
          <?php if ($is_front): ?>
            </h2>
          <?php else: ?>
            </div>
          <?php endif; ?>
        <?php endif; ?>

        <?php if ($site_name): ?>
          <?php if ($is_front): ?>
            <h1 class="banner__site-name">
          <?php else: ?>
            <div class="banner__site-name">
          <?php endif; ?>
              <a href="<?php print $front_page; ?>" title="<?php print t('Home'); ?>" rel="home" class="banner__site-link"><span><?php print $site_name; ?></span></a>
          <?php if ($is_front): ?>
            </h1>
          <?php else: ?>
            </div>
          <?php endif; ?>
        <?php endif; ?>
      </div>
    <?php endif; ?>

    <?php print render($page['header']); ?>

  </header>

  <div class="page">

    <?php if ($header_image): ?>
    <div class="content__header content__header--with-image">
      <?php print $header_image_object; ?>
      <?php print render($title_prefix); ?>
      <?php if ($title): ?>
        <h1 class="content__title content__title--with-image"><?php print $title; ?></h1>
      <?php endif; ?>
      <?php print render($title_suffix); ?>
    </div>
    <?php endif; ?>

    <main class="<?php print $content_class; ?>" role="main">
      <?php print render($page['highlighted']); ?>

      <a href="#skip-link" class="visually-hidden visually-hidden--focusable" id="main-content">Back to top</a>

      <?php if ($breadcrumb): ?>
        <div class="breadcrumb"><?php print $breadcrumb; ?></div>
      <?php endif; ?>

      <?php if (!$header_image): ?>
      <div class="content__header">
        <?php print render($title_prefix); ?>
        <?php if ($title): ?>
          <h1 class="content__title"><?php print $title; ?></h1>
        <?php endif; ?>
        <?php print render($title_suffix); ?>
      </div>
      <?php endif; ?>

      <?php print render($page['content']); ?>
      <?php print $feed_icons; ?>
    </main>

    <div class="nav">

      <a href="#skip-link" class="visually-hidden visually-hidden--focusable" id="main-menu" tabindex="-1">Back to top</a>

      <?php if ($main_menu): ?>
        <div class="menu-revealer">menu</div>
        <?php if (isset($variables['main_menu_expanded'])): ?>
          <nav class="navigation navigation--primary" role="navigation">
            <?php print render($variables['main_menu_expanded']); ?>
          </nav>
        <?php else: ?>
          <?php print render($page['navigation']); ?>
        <?php endif; ?>
      <?php endif; ?>

    </div>

    <?php if ($layout === 'both' || $layout == 'second'): ?>
    <aside class="sidebar sidebar--right" role="complementary">
      <?php print render($page['sidebar_second']); ?>
    </aside>
    <?php endif; ?>

    <?php if ($layout === 'both' || $layout == 'first' || $main_menu_active_level): ?>
    <aside class="<?php print $sidebar_left_classes ?>" role="complementary">
      <?php if ($main_menu_active_level): ?>
        <nav class="navigation navigation--secondary" role="navigation">
          <?php print render($variables['main_menu_active_level']); ?>
        </nav>
      <?php endif; ?>
      <?php print render($page['sidebar_first']); ?>
    </aside>
    <?php endif; ?>

    <!-- TODO: check if $page['help'] is set, too -->
    <?php if ($messages || $tabs || $action_links): ?>
    <div class="editor-tools">
      <?php print $messages; ?>
      <?php print render($page['help']); ?>

      <?php if ($tabs): ?>
        <?php print render($tabs); ?>
      <?php endif; ?>

      <?php if ($action_links): ?>
        <ul class="action-links"><?php print render($action_links); ?></ul>
      <?php endif; ?>
    </div>
    <?php endif; ?>
  </div>

</div>

<footer class="footer">
  <div class="footer__wrapper">
    <div class="footer__content">
      <?php print render($page['footer']); ?>

      <?php if ($secondary_menu): ?>
        <nav class="navigation navigation--footer" role="navigation">
          <?php print theme('links__system_secondary_menu', array(
            'links' => $secondary_menu,
            'attributes' => array(
              'class' => array('links', 'inline'),
            ),
            'heading' => array(
              'text' => t('Secondary menu'),
              'level' => 'h2',
              'class' => array('visually-hidden'),
            ),
          )); ?>
        </nav>
      <?php endif; ?>
    </div>
  </div>
</footer>

<?php print render($page['bottom']); ?>
