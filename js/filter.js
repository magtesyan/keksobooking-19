'use strict';

(function () {
  var FILTER_DEFAULT = 'any';
  var filterForm = document.querySelector('.map__filters');
  var filterHousingType = filterForm.querySelector('#housing-type');
  var filterHousingPrice = filterForm.querySelector('#housing-price');
  var filterHousingRooms = filterForm.querySelector('#housing-rooms');
  var filterHousingGuests = filterForm.querySelector('#housing-guests');
  var filterHousingFeatures = filterForm.querySelector('#housing-features').querySelectorAll('input');
  var sortedArray = [];
  var filterPins = function (pins) {
    window.pin.addPin(pins);

    filterForm.addEventListener('change', function () {
      sortedArray = pins;
      if (filterHousingType.value !== FILTER_DEFAULT) {
        sortedArray = (sortedArray.filter(function (el) {
          return el.offer.type === filterHousingType.value;
        }));
      }
      if (filterHousingPrice.value !== FILTER_DEFAULT) {
        sortedArray = (sortedArray.filter(function (el) {
          var condition;
          switch (filterHousingPrice.value) {
            case 'low':
              condition = parseInt(el.offer.price, 10) < 10000;
              break;
            case 'middle':
              condition = parseInt(el.offer.price, 10) >= 10000 && parseInt(el.offer.price, 10) < 50000;
              break;
            case 'high':
              condition = parseInt(el.offer.price, 10) >= 50000;
              break;
          }
          return condition;
        }));
      }
      if (filterHousingRooms.value !== FILTER_DEFAULT) {
        sortedArray = (sortedArray.filter(function (el) {
          return el.offer.rooms === parseInt(filterHousingRooms.value, 10);
        }));
      }
      if (filterHousingGuests.value !== FILTER_DEFAULT) {
        sortedArray = (sortedArray.filter(function (el) {
          return el.offer.guests === parseInt(filterHousingGuests.value, 10);
        }));
      }
      for (var i = 0; i < filterHousingFeatures.length; i++) {
        if (filterHousingFeatures[i].checked) {
          sortedArray = (sortedArray.filter(function (el) {
            return el.offer.features.indexOf(filterHousingFeatures[i].value) !== -1;
          }));
        }
      }
      window.pin.addPin(sortedArray);
    });
  };

  window.filter = {
    filterPins: filterPins
  };
})();
