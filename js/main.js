'use strict';

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var similarListElement = document.querySelector('.map__pins');

var OFFER_USER_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_TITLE = ['Квартира в новостройке', 'Лофт на первом этаже', 'Студия в хрущевке', 'Апартаменты недорого', 'Таунхаус в центре', 'Частный дом в пригороде', 'Пентхаус в БЦ', 'Коттедж в парке'];
var OFFER_DESCRIPTION = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
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
        features: features.slice(randomDigitFromTo(1, 7)),
        description: OFFER_DESCRIPTION[randomDigitFromTo(0, 7)],
        photos: OFFER_PHOTOS.slice(randomDigitFromTo(1, 3))
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

var addPin = function (adsArr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adsArr.length; i++) {
    fragment.appendChild(renderPin(adsArr[i]));
  }
  similarListElement.appendChild(fragment);
};

addPin(generateAds(8));
