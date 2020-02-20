'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  var cardCloseBtn;

  var HousingTypes = {
    palace: 'Дворец',
    house: 'Дом',
    flat: 'Квартира',
    bungalo: 'Бунгало'
  };

  var closeCard = function () {
    if (window.map.mapBlock.querySelector('article')) {
      window.map.mapBlock.querySelector('article').remove();
    }
    if (cardCloseBtn) {
      cardCloseBtn.removeEventListener('click', closeCard);
    }
  };

  var addCard = function (marker, arr) {
    for (var i = 0; i < arr.length; i++) {
      if (marker === arr[i].author.avatar) {
        var filtersContainerBlock = window.map.mapBlock.querySelector('.map__filters-container');
        window.map.mapBlock.insertBefore(renderCard(window.util.adsArr[i]), filtersContainerBlock);
        cardCloseBtn = document.querySelector('.popup__close');
        cardCloseBtn.addEventListener('click', closeCard);
      }
    }
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

  window.pin.mapPinElement.addEventListener('click', function (evt) {
    closeCard();
    if (evt.target.getAttribute('src')) {
      addCard(evt.target.getAttribute('src'), window.util.adsArr);
    } else {
      addCard(evt.target.querySelector('img').getAttribute('src'), window.util.adsArr);
    }
  });

  window.pin.mapPinElement.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.Keyboard.ENTER_KEY) {
      if (evt.target.getAttribute('src')) {
        addCard(evt.target.getAttribute('src'), window.util.adsArr);
      } else {
        addCard(evt.target.querySelector('img').getAttribute('src'), window.util.adsArr);
      }
    }
  });

  window.pin.mapPinElement.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.Keyboard.ESC) {
      closeCard();
    }
  });

  window.card = {
    renderCard: renderCard
  };
})();
