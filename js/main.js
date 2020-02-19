'use strict';

var dataGeneratedFlag = false;

window.map.disactivateMap();
window.form.disactivateForm();

var onLoad = function (response) {
  window.pin.addPin(response);
  window.util.adsArr = response;
};

window.pinMove.mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === window.util.Keyboard.ENTER_KEY) {
    window.map.activateMap();
    window.form.activateForm();
    window.pinMove.addressInputField.value = window.util.getElementBottom(window.pinMove.mapPinMain);

    window.upload.load(onLoad);
    dataGeneratedFlag = true;
  }
});

window.pinMove.mapPinMain.addEventListener('mousedown', function (evt) {

  if (evt.button === 0 && dataGeneratedFlag === false) {
    window.map.activateMap();
    window.form.activateForm();
    window.pinMove.addressInputField.value = window.util.getElementBottom(window.pinMove.mapPinMain);

    window.upload.load(onLoad);
    dataGeneratedFlag = true;

    window.pinMove.mapPinMain.addEventListener('mousedown', function (evtMove) {
      window.pinMove.pinMove(evtMove);
    });
  }
});
