'use strict';

var addressInputField = window.form.adForm.querySelector('#address');
var mapPinMain = window.pin.mapPinElement.querySelector('.map__pin--main');
var dataGeneratedFlag = false;

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

    if (mapPinMain.offsetTop < 0) {
      mapPinMain.style.top = '1px';
    } else if (mapPinMain.offsetTop > 630) {
      mapPinMain.style.top = '630px';
    } else {
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    }

    if (mapPinMain.offsetLeft < 0) {
      mapPinMain.style.left = '1px';
    } else if (mapPinMain.offsetLeft > 1140) {
      mapPinMain.style.left = 1140 + 'px';
    } else {
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    }
    addressInputField.value = window.util.getElementBottom(mapPinMain);
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
