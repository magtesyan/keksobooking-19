'use strict';

var addressInputField = window.form.adForm.querySelector('#address');
var mapPinMain = window.pin.mapPinElement.querySelector('.map__pin--main');

window.map.disactivateMap();
window.form.disactivateForm();
addressInputField.value = window.util.getElementCenter(mapPinMain);

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    window.map.activateMap();
    window.form.activateForm();
    addressInputField.value = window.util.getElementBottom(mapPinMain);
    window.pin.addPin(window.data.generateAds(8));
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === window.util.Keyboard.ENTER_KEY) {
    window.map.activateMap();
    window.form.activateForm();
    addressInputField.value = window.util.getElementBottom(mapPinMain);
    window.pin.addPin(window.data.generateAds(8));
  }
});
