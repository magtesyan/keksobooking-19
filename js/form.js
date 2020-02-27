'use strict';

(function () {
  var inputsAndSelects = document.querySelectorAll('input, select, .ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var guestsNumberSelect = adForm.querySelector('#capacity');
  var roomsNumberSelect = adForm.querySelector('#room_number');
  var offerTypeSelect = adForm.querySelector('#type');
  var priceSelect = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var userPhotoInput = adForm.querySelector('#avatar');
  var offerImagesInput = adForm.querySelector('#images');
  var submitBtn = adForm.querySelector('.ad-form__submit');
  var roomsNumber = roomsNumberSelect.value;
  var guestsNumber = guestsNumberSelect.value;
  var offerType = offerTypeSelect.value;
  var timeIn = timeInSelect.value;
  var nodeSuccess = document.querySelector('#success').content.querySelector('.success');
  var nodeFail = document.querySelector('#error').content.querySelector('.error');
  var resetFormBtn = adForm.querySelector('.ad-form__reset');

  var HousingTypesMinPrice = {
    palace: 10000,
    house: 5000,
    flat: 1000,
    bungalo: 0
  };

  var validateRoomsAndGuests = function (rooms, guests) {
    if ((guestsNumber <= roomsNumber && roomsNumber !== 100 && guestsNumber > 0) || (roomsNumber === 100 && guestsNumber === 0)) {
      guests.setCustomValidity('');
    } else {
      guests.setCustomValidity('Количество гостей не соответствует количеству комнат');
    }
  };

  var disactivateForm = function () {
    for (var i = 0; i < inputsAndSelects.length; i++) {
      inputsAndSelects[i].setAttribute('disabled', '');
    }
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    window.pinMove.addressInputField.readOnly = true;
  };

  var activateForm = function () {
    for (var i = 0; i < inputsAndSelects.length; i++) {
      inputsAndSelects[i].removeAttribute('disabled');
    }
    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }
  };

  adForm.addEventListener('change', function () {
    roomsNumber = roomsNumberSelect.value;
    guestsNumber = guestsNumberSelect.value;
    offerType = offerTypeSelect.value;

    if (timeInSelect.value !== timeOutSelect.value) {
      if (timeInSelect.value !== timeIn) {
        timeOutSelect.value = timeInSelect.value;
      } else {
        timeInSelect.value = timeOutSelect.value;
      }
      timeIn = timeInSelect.value;
    }

    priceSelect.placeholder = HousingTypesMinPrice[offerType];

    var userPhoto = userPhotoInput.files[0];
    if (!userPhoto.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      userPhotoInput.setCustomValidity('Загруженный файл не является фотографией');
    }

    var offerPhoto = offerImagesInput.files[0];
    if (!offerPhoto.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      offerImagesInput.setCustomValidity('Загруженный файл не является фотографией');
    }
  });

  var addRemoveMsgListeners = function () {
    addEventListener('click', removeMessage);
    addEventListener('keydown', function (event) {
      if (event.key === window.util.Keyboard.ESC) {
        removeMessage();
      }
    });
  };

  var onError = function (errorMessage) {
    nodeFail.querySelector('.error__message').textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', nodeFail);
    addRemoveMsgListeners();
  };

  var removeMessage = function () {
    nodeSuccess.remove();
    nodeFail.remove();
    removeEventListener('click', removeMessage);
    removeEventListener('keydown', function (event) {
      if (event.key === window.util.Keyboard.ESC) {
        removeMessage();
      }
    });
  };

  var resetForm = function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.pinMove.mapPinMain.style.left = window.pinMove.mapPinStartCoordX;
    window.pinMove.mapPinMain.style.top = window.pinMove.mapPinStartCoordY;
    window.pinMove.addressInputField.value = window.pinMove.calcMainPinCoords();
  };

  submitBtn.addEventListener('click', function () {
    validateRoomsAndGuests(roomsNumberSelect, guestsNumberSelect);
    priceSelect.setAttribute('min', HousingTypesMinPrice[offerType]);
  });

  adForm.addEventListener('submit', function (evt) {
    window.upload.send(new FormData(adForm), function () {
      document.body.insertAdjacentElement('afterbegin', nodeSuccess);
      window.map.disactivateMap();
      resetForm(evt);
      disactivateForm();
      addRemoveMsgListeners();
    }, onError);
    evt.preventDefault();
  });

  resetFormBtn.addEventListener('click', resetForm);

  window.form = {
    disactivateForm: disactivateForm,
    activateForm: activateForm,
    validateRoomsAndGuests: validateRoomsAndGuests,
    adForm: adForm
  };
})();
