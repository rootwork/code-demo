<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\node\Plugin\migrate\source\d7\Node;

/**
 * Drupal 7 node source from database, modified for PROJECT_A person nodes.
 *
 * @MigrateSource(
 *   id = "project_a_blog_post",
 *   source_module = "node",
 *   source_provider = "node"
 * )
 */
class Project_aBlogPost extends Node {

  /**
   * Limit query to published nodes and retrieve subfields.
   */
  public function query() {
    $query = parent::query();
    $query->condition('n.status', 1);
    $query->leftJoin('field_data_field_author', 'author', 'author.bundle = n.type AND author.entity_id = n.nid');
    $query->fields('author', ['field_author_nid']);
    $query->leftJoin('field_data_field_date', 'd', 'd.bundle = n.type AND d.entity_id = n.nid');
    $query->fields('d', ['field_date_value']);
    $query->leftJoin('field_data_field_blog_name', 'bn', 'bn.bundle = n.type AND bn.entity_id = n.nid');
    $query->leftJoin('taxonomy_term_data', 'td', 'td.tid = bn.field_blog_name_tid');
    $query->addField('td', 'name', 'blog_name');
    $query->leftJoin('field_data_field_role_access', 'ra', 'ra.entity_id = n.nid');
    $query->fields('ra', ['field_role_access_value']);
    return $query;
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    parent::prepareRow($row);
    // Set value of 'Role Access'.
    if ($row->getSourceProperty('field_role_access_value')) {
      $row->setSourceProperty('Role Access', 6580154);
    }
    // Normalize blog names.
    if ($row->getSourceProperty('blog_name') == 'In Depth') {
      $row->setSourceProperty('blog_name', 'In-depth');
    }
    // If nonexistent author 10133 is specified, set it to empty so it will be
    // skipped.
    if ($row->getSourceProperty('field_author_nid') == 10133) {
      $row->setSourceProperty('field_author_nid', '');
    }
  }

}
