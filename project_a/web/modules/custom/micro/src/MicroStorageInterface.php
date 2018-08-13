<?php

namespace Drupal\micro;

use Drupal\Core\Entity\ContentEntityStorageInterface;
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
interface MicroStorageInterface extends ContentEntityStorageInterface {

  /**
   * Gets a list of Micro Content revision IDs for a specific Micro Content.
   *
   * @param \Drupal\micro\Entity\MicroInterface $entity
   *   The Micro Content entity.
   *
   * @return int[]
   *   Micro Content revision IDs (in ascending order).
   */
  public function revisionIds(MicroInterface $entity);

  /**
   * Gets a list of revision IDs having a given user as Micro Content author.
   *
   * @param \Drupal\Core\Session\AccountInterface $account
   *   The user entity.
   *
   * @return int[]
   *   Micro Content revision IDs (in ascending order).
   */
  public function userRevisionIds(AccountInterface $account);

  /**
   * Counts the number of revisions in the default language.
   *
   * @param \Drupal\micro\Entity\MicroInterface $entity
   *   The Micro Content entity.
   *
   * @return int
   *   The number of revisions in the default language.
   */
  public function countDefaultLanguageRevisions(MicroInterface $entity);

  /**
   * Unsets the language for all Micro Content with the given language.
   *
   * @param \Drupal\Core\Language\LanguageInterface $language
   *   The language object.
   */
  public function clearRevisionsLanguage(LanguageInterface $language);

}
