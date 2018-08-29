<?php

namespace Drupal\smart_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides introductory text for the scorecard form.
 *
 * @Block(
 *   id = "smart_blocks_scorecard_form_intro",
 *   admin_label = @Translation("Scorecard form introduction"),
 *   category = @Translation("Smarter Lunchrooms custom blocks"),
 * )
 */
class ScorecardFormIntro extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('<p>Complete the following scorecard to uncover what the school is already doing to be a Smarter Lunchroom and to identify the areas that can be focused on next. Please note that you may save what you have filled out at any point and return later. Once you have submitted the Scorecard, you will not be able to modify it. However, you are encouraged to fill out multiple scorecards over time to show progress. To learn more about filling out the Scorecard please see the FAQs (link to FAQ opens in new tab)</p><p>Before you begin, please review each strategy. Next, observe the school lunch service and check off the strategies that are reflected. For guidance, please refer to the <a href="/scorecard-tools/4-step-path-building-smarter-lunchroom">Smarter Lunchrooms 4 Step Path</a>. During your observation of the lunch service, take photographs to document strategies that are being utilized and areas for improvement. For guidance on taking appropriate photos, please view the <a href="/scorecard-tools/4-step-path-building-smarter-lunchroom">Smarter Lunchrooms 4 Step Path</a>.</p><p>Once you have completed the scorecard, review it, then publish the scorecard to view your total and award level! If you need more time to complete the scorecard, you can scroll to the bottom of this page and choose “Save as draft.”</p>'),
    );
  }

}
