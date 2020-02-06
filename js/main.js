'use strict';

var ENTER_KEY = 'Enter';

var mapBlock = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapFiltersForm = document.querySelector('.map__filters');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var mapPinElement = document.querySelector('.map__pins');
var mapPinMain = mapPinElement.querySelector('.map__pin--main');
var inputsAndSelects = document.querySelectorAll('input, select, .ad-form fieldset');
var addressInputField = adForm.querySelector('#address');
var guestsNumberSelect = adForm.querySelector('#capacity');
var roomsNumberSelect = adForm.querySelector('#room_number');
var submitBtn = adForm.querySelector('.ad-form__submit');
var roomsNumber = roomsNumberSelect.value;
var guestsNumber = guestsNumberSelect.value;

var OFFER_USER_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TITLE = ['Квартира в новостройке', 'Лофт на первом этаже', 'Студия в хрущевке', 'Апартаменты недорого', 'Таунхаус в центре', 'Частный дом в пригороде', 'Пентхаус в БЦ', 'Коттедж в парке'];
var OFFER_DESCRIPTION = ['desc1', 'desc2', 'desc3', 'desc4', 'desc5', 'desc6', 'desc7', 'desc8'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var HousingTypes = {
  palace: 'Дворец',
  house: 'Дом',
  flat: 'Квартира',
  bungalo: 'Бунгало'
};

var disactivatePage = function () {
  for (var i = 0; i < inputsAndSelects.length; i++) {
    inputsAndSelects[i].setAttribute('disabled', '');
  }
  if (!mapBlock.classList.contains('map--faded')) {
    mapBlock.classList.add('map--faded');
  }
  if (!adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.add('map--faded');
  }
  if (!mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.add('map--faded');
  }
};

var activatePage = function () {
  for (var i = 0; i < inputsAndSelects.length; i++) {
    inputsAndSelects[i].removeAttribute('disabled');
  }
  if (mapBlock.classList.contains('map--faded')) {
    mapBlock.classList.remove('map--faded');
  }
  if (adForm.classList.contains('ad-form--disabled')) {
    adForm.classList.remove('ad-form--disabled');
  }
  if (mapFiltersForm.classList.contains('map__filters--disabled')) {
    mapFiltersForm.classList.remove('map__filters--disabled');
  }
};

var randomDigitFromTo = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var shuffle = function (arr) {
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

var generateAds = function (n) {
  var adsArr = new Array(n);
  var avatar = shuffle(OFFER_USER_AVATAR);
  var title = shuffle(OFFER_TITLE);
  var features = shuffle(OFFER_FEATURES);

  for (var i = 0; i < n; i++) {
    var addressCoordinates = [randomDigitFromTo(130, 930), randomDigitFromTo(130, 630)];
    adsArr[i] = {
      author: {
        avatar: 'img/avatars/user0' + avatar[i] + '.png'
      },

      offer: {
        title: title[i],
        address: addressCoordinates[0] + ', ' + addressCoordinates[1],
        price: randomDigitFromTo(0, 1000000),
        type: OFFER_TYPE[randomDigitFromTo(0, 3)],
        rooms: randomDigitFromTo(1, 5),
        guests: randomDigitFromTo(1, 5),
        checkin: OFFER_CHECKIN[randomDigitFromTo(0, 2)],
        checkout: OFFER_CHECKOUT[randomDigitFromTo(0, 2)],
        features: features.slice(randomDigitFromTo(0, 7)),
        description: OFFER_DESCRIPTION[randomDigitFromTo(0, 7)],
        photos: OFFER_PHOTOS.slice(randomDigitFromTo(0, 2))
      },

      location: {
        x: addressCoordinates[0],
        y: addressCoordinates[1]
      }
    };
  }
  return adsArr;
};

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.top = (pin.location.y + 10) + 'px';
  pinElement.style.left = (pin.location.x + 10) + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;
  return pinElement;
};

var addFeatures = function (arr, features) {
  features.innerHTML = '';
  for (var i = 0; i < arr.length; i++) {
    var newChild = document.createElement('li');
    newChild.className = 'popup__feature';
    newChild.classList.add('popup__feature--' + arr[i]);
    features.appendChild(newChild);
  }
};

var addPhotos = function (arr, photos) {
  photos.innerHTML = '';
  for (var i = 0; i < arr.length; i++) {
    var newChild = document.createElement('img');
    newChild.className = 'popup__photo';
    newChild.setAttribute('src', arr[i]);
    newChild.setAttribute('width', 45);
    newChild.setAttribute('height', 40);
    newChild.setAttribute('alt', 'Фотография жилья');
    photos.appendChild(newChild);
  }
};

var renderCard = function (adsArr) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = adsArr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adsArr.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = adsArr.offer.price + '₽/ночь';

  cardElement.querySelector('.popup__type').textContent = HousingTypes[adsArr.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = adsArr.offer.rooms + ' комнаты для ' + adsArr.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsArr.offer.checkin + ', выезд до ' + adsArr.offer.checkout;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsArr.offer.checkin + ', выезд до ' + adsArr.offer.checkout;
  addFeatures(adsArr.offer.features, cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = adsArr.offer.description;
  addPhotos(adsArr.offer.photos, cardElement.querySelector('.popup__photos'));
  cardElement.querySelector('.popup__avatar').src = adsArr.author.avatar;
  return cardElement;
};

var addPin = function (adsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArr.length; i++) {
    fragment.appendChild(renderPin(adsArr[i]));
  }
  mapPinElement.appendChild(fragment);
  addCard(adsArr);
};

var addCard = function (adsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArr.length; i++) {
    fragment.appendChild(renderCard(adsArr[i]));
  }
  var filtersContainerBlock = mapBlock.querySelector('.map__filters-container');
  mapBlock.insertBefore(fragment, filtersContainerBlock);
};

var getElementCenter = function (element) {
  var coordinates = element.getBoundingClientRect();
  return (Math.round((coordinates.right - coordinates.left) / 2 + coordinates.left) + ', ' + Math.round((coordinates.bottom - coordinates.top) / 2 + coordinates.top));
};

var getElementBottom = function (element) {
  var coordinates = element.getBoundingClientRect();
  return (Math.round((coordinates.right - coordinates.left) / 2 + coordinates.left) + ', ' + Math.round(coordinates.bottom));
};

var validateRoomsAndGuests = function (rooms, guests) {
  if ((guestsNumber <= roomsNumber && roomsNumber !== 100 && guestsNumber > 0) || (roomsNumber === 100 && guestsNumber === 0)) {
    guests.setCustomValidity('');
  } else {
    guests.setCustomValidity('Количество гостей не соответствует количеству комнат');
  }
};

disactivatePage();
addressInputField.value = getElementCenter(mapPinMain);

roomsNumberSelect.addEventListener('change', function () {
  roomsNumber = roomsNumberSelect.value;
});
guestsNumberSelect.addEventListener('change', function () {
  guestsNumber = guestsNumberSelect.value;
});

submitBtn.addEventListener('click', function () {
  validateRoomsAndGuests(roomsNumberSelect, guestsNumberSelect);
});

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activatePage();
    addressInputField.value = getElementBottom(mapPinMain);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
    addressInputField.value = getElementBottom(mapPinMain);
  }
});

addPin(generateAds(8));
