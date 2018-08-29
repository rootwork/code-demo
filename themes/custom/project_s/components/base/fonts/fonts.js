(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.project_s_fonts = {
    attach: function (context, settings) {

      // Load custom fonts
      var fontCabin = new FontFaceObserver('Cabin');
      var fontNexaRustSansBlack = new FontFaceObserver('NexaRustSansBlack');
      var fontMosk = new FontFaceObserver('Mosk');

      fontCabin.load().then(function () {
        document.documentElement.className += " font-cabin-loaded";
      }, function () {
        // console.log('Cabin is not available');
      });

      fontNexaRustSansBlack.load().then(function () {
        document.documentElement.className += " font-nexa-loaded";
      }, function () {
        // console.log('NexaRustSansBlack is not available');
      });

      fontMosk.load().then(function () {
        document.documentElement.className += " font-mosk-loaded";
      }, function () {
        // console.log('Mosk is not available');
      });

    }
  };

})(jQuery, Drupal);
