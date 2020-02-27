'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var moveListenerFlag = 0;

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

    var onLoad = function (response) {
      window.pin.addPin(response);
      window.util.adsArr = response;
    };

    var startMap = function (evt) {
      window.pinMove.mapPinMain.removeEventListener('keydown', startMap);
      window.pinMove.mapPinMain.removeEventListener('mousedown', startMap);
      if (evt.button === 0 || evt.key === window.util.Keyboard.ENTER_KEY) {
        window.map.activateMap();
        window.form.activateForm();
        window.pinMove.addressInputField.value = (parseInt(window.pinMove.mapPinMain.style.left, 10) + window.pinMove.mapPinMainCenter) + ', ' + parseInt(window.pinMove.mapPinMain.style.top, 10);

        window.upload.load(onLoad);

        if (moveListenerFlag === 0) {
          window.pinMove.mapPinMain.addEventListener('mousedown', window.pinMove.pinMove);
          moveListenerFlag = 1;
        }
      }
    };

    window.pinMove.mapPinMain.addEventListener('keydown', startMap);
    window.pinMove.mapPinMain.addEventListener('mousedown', startMap);
  };

  window.map = {
    mapBlock: mapBlock,
    activateMap: activateMap,
    disactivateMap: disactivateMap
  };
})();
