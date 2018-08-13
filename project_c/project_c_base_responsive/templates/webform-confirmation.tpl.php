<?php

/**
 * @file
 * Customize confirmation screen after successful submission.
 *
 * This file may be renamed "webform-confirmation-[nid].tpl.php" to target a
 * specific webform e-mail on your site. Or you can leave it
 * "webform-confirmation.tpl.php" to affect all webform confirmations on your
 * site.
 *
 * Available variables:
 * - $node: The node object for this webform.
 * - $progressbar: The progress bar 100% filled (if configured). This may not
 *   print out anything if a progress bar is not enabled for this node.
 * - $confirmation_message: The confirmation message input by the webform
 *   author.
 * - $sid: The unique submission ID of this submission.
 * - $url: The URL of the form (or for in-block confirmations, the same page).
 */
?>
<?php print $progressbar; ?>

<div class="messages messages--webform-confirmation">
  <h2 class="element-invisible">Confirmation message</h2>
  <div class="messages__icon">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 64 64">
      <path d="M54 8l-30 30-14-14-10 10 24 24 40-40z" fill="#000000"></path>
    </svg>
  </div>
  <?php if ($confirmation_message): ?>
    <div class="messages__message"><?php print $confirmation_message ?></div>
  <?php else: ?>
    <div class="messages__message"><?php print t('Thank you, your submission has been received.'); ?></div>
  <?php endif; ?>
</div>

<div class="links">
  <a href="<?php print $url; ?>"><?php print t('Go back to the form') ?></a>
</div>
