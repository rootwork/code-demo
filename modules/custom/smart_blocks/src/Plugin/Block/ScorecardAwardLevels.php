<?php

namespace Drupal\smart_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Displays scorecard level awards.
 *
 * @Block(
 *   id = "smart_blocks_scorecard_award_levels",
 *   admin_label = @Translation("Award levels"),
 *   category = @Translation("Smarter Lunchrooms custom blocks"),
 * )
 */
class ScorecardAwardLevels extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('<dl class="award-levels__list"><dt class="award-levels__level award-levels__level--bronze">Bronze, 15–25</dt><dd class="award-levels__description award-levels__description--bronze">Great job! This lunchroom is off to a strong start.</dd><dt class="award-levels__level award-levels__level--silver">Silver, 26–45</dt><dd class="award-levels__description award-levels__description--silver">Excellent. Think of all the kids that are inspired to eat healthier!</dd><dt class="award-levels__level award-levels__level--gold">Gold, 46–60</dt><dd class="award-levels__description award-levels__description--gold">This lunchroom is making the most of the Smarter Lunchroom Movement. Keep reaching for the top!</dd></dl>'),
    );
  }

}
