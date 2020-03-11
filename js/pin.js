'use strict';

(function () {
  var mapMarkElement = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('button');

  var clear = function () {
    mapMarkElement.querySelectorAll('button').forEach(function (element) {
      if (!element.classList.contains('map__pin--main')) {
        element.remove();
      }
    });
    if (window.map.circuit.querySelector('.map__card')) {
      window.map.circuit.querySelector('.map__card').remove();
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

  var addMark = window.debounce.setDelay(function (arr) {
    clear();
    var fragment = document.createDocumentFragment();
    arr.slice(0, Math.min(5, arr.length)).forEach(function (el) {
      fragment.appendChild(createPin(el));
    });
    mapMarkElement.appendChild(fragment);
  });

  window.pin = {
    addMark: addMark,
    mapMarkElement: mapMarkElement,
    clear: clear
  };
})();
