'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  var HousingTypes = {
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира',
    bungalo: 'Бунгало'
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

  var renderCard = function (arr) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = arr.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';

    cardElement.querySelector('.popup__type').textContent = HousingTypes[arr.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
    addFeatures(arr.offer.features, cardElement.querySelector('.popup__features'));
    cardElement.querySelector('.popup__description').textContent = arr.offer.description;
    addPhotos(arr.offer.photos, cardElement.querySelector('.popup__photos'));
    cardElement.querySelector('.popup__avatar').src = arr.author.avatar;
    return cardElement;
  };

  window.card = {
    renderCard: renderCard
  };
})();
