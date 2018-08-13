<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\node\Plugin\migrate\source\d7\Node;

/**
 * Drupal 7 node source from database, modified for PROJECT_A event nodes.
 *
 * @MigrateSource(
 *   id = "project_a_event",
 *   source_module = "node",
 *   source_provider = "node"
 * )
 */
class Project_aEvent extends Node {

  /**
   * Limit query to published nodes and retrieve subfields.
   */
  public function query() {
    $query = parent::query();
    $query->condition('n.status', 1);
    if (isset($this->configuration['inner_join'])) {
      $query->innerJoin($this->configuration['inner_join'], 'ij', 'ij.bundle = n.type AND ij.entity_id = n.nid');
    }
    $query->leftJoin('field_data_field_location', 'floc', 'floc.bundle = n.type AND floc.entity_id = n.nid');
    $query->leftJoin('location', 'loc', 'loc.lid = floc.field_location_lid');
    $query->fields('loc', [
      'street',
      'city',
      'province',
      'postal_code',
      'country',
    ]);
    $query->leftJoin('field_data_field_event_date', 'ed', 'ed.bundle = n.type AND ed.entity_id = n.nid');
    $query->fields('ed', ['field_event_date_value', 'field_event_date_value2']);
    $query->leftJoin('field_data_field_virtual_location', 'vl', 'vl.bundle = n.type AND vl.entity_id = n.nid');
    $query->fields('vl', ['field_virtual_location_url', 'field_virtual_location_title']);
    $query->leftJoin('field_data_field_primary_media', 'pm', 'pm.bundle = n.type AND pm.entity_id = n.nid');
    $query->fields('pm', ['field_primary_media_fid']);
    return $query;
  }

}
