'use strict';

(function () {
  var inputsAndSelects = document.querySelectorAll('input:not(#address), select, .ad-form fieldset');
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
      adForm.classList.add('map--faded');
    }
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

  submitBtn.addEventListener('click', function () {
    validateRoomsAndGuests(roomsNumberSelect, guestsNumberSelect);
    priceSelect.setAttribute('min', HousingTypesMinPrice[offerType]);
  });

  window.form = {
    disactivateForm: disactivateForm,
    activateForm: activateForm,
    validateRoomsAndGuests: validateRoomsAndGuests,
    adForm: adForm
  };
})();
