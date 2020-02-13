'use strict';

(function () {
  var ENTER_KEY = 'Enter';
  var ESC = 'Escape';

  var adsArr = [];

  var randomDigitFromTo = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
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
    ENTER_KEY: ENTER_KEY,
    ESC: ESC,
    randomDigitFromTo: randomDigitFromTo,
    getElementCenter: getElementCenter,
    getElementBottom: getElementBottom,
    shuffle: shuffle,
    adsArr: adsArr
  };
})();
