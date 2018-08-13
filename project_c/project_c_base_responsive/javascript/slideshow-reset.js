// Resets the old jQuery cycle slideshow on window resize.
// TODO: Consider merging this into project_c_base/javascript/script.js

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
var debounce = function(func, wait, immediate) {
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

var reset_slideshow = function() {
  var slideshow = $('.slideshow');

  // Destroy the slideshow and clear the inline styles, especially the
  // hardcoded widths.
  slideshow.cycle('destroy');
  slideshow.find('.slide').andSelf().removeAttr('style');

  // Re-create the slideshow. These settings should be the same as those in
  // Drupal.behaviors.project_cBaseTheme.attach().
  slideshow.cycle({
    fx: 'fade',
    timeout: 7000,
    pager: '.slideshow-pager',
    pagerAnchorBuilder: function() {
      return '<a href="#">'+'\u2014'+'</a>';
    },
    fit: 1,
    width: slideshow.parent().width() // This one's for you, IE!
  });
};

$(window).resize(Drupal.debounce(reset_slideshow, 250));

// Safari calculates the slideshow height before the image sizes are known, so
// reset the slideshow on window load, which happens later than document ready.
$(window).bind('load', reset_slideshow);

})(jQuery);
