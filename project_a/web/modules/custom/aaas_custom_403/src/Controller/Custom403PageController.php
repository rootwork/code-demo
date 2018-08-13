<?php

namespace Drupal\project_a_custom_403\Controller;

use Drupal\Core\Path\AliasManager;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Controller\ControllerBase;
use Drupal\node\Entity\Node;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\HttpKernel\HttpKernelInterface;
use Symfony\Component\HttpFoundation\Request;

/**
 * Controller class for custom 403 page.
 */
class Custom403PageController extends ControllerBase {

  /**
   * The system state.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  private $state;

  /**
   * Symphony HTTP Kernel object for redirection.
   *
   * @var \Symfony\Component\HttpKernel\HttpKernelInterface
   */
  private $httpKernel;

  /**
   * Alias manager object to check if the restricted node has an alias.
   *
   * @var Drupal\Core\Path\AliasManager
   */
  private $aliasManager;

  /**
   * Custom403PageController constructor.
   *
   * @param \Drupal\Core\State\StateInterface $state
   *   Configuration object used to retrieve settings.
   * @param \Symfony\Component\HttpKernel\HttpKernelInterface $http_kernel
   *   Symphony HTTP Kernel object for redirection.
   * @param Drupal\Core\Path\AliasManager $alias_manager
   *   Alias manager object to check if the restricted node has an alias.
   */
  public function __construct(StateInterface $state, HttpKernelInterface $http_kernel, AliasManager $alias_manager) {

    $this->state = $state;
    $this->httpKernel = $http_kernel;
    $this->aliasManager = $alias_manager;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {

    $state = $container->get('state');
    $http_kernel = $container->get('http_kernel');
    $alias_manager = $container->get('path.alias_manager');
    return new static($state, $http_kernel, $alias_manager);
  }

  /**
   * Tiny controller responsible to display proper 403 page.
   */
  public function display403() {

    // Get the state of the fallback page and member-only page.
    $fallback_page = $this->state->get('system.site.403_fallback');
    $memberonly_page = $this->state->get('system.site.403_member_only');

    // Determine if this was a member only page.
    if ($memberonly_page) {
      // Get the canonical node path, if the node has an alias.
      $path = $this->aliasManager->getPathByAlias($_SERVER['REQUEST_URI']);
      $nid = (int) str_replace('/node/', '', $path);
      $node = Node::load($nid);

      $field_role_access_rid = NULL;
      // Check if the current node has the role access field.
      if (is_object($node) && $node->hasField('field_role_access')) {
        $field_role_access_arr = $node->get('field_role_access')->getValue();
        // Get the numeric rid value from the node field added by the custom
        // project_a_role_access module.
        if (!empty($field_role_access_arr)) {
          $field_role_access_rid = (int) $field_role_access_arr[0]['value'];
        }
        // Get the numeric id of the 'member' role.
        $member_rid = 0;
        if ($val = is_callable('project_a_role_access_get_role_int')) {
          $member_rid = project_a_role_access_get_role_int('member');
        }

        // If the rid of the field and 'member' role matches, show the
        // Member only 403 page.
        if ($field_role_access_rid == $member_rid) {
          $subrequest = Request::create($memberonly_page);
          return $this->httpKernel->handle($subrequest, HttpKernelInterface::SUB_REQUEST);
        }
      }
    }

    // If there was a fallback 403 page, show that.
    if ($fallback_page) {
      $subrequest = Request::create($fallback_page);
      return $this->httpKernel->handle($subrequest, HttpKernelInterface::SUB_REQUEST);
    }

    // If there is no fallback 403, return the text for the Access Denied page.
    // This is done because the controller needs to return a valid response.
    // Title of the page is taken from the route settings.
    return [
      '#markup' => $this->t('You are not authorized to access this page.'),
    ];
  }

}
