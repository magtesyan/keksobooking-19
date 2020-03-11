'use strict';

(function () {
  var Keyboard = {
    ENTER_KEY: 'Enter',
    ESC: 'Escape'
  };

  var randomDigitFromTo = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getElementCenter = function (element) {
    var coordinates = element.getBoundingClientRect();
    return (Math.round((coordinates.right - coordinates.left) / 2 + coordinates.left) + ', ' + Math.round((coordinates.bottom - coordinates.top) / 2 + coordinates.top));
  };

  var getElementBottom = function (element) {
    var coordinates = element.getBoundingClientRect();
    return (Math.round((coordinates.right - coordinates.left) / 2 + coordinates.left) + ', ' + Math.round(coordinates.bottom));
  };

  window.util = {
    Keyboard: Keyboard,
    randomDigitFromTo: randomDigitFromTo,
    getElementCenter: getElementCenter,
    getElementBottom: getElementBottom
  };
})();
