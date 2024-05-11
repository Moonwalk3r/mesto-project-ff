// Конфиг с токеном и названием группы
const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-13',
    headers: {
      authorization: 'e4b40c04-3664-48f7-bc02-a2d0766a302a',
      'Content-Type': 'application/json',
    },
  };
/*   https://mesto.nomoreparties.co/ */

  // Функция обработки запроса
  const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  };
  // Функция с запросами на сервер для получения данных юзера и карточек
  const getProfile = () => {
    const urls = [`${config.baseUrl}/users/me`, `${config.baseUrl}/cards`];
  
    const promises = urls.map((url) =>
      fetch(url, { headers: config.headers }).then(res => handleResponse(res))
    );
    return Promise.all(promises);
  };
  // Функция с запросом на обновление данных о профиле на сервере 
  const patchProfileInfo = (obj) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(obj)
    }).then(res => handleResponse(res));
  };
  // Функция с запросом о размещение на сервере новой карточки 
  const postNewCard = (obj) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify(obj)
    }).then(res => handleResponse(res));
  };
  // Функция с запросом удалить карточку с сервера 
  const deleteCardRequest = (id) => {
    return fetch(`${config.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(res => handleResponse(res));
  };
  // Функция с запросом о добалвении лайка юзера к карточке на сервере 
  const putLikeCounterRequest = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'PUT',
      headers: config.headers
    }).then(res => handleResponse(res));
  };
  // Функция с запросом о удаление лайка юзера с карточки 
  const deleteLikeCounterRequest = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: config.headers
    }).then(res => handleResponse(res));
  };
  // Функция с запросом о размещении нового аватара на сервере
  const patchNewAvatar = (obj) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify(obj)
    }).then(res => handleResponse(res));
  }
  
  export {
    getProfile,
    patchProfileInfo,
    postNewCard,
    deleteCardRequest,
    putLikeCounterRequest,
    deleteLikeCounterRequest,
    patchNewAvatar
  };