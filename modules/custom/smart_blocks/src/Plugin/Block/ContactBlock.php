<?php

namespace Drupal\smart_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides an introductory block above the site-wide contact form.
 *
 * @Block(
 *   id = "smart_blocks_contact",
 *   admin_label = @Translation("Contact page address listing"),
 *   category = @Translation("Smarter Lunchrooms custom blocks"),
 * )
 */
class ContactBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('<p dir="ltr">The Smarter Lunchrooms national office is located in <span itemscope itemtype="http://schema.org/ContactPoint"><span itemscope itemtype="schema.org/PostalAddress"><span itemprop="streetAddress">Warren Hall at Cornell University</span>, <span itemprop="addressLocality">Ithaca</span>, <span itemprop="addressRegion">NY</span>, <span itemprop="postalCode">14853</span></span></span>.</p>'),
    );
  }

}
