<?php

namespace Drupal\smart_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a copyright and "funded by" block for the footer.
 *
 * @Block(
 *   id = "smart_blocks_copyright",
 *   admin_label = @Translation("Copyright and funding"),
 *   category = @Translation("Smarter Lunchrooms custom blocks"),
 * )
 */
class CopyrightBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('<span class="smart-blocks-copyright smart-blocks-copyright__copyright smart-blocks-copyright__copyright-text">© Smarter Lunchrooms Movement, Cornell University 2017</span> <span class="smart-blocks-copyright smart-blocks-copyright__funding smart-blocks-copyright__funding-text">Funded in part by USDA FNS/ERS</span>'),
    );
  }

}
