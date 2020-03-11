'use strict';
(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var SERVER_ANSWER_OK = 200;

  var makeRequest = function (onLoad, onError, method, url, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVER_ANSWER_OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onLoad, onError) {
    makeRequest(onLoad, onError, 'GET', URL_UPLOAD);
  };

  var send = function (data, onLoad, onError) {
    makeRequest(onLoad, onError, 'POST', URL_SEND, data);
  };

  window.upload = {
    load: load,
    send: send
  };
})();
