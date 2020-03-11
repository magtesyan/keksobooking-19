'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardCloseBtn;

  var HousingTypes = {
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира',
    bungalo: 'Бунгало'
  };

  var onCardCloseBtnClick = function () {
    if (window.map.circuit.querySelector('article')) {
      window.map.circuit.querySelector('article').remove();
    }
    if (cardCloseBtn) {
      cardCloseBtn.removeEventListener('click', onCardCloseBtnClick);
    }
  };

  var addCard = function (marker, arr) {
    arr.forEach(function (el) {
      if (marker === el.offer.title) {
        var filtersContainerBlock = window.map.circuit.querySelector('.map__filters-container');
        window.map.circuit.insertBefore(renderCard(el), filtersContainerBlock);
        cardCloseBtn = document.querySelector('.popup__close');
        cardCloseBtn.addEventListener('click', onCardCloseBtnClick);
      }
    });
  };

  var addFeatures = function (arr, features) {
    features.innerHTML = '';
    arr.forEach(function (el) {
      var newChild = document.createElement('li');
      newChild.className = 'popup__feature';
      newChild.classList.add('popup__feature--' + el);
      features.appendChild(newChild);
    });
  };

  var addPhotos = function (arr, photos) {
    photos.innerHTML = '';
    arr.forEach(function (el) {
      var newChild = document.createElement('img');
      newChild.className = 'popup__photo';
      newChild.setAttribute('src', el);
      newChild.setAttribute('width', PHOTO_WIDTH);
      newChild.setAttribute('height', PHOTO_HEIGHT);
      newChild.setAttribute('alt', 'Фотография жилья');
      photos.appendChild(newChild);
    });
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

  window.pin.mapMarkElement.addEventListener('click', function (evt) {
    onCardCloseBtnClick();
    addCard(evt.target.getAttribute('alt'), window.util.adsArr);
    addCard(evt.target.querySelector('img').getAttribute('alt'), window.util.adsArr);
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.Keyboard.ESC) {
      onCardCloseBtnClick();
    }
  });
})();
