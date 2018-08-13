<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\migrate\Row;
use Drupal\migrate_drupal\Plugin\migrate\source\d7\FieldableEntity;

/**
 * Drupal 7 file_entity source from database.
 *
 * Adapted from https://www.previousnext.com.au/blog/migrating-drupal-7-file-entities-drupal-8-media-entities.
 *
 * @MigrateSource(
 *   id = "file_entity",
 *   source_module = "file",
 *   source_provider = "file"
 * )
 */
class FileEntity extends FieldableEntity {

  /**
   * {@inheritdoc}
   */
  public function query() {
    $query = $this->select('file_managed', 'f')
      ->fields('f')
      ->orderBy('f.fid');
    if (isset($this->configuration['type'])) {
      $query->condition('f.type', $this->configuration['type']);
    }
    else {
      return FALSE;
    }

    return $query;
  }

  /**
   * {@inheritdoc}
   */
  public function prepareRow(Row $row) {
    // Get Field API field values for whichever file type we're working with.
    foreach (array_keys($this->getFields('file', $row->getSourceProperty('type'))) as $field) {
      $fid = $row->getSourceProperty('fid');
      $row->setSourceProperty($field, $this->getFieldValues('file', $field, $fid));
    }
    // Remove <span> tags from field_credit_text so they don't get arbitrarily
    // truncated.
    $credit = $row->getSourceProperty('field_credit_text');
    if (is_array($credit)) {
      $credit[0]['value'] = preg_replace("/<span[^>]*>(.*)<\/span>/", '$1', $credit[0]['value']);
      $row->setSourceProperty('field_credit_text', $credit);
    }
    return parent::prepareRow($row);
  }

  /**
   * {@inheritdoc}
   */
  public function fields() {
    return [
      'fid' => $this->t('File ID'),
      'uid' => $this->t('The {users}.uid who added the file. If set to 0, this file was added by an anonymous user.'),
      'filename' => $this->t('File name'),
      'uri' => $this->t('The URI to access the file'),
      'filemime' => $this->t('File MIME Type'),
      'status' => $this->t('The published status of a file.'),
      'timestamp' => $this->t('The time that the file was added.'),
      'type' => $this->t('The type of this file.'),
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getIds() {
    $ids['fid']['type'] = 'integer';
    return $ids;
  }

}
