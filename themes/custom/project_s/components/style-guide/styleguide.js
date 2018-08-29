// @file
// Javascript applying only to the KSS style guide.
//

//
// Slideout menu
//
// @see https://mango.github.io/slideout/
//

document.querySelector('.kss-main').id = 'panel';
document.querySelector('.kss-sidebar').id = 'menu';

var toggleItem = document.createElement('div');
toggleItem.setAttribute('class','toggle-button');
document.body.insertBefore(toggleItem, document.body.firstChild);

var slideout = new Slideout({
  'panel': document.getElementById('panel'),
  'menu': document.getElementById('menu'),
  'padding': 256,
  'tolerance': 70
});

document.querySelector('.toggle-button').addEventListener('click', function() {
  slideout.toggle();
});
