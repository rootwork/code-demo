<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\node\Plugin\migrate\source\d7\Node;

/**
 * Drupal 7 node source from database, modified for PROJECT_A news article nodes.
 *
 * @MigrateSource(
 *   id = "project_a_news",
 *   source_module = "node",
 *   source_provider = "node"
 * )
 */
class Project_aNews extends Node {

  /**
   * Limit query to published nodes and retrieve subfields.
   */
  public function query() {
    $query = parent::query();
    $query->condition('n.status', 1);
    $query->leftJoin('field_data_field_date', 'd', 'd.bundle = n.type AND d.entity_id = n.nid');
    $query->fields('d', ['field_date_value']);
    $query->leftJoin('field_data_field_updated_date', 'ud', 'ud.bundle = n.type AND ud.entity_id = n.nid');
    $query->fields('ud', ['field_updated_date_value']);
    $query->leftJoin('field_data_field_sub_title', 'st', 'st.bundle = n.type AND st.entity_id = n.nid');
    $query->fields('st', ['field_sub_title_value']);
    return $query;
  }

}
