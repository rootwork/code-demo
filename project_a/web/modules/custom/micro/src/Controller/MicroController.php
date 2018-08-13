<?php

namespace Drupal\micro\Controller;

use Drupal\Component\Utility\Xss;
use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\DependencyInjection\ContainerInjectionInterface;
use Drupal\Core\Url;
use Drupal\micro\Entity\MicroInterface;

/**
 * Class MicroController.
 *
 *  Returns responses for Micro Content routes.
 */
class MicroController extends ControllerBase implements ContainerInjectionInterface {

  /**
   * Displays a Micro Content  revision.
   *
   * @param int $micro_revision
   *   The Micro Content  revision ID.
   *
   * @return array
   *   An array suitable for drupal_render().
   */
  public function revisionShow($micro_revision) {
    $micro = $this->entityManager()->getStorage('micro')->loadRevision($micro_revision);
    $view_builder = $this->entityManager()->getViewBuilder('micro');

    return $view_builder->view($micro);
  }

  /**
   * Page title callback for a Micro Content  revision.
   *
   * @param int $micro_revision
   *   The Micro Content  revision ID.
   *
   * @return string
   *   The page title.
   */
  public function revisionPageTitle($micro_revision) {
    $micro = $this->entityManager()->getStorage('micro')->loadRevision($micro_revision);
    return $this->t('Revision of %title from %date', ['%title' => $micro->label(), '%date' => format_date($micro->getRevisionCreationTime())]);
  }

  /**
   * Generates an overview table of older revisions of a Micro Content .
   *
   * @param \Drupal\micro\Entity\MicroInterface $micro
   *   A Micro Content  object.
   *
   * @return array
   *   An array as expected by drupal_render().
   */
  public function revisionOverview(MicroInterface $micro) {
    $account = $this->currentUser();
    $langcode = $micro->language()->getId();
    $langname = $micro->language()->getName();
    $languages = $micro->getTranslationLanguages();
    $has_translations = (count($languages) > 1);
    $micro_storage = $this->entityManager()->getStorage('micro');

    $build['#title'] = $has_translations ? $this->t('@langname revisions for %title', ['@langname' => $langname, '%title' => $micro->label()]) : $this->t('Revisions for %title', ['%title' => $micro->label()]);
    $header = [$this->t('Revision'), $this->t('Operations')];

    $revert_permission = (($account->hasPermission("revert all micro content revisions") || $account->hasPermission('administer micro content entities')));
    $delete_permission = (($account->hasPermission("delete all micro content revisions") || $account->hasPermission('administer micro content entities')));

    $rows = [];

    $vids = $micro_storage->revisionIds($micro);

    $latest_revision = TRUE;

    foreach (array_reverse($vids) as $vid) {
      /** @var \Drupal\micro\MicroInterface $revision */
      $revision = $micro_storage->loadRevision($vid);
      // Only show revisions that are affected by the language that is being
      // displayed.
      if ($revision->hasTranslation($langcode) && $revision->getTranslation($langcode)->isRevisionTranslationAffected()) {
        $username = [
          '#theme' => 'username',
          '#account' => $revision->getRevisionUser(),
        ];

        // Use revision link to link to revisions that are not active.
        $date = \Drupal::service('date.formatter')->format($revision->getRevisionCreationTime(), 'short');
        if ($vid != $micro->getRevisionId()) {
          $link = $this->l($date, new Url('entity.micro.revision', ['micro' => $micro->id(), 'micro_revision' => $vid]));
        }
        else {
          $link = $micro->link($date);
        }

        $row = [];
        $column = [
          'data' => [
            '#type' => 'inline_template',
            '#template' => '{% trans %}{{ date }} by {{ username }}{% endtrans %}{% if message %}<p class="revision-log">{{ message }}</p>{% endif %}',
            '#context' => [
              'date' => $link,
              'username' => \Drupal::service('renderer')->renderPlain($username),
              'message' => ['#markup' => $revision->getRevisionLogMessage(), '#allowed_tags' => Xss::getHtmlTagList()],
            ],
          ],
        ];
        $row[] = $column;

        if ($latest_revision) {
          $row[] = [
            'data' => [
              '#prefix' => '<em>',
              '#markup' => $this->t('Current revision'),
              '#suffix' => '</em>',
            ],
          ];
          foreach ($row as &$current) {
            $current['class'] = ['revision-current'];
          }
          $latest_revision = FALSE;
        }
        else {
          $links = [];
          if ($revert_permission) {
            $links['revert'] = [
              'title' => $this->t('Revert'),
              'url' => $has_translations ?
              Url::fromRoute('entity.micro.translation_revert', [
                'micro' => $micro->id(),
                'micro_revision' => $vid,
                'langcode' => $langcode,
              ]) :
              Url::fromRoute('entity.micro.revision_revert', [
                'micro' => $micro->id(),
                'micro_revision' => $vid,
              ]),
            ];
          }

          if ($delete_permission) {
            $links['delete'] = [
              'title' => $this->t('Delete'),
              'url' => Url::fromRoute('entity.micro.revision_delete', ['micro' => $micro->id(), 'micro_revision' => $vid]),
            ];
          }

          $row[] = [
            'data' => [
              '#type' => 'operations',
              '#links' => $links,
            ],
          ];
        }

        $rows[] = $row;
      }
    }

    $build['micro_revisions_table'] = [
      '#theme' => 'table',
      '#rows' => $rows,
      '#header' => $header,
    ];

    return $build;
  }

}
