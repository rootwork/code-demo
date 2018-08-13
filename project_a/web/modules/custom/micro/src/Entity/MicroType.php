<?php

namespace Drupal\micro\Entity;

use Drupal\Core\Config\Entity\ConfigEntityBundleBase;

/**
 * Defines the Micro Content type entity.
 *
 * @ConfigEntityType(
 *   id = "micro_type",
 *   label = @Translation("Micro Content type"),
 *   handlers = {
 *     "view_builder" = "Drupal\Core\Entity\EntityViewBuilder",
 *     "list_builder" = "Drupal\micro\MicroTypeListBuilder",
 *     "form" = {
 *       "add" = "Drupal\micro\Form\MicroTypeForm",
 *       "edit" = "Drupal\micro\Form\MicroTypeForm",
 *       "delete" = "Drupal\micro\Form\MicroTypeDeleteForm"
 *     },
 *     "route_provider" = {
 *       "html" = "Drupal\micro\MicroTypeHtmlRouteProvider",
 *     },
 *   },
 *   config_prefix = "micro_type",
 *   admin_permission = "administer site configuration",
 *   bundle_of = "micro",
 *   entity_keys = {
 *     "id" = "id",
 *     "label" = "label",
 *     "uuid" = "uuid"
 *   },
 *   links = {
 *     "canonical" = "/admin/structure/micro_type/{micro_type}",
 *     "add-form" = "/admin/structure/micro_type/add",
 *     "edit-form" = "/admin/structure/micro_type/{micro_type}/edit",
 *     "delete-form" = "/admin/structure/micro_type/{micro_type}/delete",
 *     "collection" = "/admin/structure/micro_type"
 *   }
 * )
 */
class MicroType extends ConfigEntityBundleBase implements MicroTypeInterface {

  /**
   * The Micro Content type ID.
   *
   * @var string
   */
  protected $id;

  /**
   * The Micro Content type label.
   *
   * @var string
   */
  protected $label;

}
