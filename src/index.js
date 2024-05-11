import { initialCards } from './components/cards.js';
import { createCard, deleteCardItem, likeCard } from './components/card.js';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfile, patchProfileInfo, postNewCard, patchNewAvatar, deleteCardRequest, } from './components/api.js';
import './pages/index.css';

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');

// редактор профиля
const popupEdit = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const formEditProfile = popupEdit.querySelector('.popup__form');
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
};

// Конфиг для валидации полей   NEW!
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
// Функция изменения имени и описания профиля в разметке  NEW!
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  formElementProfile.elements.button.textContent = 'Сохранение...';
  const obj = {
    name: nameInput.value,
    about: jobInput.value,
  };
  patchProfileInfo(obj)
    .then((result) => {
      changeProfileInfo(result);
      closeModal(popupEdit);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formElementProfile.elements.button.textContent = 'Сохранить';
    });
};
// Функция обработчик событий, которая возвращает обновленный аватар с сервера  NEW
function handleFormProfileImg(evt) {
  evt.preventDefault();
  formNewAvatar.elements.button.textContent = 'Сохранение...';
  const obj = {
    avatar: inputLinkAvatar.value,
  };
  patchNewAvatar(obj).then((result) => {
    changeProfileInfo(result);
    formNewAvatar.elements.button.textContent = 'Сохранить';
    closeModal(popupNewAvatar);
  })
  .finally(() => {
    formNewAvatar.elements.button.textContent = 'Сохранить';
  });
};

// Функция обработчик событий, которая возвращает новую карточку с сервера, полученную
// из ответа на запрос с данными из формы     NEW!!!
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  formElementCard.elements.button.textContent = 'Сохранение...';
  const obj = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  postNewCard(obj)
    .then((result) => {
      cardContainer.prepend(
        createCard(result, deleteCard, likeCard, openImage, result.owner._id)
      );
      formElementCard.elements.button.textContent = 'Сохранить';
      closeModal(popupNewCard);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      formElementCard.elements.button.textContent = 'Сохранить';
    });
}
  // Функция изменения данных профиля     NEW!!!
const changeProfileInfo = (data) => {
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
};

// Функция открывает попап и реализовывает логику установки попапу значения айди карточки,
// а так же делает запрос и при успешном вызове вызывает метод удаления элемента карточки. NEW
const deleteCard = (idCard, card) => {
  openModal(popupDelete);
  popupDelete.dataset.id = idCard;
  popupDeleteButton.addEventListener(
    'click',
    () => {
      deleteCardRequest(idCard)
        .then((result) => {
          if (result) {
            deleteCardItem(idCard, card);
            closeModal(popupDelete);
          }
        })
        .catch((err) => console.log(err));
    },
    true
  );
};

// Вызов функции запроса на сервер, в ответе которого получаем данные
// карточек и профиля для рендеринга на странице  NEW!!!
getProfile()
  .then((result) => {
    const [objProfile, arrCards] = result;
    const idUser = objProfile._id;
    changeProfileInfo(objProfile);
    arrCards.forEach((el) => renderCard(el, idUser));
  })
  .catch((err) => console.log(err));

// функция кнопки редактирования профиля 
function handleEditButtonClick() {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// создание новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');
const formAddCard = popupNewCard.querySelector('.popup__form');
const placeNameInput = formAddCard.elements['place-name'];
const linkInput = formAddCard.elements.link;

// добавление карточки 
function renderCard(cardData) {
  cardsContainer.append(createCard(cardData, deleteCardItem, likeCard, openImage));
};

function handleEditProfileFormSubmitCard(evt) {
  evt.preventDefault();
  const cardData = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  
  cardsContainer.prepend(createCard(cardData, deleteCardItem, likeCard, openImage));
  closeModal(popupNewCard);
  evt.target.reset();
};

buttonAdd.addEventListener('click', () => {
  openModal(popupNewCard);
});

// вызов функции закрытия попапа по клику
setCloseModalByClickListeners(popups);

formAddCard.addEventListener('submit', handleEditProfileFormSubmitCard);

// вывод карточки на страницу 
initialCards.forEach((item) => {
  renderCard(item);
});

// изображение 
const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageCaption = popupOpenImage.querySelector('.popup__caption');

// функция открытия просмотра карточки
function openImage(cardData) {
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name
    popupImageCaption.textContent = cardData.name
    openModal(popupOpenImage);
}


// обработчик к кнопке редактирования профиля
buttonEdit.addEventListener('click', handleEditButtonClick);

// Обработчик события отправки формы окна редактирования
formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

