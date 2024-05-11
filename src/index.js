import './pages/index.css';
import {createCard, deleteCard, likeIt} from './components/card.js';
import {openPopap, closePopap} from './components/modal.js';
import {enableValidation, clearValidation} from './components/validation.js';
import {getInitialInfo, updateUserInfo, postNewCard, updateUserAvatar} from './components/api.js';

//Переменная ид пользователя
let userId;

//Получение списка карточек
const cardList = document.querySelector('.places__list');

//Получение модальных окон
const popapProfile = document.querySelector('.popup_type_edit');
const popapAddCard = document.querySelector('.popup_type_new-card');
const popapCard = document.querySelector('.popup_type_image');
const popapAvatar = document.querySelector('.popup_type_avatar');

//Получение кнопок сохранение данных окон
const buttonSavePopapProfile = popapProfile.querySelector('.popup__button');
const buttonSavePopapAddCard = popapAddCard.querySelector('.popup__button');
const buttonSavePopapAvatar = popapAvatar.querySelector('.popup__button');

//Получение данных формы редактирования профиля
const formEditProfile = document.querySelector('[name = "edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput  = document.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const popapAvatarForm = document.forms["edit-avatar"];

//Получение данных формы создания карточки
const formNewPlace = document.querySelector('[name = "new-place"]');
const nameCard = document.querySelector('[name = "place-name"]');
const linkCard  = document.querySelector('[name = "link"]');

//Получение данных формы увеличения карточки
const popapImage = popapCard.querySelector('.popup__image');
const popapCaption = popapCard.querySelector('.popup__caption');

//Получение кнопок открытия попапов
const avatarEditButton = document.querySelector(".profile__image-container");
const buttonPopapProfile = document.querySelector('.profile__edit-button');
const buttonPopapAddCard = document.querySelector('.profile__add-button');

//Объект данных для валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

//Открытие и редактирование попапа изменения аватара
avatarEditButton.addEventListener('click', (evt) => {
  clearValidation(popapAvatarForm, validationConfig);
  popapAvatarForm.reset();
  openPopap(popapAvatar);
});

function handleAvatarFormSubmit(evt) {
  buttonSavePopapAvatar.textContent = buttonSavePopapAvatar.getAttribute('data-loading');
  evt.preventDefault();
  updateUserAvatar(popapAvatarForm.link.value)
   .then((updatedProfile) => {
    fillProfileInfo(updatedProfile);
  closePopap(popapAvatar);
})
  .catch((err) => {console.log(err);})
  .finally(() => {buttonSavePopapAvatar.textContent = buttonSavePopapAvatar.getAttribute('data-default-text');
});
}
popapAvatarForm.addEventListener('submit', handleAvatarFormSubmit)

//Редактирование профиля
buttonPopapProfile.addEventListener('click', function() {
  clearValidation(popapProfile, validationConfig);
  openPopap(popapProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});
function handleFormSubmit(evt) {
  buttonSavePopapProfile.textContent = buttonSavePopapProfile.getAttribute('data-loading');
  evt.preventDefault(); 
  updateUserInfo({  
    name: nameInput.value,
    about: jobInput.value,
  })
  .then((updatedProfile) => {
    fillProfileInfo(updatedProfile);
  closePopap(popapProfile);
})
  .catch((err) => {console.log(err);})
  .finally(() => {buttonSavePopapProfile.textContent = buttonSavePopapProfile.getAttribute('data-default-text');
  });
};
formEditProfile.addEventListener('submit', handleFormSubmit);

//Добавление карточки
buttonPopapAddCard.addEventListener('click', function() {
  clearValidation(popapAddCard, validationConfig);
  openPopap(popapAddCard);
});
function addNewCard(evt) {
  buttonSavePopapAddCard.textContent = buttonSavePopapAddCard.getAttribute('data-loading');
  evt.preventDefault();
  const item = {name: nameCard.value, link: linkCard.value};
  postNewCard(item)
  .then((card) => {
    const newCard = createCard(card, userId, deleteCard, likeIt, openCard);
    cardList.prepend(newCard);
  nameCard.value = '';
  linkCard.value = '';
  closePopap(popapAddCard);
  })
  .catch((err) => {console.log(err);})
  .finally(() => {buttonSavePopapAddCard.textContent = buttonSavePopapAddCard.getAttribute('data-default-text');
  })
};
formNewPlace.addEventListener('submit', addNewCard);

//Увеличение карточки
function openCard(itemLink, itemName) {
  openPopap(popapCard);
  popapImage.src = itemLink;
  popapImage.alt = itemName;
  popapCaption.textContent = itemName;
}

//Закрытие карточки по клику и оверлей
document.querySelectorAll('.popup__close').forEach(button => {
  const buttonsPopup = button.closest('.popup');
  button.addEventListener('click', () => closePopap(buttonsPopup));
  buttonsPopup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopap(buttonsPopup);
    };
  });
});

//Вызов валидации
enableValidation(validationConfig);

// api
getInitialInfo()
  .then((result) => {
    const userInfo = result[0];
    userId = userInfo._id;
    const initialCards = result[1];
    fillProfileInfo(userInfo);
    renderInitialCards(initialCards, userId);})
  .catch((err) => {console.log(err);});

//Получаем данные пользователя
const fillProfileInfo = (userInfo) => {
  profileTitle.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
};

//Вывод карточек на экран
function renderInitialCards(initialCards, userId) {
  initialCards.forEach(item => {
    cardList.append(createCard(item, userId, deleteCard, likeIt, openCard));
  });
}
