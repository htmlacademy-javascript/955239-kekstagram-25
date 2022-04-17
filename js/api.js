const addressLinkDownload = 'https://25.javascript.pages.academy/kekstagram/data';
const addressLinkSending = 'https://25.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(addressLinkDownload)
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    }).catch(() => onFail('При загрузке данных с сервера произошла ошибка'));
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    addressLinkSending,
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    }
  })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export { getData, sendData };
