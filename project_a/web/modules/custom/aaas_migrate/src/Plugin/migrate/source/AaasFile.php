<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\file\Plugin\migrate\source\d7\File;

/**
 * Drupal 7 file source from database, modified for PROJECT_A.
 *
 * @MigrateSource(
 *   id = "project_a_file",
 *   source_module = "file",
 *   source_provider = "file"
 * )
 */
class Project_aFile extends File {

  /**
   * {@inheritdoc}
   */
  public function query() {
    $query = $this->select('file_managed', 'f')
      ->fields('f')
      ->orderBy('f.timestamp');
    $query->condition('f.type', ['audio', 'document', 'image'], 'IN');
    return $query;
  }

}
