export { openModal, closeModal, setCloseModalByClickListeners };
////1
function openModal(popup) {
  popup.classList.add('popup_is-opened')
  document.addEventListener('keydown', closeByEscape);
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.code === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
  }
}

function setCloseModalByClickListeners(popupList) {
  popupList.forEach(popup => {
      const closeButton = popup.querySelector('.popup__close');
      closeButton.addEventListener('click', () => closeModal(popup));
      popup.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup_is-opened')) {
              closeModal(popup);
          }
      });
  });
}
