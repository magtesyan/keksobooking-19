'use strict';

(function () {
  var circuit = document.querySelector('.map');
  var mapFiltersForm = document.querySelector('.map__filters');
  var moveListenerFlag = 0;

  var activate = function () {
    if (circuit.classList.contains('map--faded')) {
      circuit.classList.remove('map--faded');
    }
    if (mapFiltersForm.classList.contains('map__filters--disabled')) {
      mapFiltersForm.classList.remove('map__filters--disabled');
    }
  };

  var disactivate = function () {
    if (!circuit.classList.contains('map--faded')) {
      circuit.classList.add('map--faded');
    }
    if (!mapFiltersForm.classList.contains('map__filters--disabled')) {
      mapFiltersForm.classList.add('map--faded');
    }

    var onLoad = function (response) {
      window.filter.siftPins(response);
      window.util.adsArr = response;
    };

    var onMainPinClick = function (evt) {
      window.pinMove.mapPinMain.removeEventListener('keydown', onMainPinClick);
      window.pinMove.mapPinMain.removeEventListener('mousedown', onMainPinClick);
      if (evt.type === 'mousedown' || evt.key === window.util.Keyboard.ENTER_KEY) {
        window.map.activate();
        window.form.activate();
        window.pinMove.addressInputField.value = (parseInt(window.pinMove.mapPinMain.style.left, 10) + window.pinMove.mapPinMainCenter) + ', ' + parseInt(window.pinMove.mapPinMain.style.top, 10);

        window.upload.load(onLoad);

        if (moveListenerFlag === 0) {
          window.pinMove.mapPinMain.addEventListener('mousedown', window.pinMove.onMainPinShift);
          moveListenerFlag = 1;
        }
      }
    };

    window.pinMove.mapPinMain.addEventListener('keydown', onMainPinClick);
    window.pinMove.mapPinMain.addEventListener('mousedown', onMainPinClick);
  };

  window.map = {
    circuit: circuit,
    activate: activate,
    disactivate: disactivate
  };
})();
