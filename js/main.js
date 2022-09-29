var $cardWrapper = document.querySelector('.clow-card-wrapper');
$cardWrapper.addEventListener('click', handleClick);

function handleClick(event) {
  // event.preventDefault();

  if (event.target.tagName === 'I') {
    return;
  }
  var $overlay = document.querySelector('.overlay');
  var $cardModalContainer = document.querySelector('.card-modal-container');

  $overlay.className = 'overlay';
  $cardModalContainer.className = 'card-modal-container';
}
