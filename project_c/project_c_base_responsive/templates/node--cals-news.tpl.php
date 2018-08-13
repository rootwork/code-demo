<?php

/**
 * @file
 * PROJECT_C responsive theme implementation to display a news callout node.
 *
 * Available variables:
 * See node.tpl.php
 *
 * Additional variables (not exhaustive):
 * - $title_link: The node title as a link. This is set in
 * project_c_news_node_preprocess() to set the title URL to the value of the link
 * field rather than the node URL.
 *
 * @ingroup themeable
 */
?>
<article class="<?php print $classes; ?> node-<?php print $node->nid; ?>"<?php print $attributes; ?>>
  <?php print render($content['field_image']); ?>
  <div class="news__content-wrapper">
  <?php if ($title_prefix || $title_suffix || $display_submitted || $unpublished || $preview || !$page && $title): ?>
    <?php print render($title_prefix); ?>
    <?php if (!$page): ?>
      <?php if ($title_link): ?>
        <h3<?php print $title_attributes; ?>><?php print $title_link; ?></h3>
      <?php elseif ($node_url): ?>
        <h3<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h3>
      <?php else: ?>
        <h3<?php print $title_attributes; ?>><?php print $title; ?></h3>
      <?php endif; ?>
    <?php endif; ?>
    <?php print render($title_suffix); ?>

    <?php if ($display_submitted): ?>
      <p class="submitted">
        <?php print $user_picture; ?>
        <?php print $submitted; ?>
      </p>
    <?php endif; ?>

    <?php if ($unpublished): ?>
      <mark class="watermark watermark--unpublished"><?php print t('Unpublished'); ?></mark>
    <?php elseif ($preview): ?>
      <mark class="watermark watermark--preview"><?php print t('Preview'); ?></mark>
    <?php endif; ?>
  <?php endif; ?>

  <?php
    // We hide the comments and links now so that we can render them later.
    hide($content['comments']);
    hide($content['links']);
    print render($content);
  ?>
  </div>

  <?php print render($content['links']); ?>
</article>
