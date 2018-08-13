(function ($) {
Drupal.behaviors.project_c_base_resp_search_reveal = {
  attach: function (context, settings) {
    var search_form = $('.search-form', context);
    var logo = $('.logo', context);

    // Don't add the search toggle if there's no form. This could happen if
    // the custom search hasn't been configured, yet.
    if (search_form.length === 0) {
      return;
    }

    // Also don't add the search toggle if we're not on a small viewport.
    if (Drupal.mq() !== 'small') {
      return;
    }

    var search_toggler = $('<div />').addClass('search-toggle').text('search');

    search_toggler.bind('click', function(ev) {
      search_form.slideToggle(50, function() {
        if (search_form.is(':visible')) {
          search_toggler.css('top', (search_form.outerHeight() + (logo.outerHeight() / 2)));
          search_form.find('input[type=text]').focus();
        }
        else {
          search_toggler.css('top', (logo.outerHeight() / 2));
        }
      });
    }).trigger('click');

    $('.header').append(search_toggler);
  }
};
})(jQuery);
