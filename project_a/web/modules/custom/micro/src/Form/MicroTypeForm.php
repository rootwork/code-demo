<?php

namespace Drupal\micro\Form;

use Drupal\Core\Entity\EntityForm;
use Drupal\Core\Form\FormStateInterface;

/**
 * Class MicroTypeForm.
 */
class MicroTypeForm extends EntityForm {

  /**
   * {@inheritdoc}
   */
  public function form(array $form, FormStateInterface $form_state) {
    $form = parent::form($form, $form_state);

    $micro_type = $this->entity;
    $form['label'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Label'),
      '#maxlength' => 255,
      '#default_value' => $micro_type->label(),
      '#description' => $this->t("Label for the Micro Content type."),
      '#required' => TRUE,
    ];

    $form['id'] = [
      '#type' => 'machine_name',
      '#default_value' => $micro_type->id(),
      '#machine_name' => [
        'exists' => '\Drupal\micro\Entity\MicroType::load',
      ],
      '#disabled' => !$micro_type->isNew(),
    ];

    /* You will need additional form elements for your custom properties. */

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function save(array $form, FormStateInterface $form_state) {
    $micro_type = $this->entity;
    $status = $micro_type->save();

    switch ($status) {
      case SAVED_NEW:
        drupal_set_message($this->t('Created the %label Micro Content type.', [
          '%label' => $micro_type->label(),
        ]));
        break;

      default:
        drupal_set_message($this->t('Saved the %label Micro Content type.', [
          '%label' => $micro_type->label(),
        ]));
    }
    $form_state->setRedirectUrl($micro_type->toUrl('collection'));
  }

}
