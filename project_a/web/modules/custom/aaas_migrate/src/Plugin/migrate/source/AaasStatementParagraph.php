<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\migrate_source_csv\Plugin\migrate\source\CSV;
use Drupal\Core\Database\Database;

/**
 * Retrieve statement text from D7 nodes.
 *
 * @MigrateSource(
 *   id = "project_a_statement_paragraph",
 *   source_module = "csv",
 *   source_provider = "CSV"
 * )
 */
class Project_aStatementParagraph extends CSV {
  public $db;

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    $source = $row->getSourceProperty('source');
    if ($source > '' && substr($source, 0, 5) == 'node/') {
      $source = substr($source, 5);
      if (!is_object($this->db)) {
        $this->db = Database::getConnection('default', 'migrate');
      }
      $query = $this->db->select('field_data_body', 'b');
      $query->fields('b', ['body_value']);
      $query->condition('entity_id', $source);
      $body = $query->execute()->fetchField();
      $row->setSourceProperty('Extra Text', $body);
    }
    parent::prepareRow($row);
  }

}
