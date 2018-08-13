<?php

namespace Drupal\micro;

use Drupal\micro\Entity\MicroType;
use Drupal\Core\Routing\UrlGeneratorTrait;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Provides dynamic permissions for micro entities of different types.
 */
class MicroPermissions {

  use StringTranslationTrait;
  use UrlGeneratorTrait;

  /**
   * Returns an array of micro type permissions.
   *
   * @return array
   *   The micro type permissions.
   *
   * @see \Drupal\user\PermissionHandlerInterface::getPermissions()
   */
  public function microTypePermissions() {
    $perms = [];
    // Generate micro permissions for all micro types.
    foreach (MicroType::loadMultiple() as $type) {
      $perms += $this->buildPermissions($type);
    }

    return $perms;
  }

  /**
   * Returns a list of micro permissions for a given micro type.
   *
   * @param \Drupal\micro\Entity\MicroType $type
   *   The micro type.
   *
   * @return array
   *   An associative array of permission names and descriptions.
   */
  protected function buildPermissions(MicroType $type) {
    $type_id = $type->id();
    $type_params = ['%type_name' => $type->label()];

    return [
      "create $type_id content" => [
        'title' => $this->t('%type_name: Create new content', $type_params),
      ],
      "edit any $type_id content" => [
        'title' => $this->t('%type_name: Edit any content', $type_params),
      ],
      "delete any $type_id content" => [
        'title' => $this->t('%type_name: Delete any content', $type_params),
      ],
      "view $type_id revisions" => [
        'title' => $this->t('%type_name: View revisions', $type_params),
        'description' => t('To view a revision, you also need permission to view the content item.'),
      ],
    ];
  }

}
