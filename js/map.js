'use strict';

(function () {
  var mapBlock = document.querySelector('.map');

  var addCard = function (marker, arr) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arr.length; i++) {
      if (marker === arr[i].author.avatar) {
        fragment.appendChild(window.card.renderCard(window.util.adsArr[i]));
      }
    }
    var filtersContainerBlock = window.map.mapBlock.querySelector('.map__filters-container');
    window.map.mapBlock.insertBefore(fragment, filtersContainerBlock);
  };

  var closeCard = function () {
    if (window.map.mapBlock.querySelector('article')) {
      window.map.mapBlock.querySelector('article').remove();
    }
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
    if (evt.key === window.util.ENTER_KEY) {
      if (evt.target.getAttribute('src')) {
        addCard(evt.target.getAttribute('src'), window.util.adsArr);
      } else {
        addCard(evt.target.querySelector('img').getAttribute('src'), window.util.adsArr);
      }
    }
  });

  window.pin.mapPinElement.addEventListener('keydown', function (evt) {
    if (evt.key === window.util.ESC) {
      closeCard();
    }
  });

  window.map = {
    mapBlock: mapBlock
  };
})();
