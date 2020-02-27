'use strict';

(function () {
  var FILTER_DEFAULT = 'any';
  var filterForm = document.querySelector('.map__filters');

  var filterPins = function (pins) {
    var sortedArray = [];
    window.pin.addPin(pins);

    filterForm.addEventListener('change', function (evt) {
      if (evt.target.value !== FILTER_DEFAULT) {
        sortedArray = (pins.filter(function (el) {
          return el.offer.type === evt.target.value;
        }));
      } else {
        sortedArray = pins;
      }
      window.pin.addPin(sortedArray);
    });
  };

  window.filter = {
    filterPins: filterPins
  };
})();
