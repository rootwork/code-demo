// Javascript functions to enable desktop layout without messing with HTML
// source order.

(function($) {

var reset_layout = function() {
  var content_header = $('.content__header');
  var sidebar_left = $('.sidebar--left');

  // If there is no image in the content header, bail.
  if (content_header.find('img').length !== 1) {
    return;
  }

  // If this isn't the large breakpoint, clear adjustments and bail.
  if (Drupal.mq() !== 'large') {
    content_header.css('margin-left', '');
    sidebar_left.css('margin-top', '');
    return;
  }

  content_header.css('margin-left', sidebar_left.width());
  sidebar_left.css('margin-top', content_header.height() * -1);
};

$(window).resize(Drupal.debounce(reset_layout, 250));

// Safari calculates the header image height before the image sizes are known,
// so reset the layout on window load, which happens later than document ready.
$(window).bind('load', reset_layout);

})(jQuery);
