<?php

namespace Drupal\micro;

use Drupal\Core\Entity\Sql\SqlContentEntityStorage;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\Language\LanguageInterface;
use Drupal\micro\Entity\MicroInterface;

/**
 * Defines the storage handler class for Micro Content entities.
 *
 * This extends the base storage class, adding required special handling for
 * Micro Content entities.
 *
 * @ingroup micro
 */
class MicroStorage extends SqlContentEntityStorage implements MicroStorageInterface {

  /**
   * {@inheritdoc}
   */
  public function revisionIds(MicroInterface $entity) {
    return $this->database->query(
      'SELECT vid FROM {micro_revision} WHERE id=:id ORDER BY vid',
      [':id' => $entity->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function userRevisionIds(AccountInterface $account) {
    return $this->database->query(
      'SELECT vid FROM {micro_field_revision} WHERE uid = :uid ORDER BY vid',
      [':uid' => $account->id()]
    )->fetchCol();
  }

  /**
   * {@inheritdoc}
   */
  public function countDefaultLanguageRevisions(MicroInterface $entity) {
    return $this->database->query('SELECT COUNT(*) FROM {micro_field_revision} WHERE id = :id AND default_langcode = 1', [':id' => $entity->id()])
      ->fetchField();
  }

  /**
   * {@inheritdoc}
   */
  public function clearRevisionsLanguage(LanguageInterface $language) {
    return $this->database->update('micro_revision')
      ->fields(['langcode' => LanguageInterface::LANGCODE_NOT_SPECIFIED])
      ->condition('langcode', $language->getId())
      ->execute();
  }

}
