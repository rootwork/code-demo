<?php

namespace Drupal\micro\Entity;

use Drupal\Core\Entity\RevisionLogInterface;
use Drupal\Core\Entity\RevisionableInterface;
use Drupal\Core\Entity\EntityChangedInterface;
use Drupal\user\EntityOwnerInterface;

/**
 * Provides an interface for defining Micro Content entities.
 *
 * @ingroup micro
 */
interface MicroInterface extends RevisionableInterface, RevisionLogInterface, EntityChangedInterface, EntityOwnerInterface {

  /**
   * Gets the Micro Content name.
   *
   * @return string
   *   Name of the Micro Content.
   */
  public function getName();

  /**
   * Sets the Micro Content name.
   *
   * @param string $name
   *   The Micro Content name.
   *
   * @return \Drupal\micro\Entity\MicroInterface
   *   The called Micro Content entity.
   */
  public function setName($name);

  /**
   * Gets the Micro Content creation timestamp.
   *
   * @return int
   *   Creation timestamp of the Micro Content.
   */
  public function getCreatedTime();

  /**
   * Sets the Micro Content creation timestamp.
   *
   * @param int $timestamp
   *   The Micro Content creation timestamp.
   *
   * @return \Drupal\micro\Entity\MicroInterface
   *   The called Micro Content entity.
   */
  public function setCreatedTime($timestamp);

  /**
   * Returns the Micro Content published status indicator.
   *
   * Unpublished Micro Content are only visible to restricted users.
   *
   * @return bool
   *   TRUE if the Micro Content is published.
   */
  public function isPublished();

  /**
   * Sets the published status of a Micro Content.
   *
   * @param bool $published
   *   TRUE to set this Micro Content to published, FALSE to set it to
   *   unpublished.
   *
   * @return \Drupal\micro\Entity\MicroInterface
   *   The called Micro Content entity.
   */
  public function setPublished($published);

  /**
   * Gets the Micro Content revision creation timestamp.
   *
   * @return int
   *   The UNIX timestamp of when this revision was created.
   */
  public function getRevisionCreationTime();

  /**
   * Sets the Micro Content revision creation timestamp.
   *
   * @param int $timestamp
   *   The UNIX timestamp of when this revision was created.
   *
   * @return \Drupal\micro\Entity\MicroInterface
   *   The called Micro Content entity.
   */
  public function setRevisionCreationTime($timestamp);

  /**
   * Gets the Micro Content revision author.
   *
   * @return \Drupal\user\UserInterface
   *   The user entity for the revision author.
   */
  public function getRevisionUser();

  /**
   * Sets the Micro Content revision author.
   *
   * @param int $uid
   *   The user ID of the revision author.
   *
   * @return \Drupal\micro\Entity\MicroInterface
   *   The called Micro Content entity.
   */
  public function setRevisionUserId($uid);

}
