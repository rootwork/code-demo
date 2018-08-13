(function($) {
  Drupal.behaviors.subitemMenu = {
    attach: function(context, settings) {

      // Clone menu item to use as trigger.
      $('.navigation--primary > .menu .expanded > a').each(function() {
        $(this).clone().text('Expand').appendTo(this).addClass('js-sub-menu-revealer')
      });

      // Check to see if there are open menus, then toggle.
      $('.js-sub-menu-revealer').click(function(ev) {
        $(this).parent().parent().siblings().removeClass('js-sub-menu-is-active');
        $(this).parent().parent().toggleClass('js-sub-menu-is-active');
        ev.preventDefault();
      }).filter('.active-trail').trigger('click');
    }
  };
})(jQuery);
