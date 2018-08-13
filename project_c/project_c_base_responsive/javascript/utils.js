// Javascript utilities for responsive themes.

(function($) {

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
//
// This is most likely an older version of the debounce function from
// underscore.js
//
// Found here: https://davidwalsh.name/javascript-debounce-function
Drupal.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

// Returns the current breakpoint as defined in `sass/layout/_body.scss`
Drupal.mq = function() {
  var body_after_el = window.getComputedStyle ? window.getComputedStyle(document.body, ':after') : false;
  // Note that quotes are removed here so we get 'small' rather than '"small"'.
  return body_after_el ? body_after_el.getPropertyValue('content').replace(/"/g, '') : 'unknown';
};

})(jQuery);
