import { initialCards } from './components/cards.js';
import { createCard, deleteCardItem, likeCard } from './components/card.js';
import { openModal, closeModal } from './components/modal.js';
import './pages/index.css';

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');

// редактор профиля
const popupEdit = document.querySelector('.popup_type_edit');
const buttonEdit = document.querySelector('.profile__edit-button');
const formElement = popupEdit.querySelector('.popup__form');
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
};

buttonEdit.addEventListener('click', () => {
  openModal(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (
      evt.target.classList.contains('popup__close') ||
      evt.target.classList.contains('popup_is-opened')
    ) {
      closeModal(popup);
    }
  })
});

// Обработчик события отправки формы окна редактирования
formElement.addEventListener('submit', handleFormSubmit);


// создание новой карточки
const popupNewCard = document.querySelector('.popup_type_new-card');
const buttonAdd = document.querySelector('.profile__add-button');
const formElementCard = popupNewCard.querySelector('.popup__form');
const placeNameInput = formElementCard.elements['place-name'];
const linkInput = formElementCard.elements.link;

// добавление карточки 
function renderCard(el) {
  cardContainer.append(createCard(el, deleteCardItem, likeCard, openImage));
};

function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const obj = {
    name: placeNameInput.value,
    link: linkInput.value,
  };
  
  cardContainer.prepend(createCard(obj, deleteCardItem, likeCard, openImage));
  closeModal(popupNewCard);
  evt.target.reset();
};

buttonAdd.addEventListener('click', () => {
  openModal(popupNewCard);
});

formElementCard.addEventListener('submit', handleFormSubmitCard);

// вывод карточки на страницу 
initialCards.forEach((item) => {
  renderCard(item);
});

// изображение 
const popupOpenImage = document.querySelector('.popup_type_image');
const popupImage = popupOpenImage.querySelector('.popup__image');
const popupImageCaption = popupOpenImage.querySelector('.popup__caption');

function openImage(evt) {
  if (evt.target.classList.contains('card__image')) {
    popupImage.src = evt.target.src;
    popupImageCaption.textContent = popupImage.alt =
      evt.target.closest('.card').querySelector('.card__title').textContent;
    openModal(popupOpenImage);
  }
};



