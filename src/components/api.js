//API  
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-13", 
  headers: {
    authorization: "e4b40c04-3664-48f7-bc02-a2d0766a302a", 
    "Content-Type": "application/json",
  },
};

//Запрос
const checkRequest = (res) => {
   if (res.ok) {return res.json()} 
   else {return Promise.reject(`Ошибка: ${res.status}`)};
};    

//данные о пользователе
const getUserInfo = async () => {
  return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
  })
  .then((res) => checkRequest(res));
}

// информация о карточке 
const getCardsInfo = async () => {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
  })
  .then((res) => checkRequest(res));
}

//Массив всех получаемых данных
const getInitialInfo = async () => {
  return Promise.all([getUserInfo(), getCardsInfo()]);
};

//Обновление  данных о пользователе
const updateUserInfo = async (userProfileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileData.name,
      about: userProfileData.about,
    }),
  })
  .then((res) => checkRequest(res));
};

//Добавление карточек
const postNewCard = async (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: cardData.name,
      link: cardData.link,
    }),
  })
  .then((res) => checkRequest(res));
};

// лайки
const setLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then((res) => checkRequest(res));
};

//Удалили лайк
const deleteLike = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => checkRequest(res));
};  

//Удаление карточки
const deleteCardServ = async (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then((res) => checkRequest(res));
}; 

//Отправка аватара
const updateUserAvatar = async (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  })
  .then((res) => checkRequest(res));
};

export {getUserInfo, getCardsInfo, getInitialInfo, updateUserInfo, 
  postNewCard, setLike, deleteLike, deleteCardServ, updateUserAvatar}