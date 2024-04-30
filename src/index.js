import { initialCards } from './components/cards.js';
import { createCard, deleteCardItem, likeCard } from './components/card.js';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal.js';
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
// функция кнопки редактирования профиля 
function handleEditButtonClick() {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// создание новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');
const formEditProfileCard = popupNewCard.querySelector('.popup__form');
const placeNameInput = formEditProfileCard.elements['place-name'];
const linkInput = formEditProfileCard.elements.link;

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

formEditProfileCard.addEventListener('submit', handleEditProfileFormSubmitCard);

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

