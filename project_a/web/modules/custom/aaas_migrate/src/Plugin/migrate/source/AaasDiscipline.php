<?php

namespace Drupal\project_a_migrate\Plugin\migrate\source;

use Drupal\migrate\Plugin\migrate\source\SourcePluginBase;

/**
 * Source plugin to import TaxoSim data from JSON file.
 *
 * Adapted gratefully from
 * https://www.metaltoad.com/blog/drupal-8-migrating-data-json-files.
 *
 * @MigrateSource(
 *   id = "project_a_discipline",
 *   source_module = "json"
 * )
 */
class Project_aDiscipline extends SourcePluginBase {

  /**
   * Return IDs.
   */
  public function getIds() {
    $ids = [
      'tId' => [
        'type' => 'string',
      ],
    ];
    return $ids;
  }

  /**
   * Define fields.
   */
  public function fields() {
    return [
      'tId' => $this->t('term ID'),
      'parent' => $this->t('Parent'),
    ];
  }

  /**
   * Return data as string.
   */
  public function __toString() {
    return "json data";
  }

  /**
   * Initializes the iterator with the source data.
   *
   * @return \Iterator
   *   An iterator containing the data for this source.
   */
  protected function initializeIterator() {

    // Loop through the source files and find anything with a .json extension.
    $filename = dirname(DRUPAL_ROOT) . "/migration_data/taxosim_disciplines.json";
    $json = json_decode(file_get_contents($filename));

    $rows = [];
    $rows = $this->recurse($json, 0, $rows);

    // Migrate needs an Iterator class, not just an array.
    return new \ArrayIterator($rows);
  }

  /**
   * Traverse hierarchy of json document for nested terms.
   */
  protected function recurse($array, $parent, $rows) {
    foreach ($array as $item) {
      $rows[] = ['tId' => $item->tId, 'parent' => $parent];
      if (isset($item->nTs) && is_array($item->nTs)) {
        $rows = $this->recurse($item->nTs, $item->tId, $rows);
      }
    }
    return $rows;
  }

}
