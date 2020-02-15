'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');

  var activateMap = function () {
    if (mapBlock.classList.contains('map--faded')) {
      mapBlock.classList.remove('map--faded');
    }
    if (mapFiltersForm.classList.contains('map__filters--disabled')) {
      mapFiltersForm.classList.remove('map__filters--disabled');
    }
  };

  var disactivateMap = function () {
    if (!mapBlock.classList.contains('map--faded')) {
      mapBlock.classList.add('map--faded');
    }
    if (!mapFiltersForm.classList.contains('map__filters--disabled')) {
      mapFiltersForm.classList.add('map--faded');
    }
  };

  window.map = {
    mapBlock: mapBlock,
    activateMap: activateMap,
    disactivateMap: disactivateMap
  };
})();
