(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.scorecard_image_behavior = {
    attach: function (context, settings) {

      $(document).ready(function() {

        // Collapse image upload fields by default.
        $(".scorecard-form .field--type-image summary").attr("aria-expanded", "false").attr("aria-pressed", "false");
        $(".scorecard-form .field--type-image .form-wrapper").removeAttr("open");

      }); // Document ready.

    }
  };

  // We pass the parameters of this anonymous function are the global variables
  // that this script depend on. For example, if the above script requires
  // jQuery, you should change (Drupal) to (jQuery, Drupal) in the line below
  // and, in this file's first line of JS, change function (Drupal) to
  // ($, Drupal)
})(jQuery, Drupal);
