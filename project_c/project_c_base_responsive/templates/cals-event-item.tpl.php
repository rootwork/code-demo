<?php

/**
 * @file
 * Responsive base theme implementation to display a PROJECT_C event.
 *
 * Available variables:
 * - $title: The event title.
 * - $start: The start date and time of the event as a DateObject object (from
 *   the date_api module).
 * - $localist_url: The url of the event on the localist site.
 * - $description: The full description of the event.
 * - $description_short: A truncated version of the event description.
 * - $location_name: The name of the location of the event.
 * - $type: The event type value from Localist. (e.g. 'Seminar' or 'Lecture').
 * - $classes: Extra classes for this event item.
 *
 * @see template_preprocess()
 * @see template_preprocess_project_c_event_item()
 *
 * @ingroup themeable
 */
?>

<div class="event <?php print $classes ?>">
  <div class="event__datetime">
    <div class="event__date"><?php print $start->format('M j') ?></div>
    <?php
    // Don't display midnight times. DateObject::hasTime may be better here,
    // but that depends on the Localist time format.
    // http://www.drupalcontrib.org/api/drupal/contributions%21date%21date_api%21date_api.module/function/DateObject%3A%3AhasTime/7
    ?>
    <?php if ($start->format('Gi') !== '0000'): ?>
    <div class="event__datetime-separator">|</div>
    <div class="event__time"><?php print $start->format('g:i a'); ?></div>
    <?php endif; ?>
  </div>
  <h3 class="event__title"><a href="<?php print $localist_url ?>"><?php print $title ?></a></h3>
  <div class="event__summary"><?php print $description_short ?></div>
  <div class="event__location">
    <div class="event__location-label">Location:</div>
    <div class="event__location-item"><?php print $location_name ?></div>
  </div>
  <?php if ($type): ?>
  <div class="event__type">
    <div class="event__type-label">Event type:</div>
    <div class="event__type-item"><?php print $type ?></div>
  </div>
  <?php endif; ?>
</div>
