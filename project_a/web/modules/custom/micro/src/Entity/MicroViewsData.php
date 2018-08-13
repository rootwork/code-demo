<?php

namespace Drupal\micro\Entity;

use Drupal\views\EntityViewsData;

/**
 * Provides Views data for Micro Content entities.
 */
class MicroViewsData extends EntityViewsData {

  /**
   * {@inheritdoc}
   */
  public function getViewsData() {
    $data = parent::getViewsData();

    // Additional information for Views integration, such as table joins, can be
    // put here.
    return $data;
  }

}
