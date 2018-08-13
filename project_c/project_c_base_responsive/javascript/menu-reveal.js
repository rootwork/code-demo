(function ($) {
Drupal.behaviors.PROJECT_CCore_menu = {
  attach: function (context, settings) {
    // menu trigger onclick
    $('.menu-revealer', context).once().click(function() {
      $('body').removeClass('js-search-is-active');
      $('body').toggleClass('js-menu-is-active');
    });
  }
};
})(jQuery);
