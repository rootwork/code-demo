<?php

namespace Drupal\project_a_custom_403\Form;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Path\AliasManagerInterface;
use Drupal\Core\Path\PathValidatorInterface;
use Drupal\Core\Routing\RequestContext;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\system\Form\SiteInformationForm;
use Drupal\Core\State\StateInterface;

/**
 * Configure site information settings for this site.
 */
class CustomSiteInformationForm extends SiteInformationForm {

  /**
   * The system state.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * Constructs a SiteInformationForm object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The factory for configuration objects.
   * @param \Drupal\Core\Path\AliasManagerInterface $alias_manager
   *   The path alias manager.
   * @param \Drupal\Core\Path\PathValidatorInterface $path_validator
   *   The path validator.
   * @param \Drupal\Core\Routing\RequestContext $request_context
   *   The request context.
   * @param \Drupal\Core\State\StateInterface $state
   *   The system state.
   */
  public function __construct(ConfigFactoryInterface $config_factory, AliasManagerInterface $alias_manager, PathValidatorInterface $path_validator, RequestContext $request_context, StateInterface $state) {
    parent::__construct($config_factory, $alias_manager, $path_validator, $request_context);

    $this->state = $state;

  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('path.alias_manager'),
      $container->get('path.validator'),
      $container->get('router.request_context'),
      $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Get the original form from the class we are extending.
    $form = parent::buildForm($form, $form_state);

    // Adjust weights to properly position the 'details' section.
    $form['error_page']['site_403']['#weight'] = 0;
    $form['error_page']['site_403_options'] = [
      '#type' => 'details',
      '#title' => $this->t('403 Pages'),
      '#open' => TRUE,
      '#weight' => 1,
    ];
    $form['error_page']['site_403_options']['site_403_fallback'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Fallback 403 (access denied) page'),
      '#default_value' => $this->state->get('system.site.403_fallback'),
      '#size' => 40,
      '#description' => $this->t('This page is displayed when the requested document is denied to the current user.'),
    ];
    $form['error_page']['site_403_options']['site_403_memberonly'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Member-only 403 (access denied) page'),
      '#default_value' => $this->state->get('system.site.403_member_only'),
      '#size' => 40,
      '#description' => $this->t('This page is displayed when the requested document restricted to members and the current user is denied.'),
    ];
    $form['error_page']['site_404']['#weight'] = 2;

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    // Call validations for other form elements. This is done before validation
    // of the custom textfields due to the fact that the custom textfields are
    // placed almost at the end of the form.
    parent::validateForm($form, $form_state);

    // Validate 403 fallback path for trailing slash and valid path.
    if (($value = $form_state->getValue('site_403_fallback')) && $value[0] !== '/') {
      $form_state->setErrorByName('site_403_fallback', $this->t("The path '%path' has to start with a slash.", ['%path' => $form_state->getValue('site_403_fallback')]));
    }
    if (!$form_state->isValueEmpty('site_403_fallback') && !$this->pathValidator->isValid($form_state->getValue('site_403_fallback'))) {
      $form_state->setErrorByName('site_403_fallback', $this->t("The path '%path' is either invalid or you do not have access to it.", ['%path' => $form_state->getValue('site_403_fallback')]));
    }

    // Validate member only 403 path for trailing slash and valid path.
    if (($value = $form_state->getValue('site_403_memberonly')) && $value[0] !== '/') {
      $form_state->setErrorByName('site_403_memberonly', $this->t("The path '%path' has to start with a slash.", ['%path' => $form_state->getValue('site_403_memberonly')]));
    }
    if (!$form_state->isValueEmpty('site_403_memberonly') && !$this->pathValidator->isValid($form_state->getValue('site_403_memberonly'))) {
      $form_state->setErrorByName('site_403_memberonly', $this->t("The path '%path' is either invalid or you do not have access to it.", ['%path' => $form_state->getValue('site_403_memberonly')]));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    // Instead of saving the custom 403 page to config, save it in state API.
    $this->state->set('system.site.403_fallback', $form_state->getValue('site_403_fallback'));
    $this->state->set('system.site.403_member_only', $form_state->getValue('site_403_memberonly'));

    // Pass the remaining values off to the original form that we have extended,
    // so that they are also saved.
    parent::submitForm($form, $form_state);
  }

}
