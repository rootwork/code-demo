<?php

namespace Drupal\smart_all_choices\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Component\Utility\Html;

/**
 * Plugin implementation of the 'all_choices' formatter.
 *
 * @FieldFormatter(
 *   id = "all_choices",
 *   label = @Translation("All choices"),
 *   field_types = {
 *     "list_string"
 *   }
 * )
 */
class AllChoicesFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = array();
    $settings = $this->getSettings();

    $summary[] = t('Displays all choices, selected and unselected');

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $element = array();

    // Get full list of options.
    $field_settings = $this->getFieldSettings();
    $options = $field_settings['allowed_values'];

    // Build element type array for `drupal_render` out of full options list.
    $list_items = array();

    foreach ($options as $key => $label) {
      $list_items[$key] = array(
        '#markup' => $label,
        '#wrapper_attributes' => array(
          'class' => array(
            'wrapper__links__link',
          ),
        ),
      );
    }

    // Update $list_items for each select values.
    $i = 0;
    if (count($items) > 0) {
      foreach ($items as $item) {
        $label = $list_items[$item->value]['#markup'];
        $key = $item->value;

        // Prefix label for selected values.
        $list_items[$item->value]['#markup'] = '<span class="selected__label">Selected: </span>' . $label;

        // Set class for selected items.
        $list_items[$item->value]['#wrapper_attributes']['class'][] = "selected";

        $i++;
      }
    }

    if ($i == 0) {
      $selected_class = 'selected-none';
    } elseif ($i == count($list_items)) {
      $selected_class = 'selected-all';
    } else {
      $selected_class = 'selected-' . $i;
    }

    // Finish element type array for rendering.
    $list = array(
      '#theme' => 'item_list',
      '#list_type' => 'ul',
      '#wrapper_attributes' => array(
        'class' => array(
        ),
      ),
      '#attributes' => array(
        'class' => array(
          $selected_class
        ),
      ),
      '#items' => $list_items
    );

    $element[] = array(
      '#markup' => drupal_render($list),
    );

    return $element;
  }

}
