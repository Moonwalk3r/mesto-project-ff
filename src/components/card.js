export {createCard, deleteCardItem, likeCard}
import { putLikeCounterRequest, deleteLikeCounterRequest
} from './api';
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createCard(cardData, deleteFn, likeFn, onImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link; 
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  deleteButton.addEventListener('click', () => deleteFn(cardElement));
  likeButton.addEventListener('click', likeFn);
  cardImage.addEventListener('click', () => onImageClick(cardData));
  return cardElement;
}; 

// @todo: Функция удаления карточки
function deleteCardItem(elem) {
  elem.remove();
};

// Функция лайков 
function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
