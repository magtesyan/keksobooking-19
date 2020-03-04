'use strict';

(function () {
  var MAP_TOP = 130;
  var MAP_BOTTOM = 640;
  var MAP_LEFT = 0;
  var MAP_RIGHT = 1134;

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var mapPinMain = window.pin.mapPinElement.querySelector('.map__pin--main');
  var mapPinMainCoordinates = mapPinMain.getBoundingClientRect();
  var mapPinMainCenter = Math.round((mapPinMainCoordinates.right - mapPinMainCoordinates.left) / 2);
  var addressInputField = document.querySelector('#address');

  var mapPinStartCoordX = mapPinMain.style.left;
  var mapPinStartCoordY = mapPinMain.style.top;

  var calcMainPinCoords = function () {
    return (parseInt(mapPinMain.style.left, 10) + mapPinMainCenter) + ', ' + parseInt(mapPinMain.style.top, 10);
  };

  var pinMove = function (evt) {
    var startCoords = new Coordinate(evt.clientX, evt.ClientY);

    var onMouseMove = function (moveEvt) {
      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);
      startCoords = new Coordinate(moveEvt.clientX, moveEvt.clientY);

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      if (mapPinMain.offsetTop < MAP_TOP) {
        mapPinMain.style.top = MAP_TOP + 'px';
      } else if (mapPinMain.offsetTop > MAP_BOTTOM) {
        mapPinMain.style.top = MAP_BOTTOM + 'px';
      }

      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      if (mapPinMain.offsetLeft < MAP_LEFT - mapPinMainCenter) {
        mapPinMain.style.left = (MAP_LEFT - mapPinMainCenter) + 'px';
      } else if (mapPinMain.offsetLeft > MAP_RIGHT + mapPinMainCenter) {
        mapPinMain.style.left = (MAP_RIGHT + mapPinMainCenter) + 'px';
      }

      addressInputField.value = calcMainPinCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      var onClickPreventDefault = function () {
        mapPinMain.removeEventListener('click', onClickPreventDefault);
      };
      mapPinMain.addEventListener('click', onClickPreventDefault);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.pinMove = {
    addressInputField: addressInputField,
    mapPinMain: mapPinMain,
    pinMove: pinMove,
    mapPinMainCenter: mapPinMainCenter,
    calcMainPinCoords: calcMainPinCoords,
    mapPinStartCoordX: mapPinStartCoordX,
    mapPinStartCoordY: mapPinStartCoordY
  };
})();
