jQuery(document).ready(function() {
  /*
   * Simple "other" field checkbox/textfield toggle.
   *
   * There is currently a bug with the Conditional Fields module:
   * https://www.drupal.org/node/2875150
   *
   * Once that bug is fixed, this can be configured through the field itself
   * and this custom code can be removed.
   */
  var otherTextFieldContainer = jQuery('.user--register .field--name-field-role-other, .user--profile .field--name-field-role-other');
  var otherCheckbox = jQuery('.user--register .form-item-field-role-other, .user--profile .form-item-field-role-other').find('input');

  otherTextFieldContainer.hide();

  otherCheckbox.change(function() {
    if(this.checked) otherTextFieldContainer.show();
    else otherTextFieldContainer.hide();
  });

  /*
   * Move help text to the top of field.
   */
  var helpText = jQuery('.user--register .field--name-field-role .description, .user--profile .field--name-field-role .description');
  var fieldLabel = jQuery('.user--register .field--name-field-role, .user--profile .field--name-field-role').find('.fieldset-legend');
  fieldLabel.after(helpText);
});
