'use strict';

(function () {
  var OFFER_USER_AVATAR = [1, 2, 3, 4, 5, 6, 7, 8];
  var OFFER_TITLE = ['Квартира в новостройке', 'Лофт на первом этаже', 'Студия в хрущевке', 'Апартаменты недорого', 'Таунхаус в центре', 'Частный дом в пригороде', 'Пентхаус в БЦ', 'Коттедж в парке'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  var OFFER_DESCRIPTION = ['desc1', 'desc2', 'desc3', 'desc4', 'desc5', 'desc6', 'desc7', 'desc8'];
  var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var generateAds = function (n) {
    var avatar = window.util.shuffle(OFFER_USER_AVATAR);
    var title = window.util.shuffle(OFFER_TITLE);
    var features = window.util.shuffle(OFFER_FEATURES);

    for (var i = 0; i < n; i++) {
      var addressCoordinates = [window.util.randomDigitFromTo(130, 930), window.util.randomDigitFromTo(130, 630)];
      window.util.adsArr[i] = {
        author: {
          avatar: 'img/avatars/user0' + avatar[i] + '.png'
        },

        offer: {
          title: title[i],
          address: addressCoordinates[0] + ', ' + addressCoordinates[1],
          price: window.util.randomDigitFromTo(0, 1000000),
          type: OFFER_TYPE[window.util.randomDigitFromTo(0, 3)],
          rooms: window.util.randomDigitFromTo(1, 5),
          guests: window.util.randomDigitFromTo(1, 5),
          checkin: OFFER_CHECKIN[window.util.randomDigitFromTo(0, 2)],
          checkout: OFFER_CHECKOUT[window.util.randomDigitFromTo(0, 2)],
          features: features.slice(window.util.randomDigitFromTo(0, 7)),
          description: OFFER_DESCRIPTION[window.util.randomDigitFromTo(0, 7)],
          photos: OFFER_PHOTOS.slice(window.util.randomDigitFromTo(0, 2))
        },

        location: {
          x: addressCoordinates[0],
          y: addressCoordinates[1]
        }
      };
    }
    return window.util.adsArr;
  };

  window.data = {
    generateAds: generateAds
  };
})();
