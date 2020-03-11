'use strict';

(function () {
  var FILTER_DEFAULT = 'any';
  var MID_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var paremetersForm = document.querySelector('.map__filters');
  var filterHousingType = paremetersForm.querySelector('#housing-type');
  var filterHousingPrice = paremetersForm.querySelector('#housing-price');
  var filterHousingRooms = paremetersForm.querySelector('#housing-rooms');
  var filterHousingGuests = paremetersForm.querySelector('#housing-guests');
  var filterHousingFeatures = paremetersForm.querySelector('#housing-features').querySelectorAll('input');
  var sortedPins = [];

  var filterCheckbox = function (element) {
    if (element.checked) {
      sortedPins = (sortedPins.filter(function (el) {
        return el.offer.features.indexOf(element.value) !== -1;
      }));
    }
  };

  var siftPins = function (pins) {
    window.pin.addMark(pins);

    paremetersForm.addEventListener('change', function () {
      sortedPins = pins;
      if (filterHousingType.value !== FILTER_DEFAULT) {
        sortedPins = (sortedPins.filter(function (el) {
          return el.offer.type === filterHousingType.value;
        }));
      }
      if (filterHousingPrice.value !== FILTER_DEFAULT) {
        sortedPins = (sortedPins.filter(function (el) {
          var condition;
          switch (filterHousingPrice.value) {
            case 'low':
              condition = parseInt(el.offer.price, 10) < MID_PRICE;
              break;
            case 'middle':
              condition = parseInt(el.offer.price, 10) >= MID_PRICE && parseInt(el.offer.price, 10) < HIGH_PRICE;
              break;
            case 'high':
              condition = parseInt(el.offer.price, 10) >= HIGH_PRICE;
              break;
          }
          return condition;
        }));
      }
      if (filterHousingRooms.value !== FILTER_DEFAULT) {
        sortedPins = (sortedPins.filter(function (el) {
          return el.offer.rooms === parseInt(filterHousingRooms.value, 10);
        }));
      }
      if (filterHousingGuests.value !== FILTER_DEFAULT) {
        sortedPins = (sortedPins.filter(function (el) {
          return el.offer.guests === parseInt(filterHousingGuests.value, 10);
        }));
      }

      filterHousingFeatures.forEach(filterCheckbox);
      window.pin.addMark(sortedPins);
    });
  };

  window.filter = {
    siftPins: siftPins,
    paremetersForm: paremetersForm
  };
})();
