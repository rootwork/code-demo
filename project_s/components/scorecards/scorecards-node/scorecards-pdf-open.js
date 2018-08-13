(function ($, Drupal) {
  'use strict';
    $(document).ready(function() {

      // Open scorecard PDFs in a new window or tab (depending on user
      // settings).
      $('.print__wrapper .print__link').click(function() {
        $(this).attr('target', '_blank');
      });

    }); // Document ready.
})(jQuery, Drupal);

