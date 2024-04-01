// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(imageSource, titleValue, deleteCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    
    cardImage.src = imageSource;
    cardImage.alt = titleValue;
    cardTitle.textContent = titleValue;
    
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
  }

// @todo: Функция удаления карточки
function removeCard(event) {
    event.target.closest('.places__item').remove();
  }

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
  placesList.append(createCard(elem.link, elem.name, removeCard));
})