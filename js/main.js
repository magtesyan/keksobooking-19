'use strict';

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var mapPinElement = document.querySelector('.map__pins');

var OFFER_USER_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TITLE = ['Квартира в новостройке', 'Лофт на первом этаже', 'Студия в хрущевке', 'Апартаменты недорого', 'Таунхаус в центре', 'Частный дом в пригороде', 'Пентхаус в БЦ', 'Коттедж в парке'];
var OFFER_DESCRIPTION = ['desc1', 'desc2', 'desc3', 'desc4', 'desc5', 'desc6', 'desc7', 'desc8'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

var renderCard = function (adsArr) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = adsArr.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = adsArr.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = adsArr.offer.price + '₽/ночь';

  var offerType;
  switch (adsArr.offer.type) {
    case 'palace' : offerType = 'Дворец'; break;
    case 'house' : offerType = 'Дом'; break;
    case 'flat' : offerType = 'Квартира'; break;
    case 'bungalo' : offerType = 'Бунгало';
  }

  cardElement.querySelector('.popup__type').textContent = offerType;
  cardElement.querySelector('.popup__text--capacity').textContent = adsArr.offer.rooms + ' комнаты для ' + adsArr.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsArr.offer.checkin + ', выезд до ' + adsArr.offer.checkout;
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + adsArr.offer.checkin + ', выезд до ' + adsArr.offer.checkout;

  var features = cardElement.querySelector('.popup__features');
  while (features.firstChild) {
    features.removeChild(features.firstChild);
  }
  for (var i = 0; i < adsArr.offer.features.length; i++) {
    var newChild = document.createElement('li');
    newChild.className = 'popup__feature';
    newChild.classList.add('popup__feature--' + adsArr.offer.features[i]);
    features.appendChild(newChild);
  }

  cardElement.querySelector('.popup__description').textContent = adsArr.offer.description;

  var photos = cardElement.querySelector('.popup__photos');
  while (photos.firstChild) {
    photos.removeChild(photos.firstChild);
  }

  for (i = 0; i < adsArr.offer.photos.length; i++) {
    newChild = document.createElement('img');
    newChild.className = 'popup__photo';
    newChild.setAttribute('src', adsArr.offer.photos[i]);
    newChild.setAttribute('width', 45);
    newChild.setAttribute('height', 40);
    newChild.setAttribute('alt', 'Фотография жилья');
    photos.appendChild(newChild);
  }

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

addPin(generateAds(8));
