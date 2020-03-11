'use strict';

(function () {
  var TITLE_MIN_LENGTH = 30;
  var ROOMS_COUNT_NO_GUESTS = 100;
  var GUESTS_COUNT_NO_GUESTS = 0;

  var inputsAndSelects = document.querySelectorAll('input, select, .ad-form fieldset');
  var adForm = document.querySelector('.ad-form');
  var title = adForm.querySelector('#title');
  var guestsNumberSelect = adForm.querySelector('#capacity');
  var roomsNumberSelect = adForm.querySelector('#room_number');
  var offerTypeSelect = adForm.querySelector('#type');
  var priceSelect = adForm.querySelector('#price');
  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');
  var userPhotoInput = adForm.querySelector('#avatar');
  var offerImagesInput = adForm.querySelector('#images');
  var submitBtn = adForm.querySelector('.ad-form__submit');
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
    var roomsNumber = parseInt(roomsNumberSelect.value, 10);
    var guestsNumber = parseInt(guestsNumberSelect.value, 10);
    if ((guestsNumber <= roomsNumber && roomsNumber !== ROOMS_COUNT_NO_GUESTS && guestsNumber > GUESTS_COUNT_NO_GUESTS) || (roomsNumber === ROOMS_COUNT_NO_GUESTS && guestsNumber === GUESTS_COUNT_NO_GUESTS)) {
      guests.setCustomValidity('');
      guests.style.borderColor = '';
    } else {
      guests.setCustomValidity('Количество гостей не соответствует количеству комнат');
      guests.style.borderColor = 'red';
    }
  };

  var validatePrice = function () {
    priceSelect.setAttribute('min', HousingTypesMinPrice[offerType]);
    var price = priceSelect.value;
    if (price < HousingTypesMinPrice[offerType]) {
      priceSelect.style.borderColor = 'red';
    } else {
      priceSelect.style.borderColor = '';
    }
  };

  var validateTitle = function () {
    var titleText = title.value;
    if (titleText.length < TITLE_MIN_LENGTH) {
      title.style.borderColor = 'red';
    } else {
      title.style.borderColor = '';
    }
  };

  var disactivate = function () {
    inputsAndSelects.forEach(function (el) {
      el.setAttribute('disabled', '');
    });
    if (!adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.add('ad-form--disabled');
    }
    window.pinMove.addressInputField.readOnly = true;
  };

  var activate = function () {
    inputsAndSelects.forEach(function (el) {
      el.removeAttribute('disabled');
    });
    if (adForm.classList.contains('ad-form--disabled')) {
      adForm.classList.remove('ad-form--disabled');
    }
  };

  adForm.addEventListener('change', function () {
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
    addEventListener('click', onErrorMsgClick);
    addEventListener('keydown', function (event) {
      if (event.key === window.util.Keyboard.ESC) {
        onErrorMsgClick();
      }
    });
  };

  var onError = function (errorMessage) {
    nodeFail.querySelector('.error__message').textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', nodeFail);
    addRemoveMsgListeners();
  };

  var onErrorMsgClick = function () {
    nodeSuccess.remove();
    nodeFail.remove();
    removeEventListener('click', onErrorMsgClick);
    removeEventListener('keydown', function (event) {
      if (event.key === window.util.Keyboard.ESC) {
        onErrorMsgClick();
      }
    });
  };

  var onResetBtnClick = function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.filter.paremetersForm.reset();
    window.loadPic.deletePhoto();
    window.map.disactivate();
    disactivate();
    window.pinMove.mapPinMain.style.left = window.pinMove.mapPinStartCoordX;
    window.pinMove.mapPinMain.style.top = window.pinMove.mapPinStartCoordY;
    window.pinMove.addressInputField.value = window.pinMove.calcMainPinCoords();
    window.pin.clear();
  };

  submitBtn.addEventListener('click', function () {
    validateRoomsAndGuests(roomsNumberSelect, guestsNumberSelect);
    validatePrice();
    validateTitle();
  });

  adForm.addEventListener('submit', function (evt) {
    window.upload.send(new FormData(adForm), function () {
      document.body.insertAdjacentElement('afterbegin', nodeSuccess);
      window.map.disactivate();
      onResetBtnClick(evt);
      disactivate();
      addRemoveMsgListeners();
    }, onError);
    evt.preventDefault();
  });

  resetFormBtn.addEventListener('click', onResetBtnClick);

  window.form = {
    disactivate: disactivate,
    activate: activate,
    validateRoomsAndGuests: validateRoomsAndGuests,
    adForm: adForm
  };
})();
