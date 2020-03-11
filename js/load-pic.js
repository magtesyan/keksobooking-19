'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var AVATAR_DEFAULT_URL = 'img/muffin-grey.svg';

  var picClass = {
    avatar: '.ad-form-header__preview',
    images: '.ad-form__photo'
  };

  var fileAvatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var fileHousePicChooser = document.querySelector('.ad-form__upload input[type=file]');

  var deletePhoto = function () {
    document.querySelector(picClass['avatar']).querySelector('img').src = AVATAR_DEFAULT_URL;
    if (document.querySelector(picClass['images']).querySelector('img')) {
      document.querySelector(picClass['images']).querySelector('img').remove();
    }
  };

  var onPictureChange = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var previewBlock = document.querySelector(picClass[evt.target.id]);

    if (!previewBlock.querySelector('img')) {
      previewBlock.innerHTML = '<img></img>';
    }

    var preview = previewBlock.querySelector('img');

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  fileAvatarChooser.addEventListener('change', onPictureChange);
  fileHousePicChooser.addEventListener('change', onPictureChange);

  window.loadPic = {
    deletePhoto: deletePhoto
  };
})();
