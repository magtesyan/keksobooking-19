'use strict';

(function () {
  var mapPinElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  var clearPins = function () {
    mapPinElement.querySelectorAll('button').forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
    if (window.map.mapBlock.querySelector('.map__card')) {
      window.map.mapBlock.querySelector('.map__card').remove();
    }
  };

  var createPin = function (pin) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.top = (pin.location.y + 10) + 'px';
    pinElement.style.left = (pin.location.x + 10) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.title;
    return pinElement;
  };

  var addPin = function (arr) {
    clearPins();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(5, arr.length); i++) {
      fragment.appendChild(createPin(arr[i]));
    }
    mapPinElement.appendChild(fragment);
  };

  window.pin = {
    addPin: addPin,
    mapPinElement: mapPinElement,
    clearPins: clearPins
  };
})();
