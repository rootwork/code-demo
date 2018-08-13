(function ($, Drupal) {
  'use strict';
    $(document).ready(function() {

      // Hide everything but the school field by default; disable submission.
      $('.js .scorecard-form--add:not(.node-scorecard-edit-form) #scorecard-group-main').hide();
      $('.js .scorecard-form--add:not(.node-scorecard-edit-form) #edit-actions .form-submit').prop('disabled', true);

      // If the form is in error state, show the form and enable submission.
      $('.js .messages--error ~ .scorecard-form--add:not(.node-scorecard-edit-form) #scorecard-group-main').show();
      $('.js .messages--error ~ .scorecard-form--add:not(.node-scorecard-edit-form) #edit-actions .form-submit').prop('disabled', false);

      // When a school is selected, show the form and enable submission.
      $('.js .scorecard-form--add:not(.node-scorecard-edit-form) #edit-field-school').change(function() {
        if ($(this).children('option:first-child').is(':selected')) {
          $('#scorecard-group-main').hide();
          $('#edit-actions .form-submit').prop('disabled', true);
        }
        else{
          $('#scorecard-group-main').show();
          $('#edit-actions .form-submit').prop('disabled', false);
        }
      });

      // Move the school field help text above the input field.
      $('.js .scorecard-form--add #edit-field-school--description').insertBefore('.js #edit-field-school');
      // Remove the help text entirely on edit forms.
      $('.js .scorecard-form--add.node-scorecard-edit-form #edit-field-school--description').remove();

    }); // Document ready.
})(jQuery, Drupal);

