<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\migrate_source_csv\Plugin\migrate\source\CSV;
use Drupal\Core\Database\Database;

/**
 * Retrieve additional info from D7 nodes.
 *
 * @MigrateSource(
 *   id = "project_a_basic_page",
 *   source_module = "csv",
 *   source_provider = "CSV"
 * )
 */
class Project_aBasicPage extends CSV {
  private $db;

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    // Load fields from D7 node.
    $nid = $row->getSourceProperty('NID');
    if (!is_object($this->db)) {
      $this->db = Database::getConnection('default', 'migrate');
    }
    $query = $this->db->select('field_data_body', 'b');
    $query->leftJoin('field_data_field_role_access', 'ra', 'ra.entity_id = b.entity_id');
    $query->leftJoin('field_data_field_hero_body', 'hb', 'hb.entity_id = b.entity_id');
    $query->leftJoin('field_data_field_hero_title', 'ht', 'ht.entity_id = b.entity_id');
    $query->leftJoin('field_data_field_desciption', 'd', 'd.entity_id = b.entity_id');
    $query->leftJoin('field_data_field_primary_media', 'pm', 'pm.entity_type = :n and pm.entity_id = b.entity_id', [':n' => 'node']);
    $query->leftJoin('field_data_field_sidebar_promo', 'sp', 'sp.entity_id = b.entity_id');
    $query->fields('b', ['body_value']);
    $query->fields('ra', ['field_role_access_value']);
    $query->fields('hb', ['field_hero_body_value']);
    $query->fields('ht', ['field_hero_title_value']);
    $query->fields('d', ['field_desciption_value']);
    $query->fields('pm', ['field_primary_media_fid']);
    $query->fields('sp', ['field_sidebar_promo_value']);
    $query->condition('b.entity_id', $nid);
    $data = $query->execute()->fetchObject();
    $row->setSourceProperty('Body', $data->body_value);
    if (isset($data->field_role_access_value)) {
      $row->setSourceProperty('Role Access', 6580154);
    }
    $row->setSourceProperty('Hero Body', $data->field_hero_title_value);
    $row->setSourceProperty('Hero Title', $data->field_hero_title_value);
    $row->setSourceProperty('Desc', $data->field_desciption_value);
    $row->setSourceProperty('Image FID', $data->field_primary_media_fid);
    $row->setSourceProperty('Sidebar', $data->field_sidebar_promo_value);
    parent::prepareRow($row);
  }

}
