export { openModal, closeModal, setCloseModalByClickListeners };

// open modal
function openModal(popup) {
  setTimeout(() => popup.classList.add('popup_is-opened'), 0);
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeByEscape);
}
// Close modal
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  setTimeout(() => popup.classList.remove('popup_is-animated'), 600);
  document.removeEventListener('keydown', closeByEscape);
}

// close "Escape"
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