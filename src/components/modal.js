export { openModal, closeModal };

// open modal
function openModal(el) {
  setTimeout(() => el.classList.add('popup_is-opened'), 0);
  el.classList.add('popup_is-animated');
  document.addEventListener('keydown', closeByEscape);
}
// Close modal
function closeModal(el) {
  el.classList.remove('popup_is-opened');
  setTimeout(() => el.classList.remove('popup_is-animated'), 600);
  document.removeEventListener('keydown', closeByEscape);
}
// close "Escape"
function closeByEscape(evt) {
  if (evt.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
}
