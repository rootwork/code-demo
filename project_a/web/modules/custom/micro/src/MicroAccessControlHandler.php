<?php

namespace Drupal\micro;

use Drupal\Core\Entity\EntityAccessControlHandler;
use Drupal\Core\Entity\EntityInterface;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Access\AccessResult;

/**
 * Access controller for the Micro Content entity.
 *
 * @see \Drupal\micro\Entity\Micro.
 */
class MicroAccessControlHandler extends EntityAccessControlHandler {

  /**
   * {@inheritdoc}
   */
  protected function checkAccess(EntityInterface $entity, $operation, AccountInterface $account) {
    if ($account->hasPermission('administer micro content entities')) {
      return AccessResult::allowed()->cachePerPermissions();
    }

    $type = $entity->bundle();

    switch ($operation) {
      case 'view':
        $access_result = AccessResult::allowedIf($account->hasPermission('view published micro content entities') && $entity->isPublished())
          ->cachePerPermissions()
          ->addCacheableDependency($entity);
        if (!$access_result->isAllowed()) {
          $access_result->setReason("The 'view published micro content entities' permission is required and the micro content item must be published.");
        }
        return $access_result;

      case 'update':
        if ($account->hasPermission('edit any ' . $type . ' content')) {
          return AccessResult::allowed()->cachePerPermissions();
        }
        if ($account->hasPermission('edit micro content entities')) {
          return AccessResult::allowed()->cachePerPermissions();
        }
        return AccessResult::neutral()->cachePerPermissions();

      case 'delete':
        if ($account->hasPermission('delete any ' . $type . ' content')) {
          return AccessResult::allowed()->cachePerPermissions();
        }
        if ($account->hasPermission('delete micro content entities')) {
          return AccessResult::allowed()->cachePerPermissions();
        }
        return AccessResult::neutral()->cachePerPermissions();

      default:
        return AccessResult::neutral()->cachePerPermissions();
    }
  }

  /**
   * {@inheritdoc}
   */
  protected function checkCreateAccess(AccountInterface $account, array $context, $entity_bundle = NULL) {
    $permissions = [
      'administer micro content entities',
      'add micro content entities',
      'create ' . $entity_bundle . ' content',
    ];
    return AccessResult::allowedIfHasPermissions($account, $permissions, 'OR');
  }

}
