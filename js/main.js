'use strict';

var MAP_TOP = 130;
var MAP_BOTTOM = 640;
var MAP_LEFT = 0;
var MAP_RIGHT = 1134;

var addressInputField = window.form.adForm.querySelector('#address');
var mapPinMain = window.pin.mapPinElement.querySelector('.map__pin--main');
var dataGeneratedFlag = false;
var mapPinMaincoordinates = mapPinMain.getBoundingClientRect();
var mapPinMainCenter = Math.round((mapPinMaincoordinates.right - mapPinMaincoordinates.left) / 2);

window.map.disactivateMap();
window.form.disactivateForm();
addressInputField.value = window.util.getElementCenter(mapPinMain);

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === window.util.Keyboard.ENTER_KEY) {
    window.map.activateMap();
    window.form.activateForm();
    addressInputField.value = window.util.getElementBottom(mapPinMain);
    window.pin.addPin(window.data.generateAds(8));
  }
});

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0 && dataGeneratedFlag === false) {
    window.map.activateMap();
    window.form.activateForm();
    addressInputField.value = window.util.getElementBottom(mapPinMain);
    window.pin.addPin(window.data.generateAds(8));
    dataGeneratedFlag = true;
  }

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

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

    addressInputField.value = (parseInt(mapPinMain.style.left, 10) + mapPinMainCenter) + ' , ' + parseInt(mapPinMain.style.top, 10);
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
});
