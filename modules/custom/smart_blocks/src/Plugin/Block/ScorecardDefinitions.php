<?php

namespace Drupal\smart_blocks\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Displays scorecard definitions.
 *
 * @Block(
 *   id = "smart_blocks_scorecard_definitions",
 *   admin_label = @Translation("Definitions"),
 *   category = @Translation("Smarter Lunchrooms custom blocks"),
 * )
 */
class ScorecardDefinitions extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build() {
    return array(
      '#markup' => $this->t('<p><strong>Point of Sale (POS):</strong> Anywhere students leave the line with food and are charged or counted, such as at a register, check-out, or PIN pad.</p><p><strong>Point of Selection:</strong> Anywhere students select food or drink.</p><p><strong>Service Line:</strong> A designated line for meal selection — deli bar, salad bar, hot lunch line, snack window, etc.</p><p><strong>Grab-and-Go:</strong> A pre-packaged reimbursable meal.</p><p><strong>Reimbursable Meal/Combo Meal:</strong> Any meal that meets all of the USDA meal requirements and is priced as a unit.</p><p><strong>Featured Items:</strong> A fruit, vegetable, milk, or entrée that has been identified for promotion.</p>'),
    );
  }

}
