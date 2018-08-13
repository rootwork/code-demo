<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\node\Plugin\migrate\source\d7\Node;

/**
 * Drupal 7 node source from database, modified for PROJECT_A person nodes.
 *
 * @MigrateSource(
 *   id = "project_a_person",
 *   source_module = "node",
 *   source_provider = "node"
 * )
 */
class Project_aPerson extends Node {

  /**
   * Limit query to published nodes and retrieve location subfields.
   */
  public function query() {
    $query = parent::query();
    $query->condition('n.status', 1);
    $query->leftJoin('field_data_field_location', 'floc', 'floc.bundle = n.type AND floc.entity_id = n.nid');
    $query->leftJoin('location', 'loc', 'loc.lid = floc.field_location_lid');
    $query->fields('loc', [
      'street',
      'city',
      'province',
      'postal_code',
      'country',
    ]);
    $query->leftJoin('field_data_field_email', 'email', 'email.bundle = n.type AND email.entity_id = n.nid');
    $query->fields('email', ['field_email_email']);
    return $query;
  }

}
