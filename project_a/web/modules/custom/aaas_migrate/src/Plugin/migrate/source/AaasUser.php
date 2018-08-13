<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\user\Plugin\migrate\source\d7\User;
use Drupal\Migrate\Row;

/**
 * Drupal 7 user source from database, customized for PROJECT_A.
 *
 * @MigrateSource(
 *   id = "project_a_user",
 *   source_module = "user"
 * )
 */
class Project_aUser extends User {

  /**
   * For PROJECT_A: Limit query to active accounts that have created content.
   */
  public function query() {
    $query = $this->select('users', 'u')
      ->fields('u')
      ->condition('u.uid', 0, '>')
      ->condition('u.status', 1);
    $query->join('node', 'n', 'n.uid = u.uid');
    $query->distinct();
    return $query;
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    // Allow the parent function to define the other properties.
    $result = parent::prepareRow($row);

    // Remove all roles.
    $row->setSourceProperty('roles', []);

    return $result;
  }

}
