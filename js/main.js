var $overlay = document.querySelector('.overlay');
var $cardModalContainer = document.querySelector('.card-modal-container');
var $cardWrapper = document.querySelector('.clow-card-wrapper');
var $modalRow = document.querySelector('.modal-row');

$cardWrapper.addEventListener('click', handleClick);
$cardWrapper.addEventListener('click', faveClick);
window.addEventListener('click', handleClickOff);

function handleClick(event) {
  if (event.target.tagName !== 'IMG') {
    return;
  }

  $overlay.className = 'overlay';
  $cardModalContainer.className = 'card-modal-container';

  var $allClowCards = Array.from(document.querySelectorAll('.clow-card-img'));
  var targetId = event.target.getAttribute('data-id');

  for (var i = 0; i < $allClowCards.length; i++) {
    var id = $allClowCards[i].getAttribute('data-id');

    if (id === targetId) {
      renderCard(targetId);
    }
  }
}

function handleClickOff(event) {

  if (event.target.className !== 'card-modal-container') {
    return;
  }

  $overlay.className = 'overlay hidden';
  $cardModalContainer.className = 'card-modal-container hidden';

  // As long as modal div has children, remove them all
  while ($modalRow.firstChild) {
    $modalRow.removeChild($modalRow.firstChild);
  }
}

// Store button state in local storage
function faveClick(event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  var id = event.target.getAttribute('data-id');

  if (event.target.className === 'fa-regular fa-heart') {
    event.target.className = 'fa-solid fa-heart';
    localStorage.setItem(id, true);
  } else {
    event.target.className = 'fa-regular fa-heart';
    localStorage.setItem(id, false);
  }
}

/*
MODAL DOM TREE

<div class="col-half">
  <img src="images/ClowJump.jpg" alt="">
</div>
<div class="col-half">
  <h3 class="card-title"><i class="fa-regular fa-heart"></i> The Jump</h3>
  <p><span class="text-gray">Kanji</span> CH</p>
  <p><span class="text-gray">Card Number#</span> 12</p>
  <p><span class="text-gray">Description</span></p>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor</p>
</div>
*/

function renderCard(id) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://protected-taiga-89091.herokuapp.com/api/card/' + id);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var $colHalf = document.createElement('div');
    $colHalf.setAttribute('class', 'col-half appended-div');

    var $colImg = document.createElement('img');
    $colImg.setAttribute('src', xhr.response.clowCard);

    var $colHalf2nd = document.createElement('div');
    $colHalf2nd.setAttribute('class', 'col-half appended-div');

    var $h3 = document.createElement('h3');
    $h3.setAttribute('class', 'card-title');

    var $heartIcon = document.createElement('i');
    $heartIcon.setAttribute('class', 'fa-regular fa-heart');

    var $nameTextNode = document.createTextNode(' ' + xhr.response.englishName);
    var $kanjiTextNode = document.createTextNode(xhr.response.kanji);
    var $numberTextnode = document.createTextNode(xhr.response.cardNumber);

    var $p1 = document.createElement('p');
    var $p2 = document.createElement('p');
    var $p3 = document.createElement('p');
    var $p4 = document.createElement('p');

    var $span1 = document.createElement('span');
    var $span2 = document.createElement('span');
    var $span3 = document.createElement('span');
    $span1.setAttribute('class', 'text-gray');
    $span2.setAttribute('class', 'text-gray');
    $span3.setAttribute('class', 'text-gray');

    $span1.textContent = 'Kanji ';
    $span2.textContent = 'Card Number# ';
    $span3.textContent = 'Description';

    $colHalf.appendChild($colImg);
    $colHalf2nd.append($h3, $p1, $p2, $p3, $p4);
    $h3.append($heartIcon, $nameTextNode);
    $p1.append($span1, $kanjiTextNode);
    $p2.append($span2, $numberTextnode);
    $p3.append($span3);
    $p4.textContent = xhr.response.meaning;

    $modalRow.append($colHalf, $colHalf2nd);
  });
  xhr.send();
}
