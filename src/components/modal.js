
function openPopap(popup) {
  popup.classList.add('popup_is-animated','popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
 
};


function closePopap(popup) { 
  popup.classList.remove('popup_is-opened'); 
  document.removeEventListener('keydown', closeByEsc); 
}

function closeByEsc(evt) {
  if(evt.key === "Escape"){
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopap(openedPopup);
}
}
export {openPopap, closePopap}


