var $overlay = document.querySelector('.overlay');
var $cardModalContainer = document.querySelector('.card-modal-container');
var $cardWrapper = document.querySelector('.clow-card-wrapper');
var $modalRow = document.querySelector('.modal-row');
var $fClowContainer = document.querySelector('.f-clow-container');

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

// Store button state in local storage on click
const arr = [];

function faveClick(event) {
  if (event.target.tagName !== 'I') {
    return;
  }

  const $filledHearts = document.querySelectorAll('.fa-solid.fa-heart.heart');
  var id = event.target.getAttribute('data-id');
  var $cardDivId = document.querySelector('div[data-id="' + id + '"]');

  // for (let i = 0; i < $filledHearts.length; i++) {
  //   console.log(i);
  // }

  if (event.target.className === 'fa-regular fa-heart heart') {
    event.target.className = 'fa-solid fa-heart heart';
    localStorage.setItem(id, true);
    localStorage.setItem('listHasItems', 'has items');
    arr.push(event.target);
    renderFavorite(id);
  } else {
    event.target.className = 'fa-regular fa-heart heart';
    localStorage.setItem(id, false);
    arr.splice(event.target, 1);
    if ($cardDivId) {
      $cardDivId.remove();
    }
  }

  console.log('value of arr:', arr);
  console.log('length of arr:', arr.length);
  return arr;

  // console.log('value of $filledHearts:', $filledHearts);
  // console.log('length of $filledHearts:', $filledHearts.length);
}
// console.log('value of arr outside of callback:', arr);

// function spliceFaves(faveId) {
//   for (var i = 0; i < data.faves.length; i++) {
//     if (data.faves[i] === faveId) {
//       data.faves.splice(i, 1);
//     }
//   }
// }
var $favesList = document.querySelector('[data-view="faves-list"]');
var $cardsView = document.querySelector('[data-view="cards-view"]');
var $formContainer = document.querySelector('.form-container');
var $favoritesAnchor = document.querySelector('.favoritesAnchor');
var $navHeader = document.querySelector('.nav-header');

$favoritesAnchor.addEventListener('click', showFavoritesList);
// $favoritesAnchor.addEventListener('click', keepFavoriteView);
$navHeader.addEventListener('click', showCardList);

function showFavoritesList() {
  const $noFavesCol = document.querySelector('.no-faves-col');
  const $fClowCardWrapper = document.querySelectorAll('.f-clow-card-wrapper');
  const listHasItems = localStorage.getItem('listHasItems');
  console.log($fClowCardWrapper);

  if ($fClowCardWrapper.length === 0) {
    $noFavesCol.className = 'col-full no-faves-col';
  }

  if (listHasItems === 'has items') {
    $noFavesCol.className = 'col-full no-faves-col hidden';
  }

  $favesList.className = '';
  $cardsView.className = 'hidden';
  $formContainer.className = 'form-container hidden';
  localStorage.setItem('faves', 'viewed');
}

function showCardList() {
  $favesList.className = 'hidden';
  $cardsView.className = '';
  $formContainer.className = 'form-container';
  localStorage.setItem('faves', 'hide');
}

window.addEventListener('beforeunload', () => {
  const $fClowCardWrapper = document.querySelectorAll('.f-clow-card-wrapper');

  if ($fClowCardWrapper.length > 0) {
    localStorage.setItem('listHasItems', 'has items');
  } else if ($fClowCardWrapper.length <= 0) {
    localStorage.setItem('listHasItems', 'no items');
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  var faves = localStorage.getItem('faves');
  const $noFavesCol = document.querySelector('.no-faves-col');
  const listHasItems = localStorage.getItem('listHasItems');

  if (listHasItems === 'has items') {
    $noFavesCol.className = 'col-full no-faves-col hidden';
  }

  if (faves === 'viewed') {
    showFavoritesList();
  }

  for (var keys in localStorage) {
    if (localStorage[keys] === 'true') {
      renderFavorite(keys);
    }
  }
});

/*
FAVORITES LIST DOM TREE

<div class="f-clow-card-wrapper row" data-id="">
  <div class="clow-card f-clow-card col-full">
    <div class="f-row">
      <div class="col-half">
        <div class="f-img-container">
          <img src="images/ClowJump.jpg" class="clow-card-img">
        </div>
      </div>
      <div class="col-half">
        <div class="d-flex">
          <div class="col-half"><h3>The Jump</h3></div>
          <div class="col-half"><div class="edit-btn"><i class="fa-regular fa-pen-to-square text-gray"></i></div></div>
        </div>
        <p class="note">Note</p>
        <p class="note-preview">This is a note. Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      </div>
    </div>
    <div class="delete-anchor-div"><a href="#">delete</a></div>
  </div>
</div>
*/

function renderFavorite(faveId) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://protected-taiga-89091.herokuapp.com/api/card/' + faveId);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    var $fClowCardWrapper = document.createElement('div');
    $fClowCardWrapper.setAttribute('class', 'f-clow-card-wrapper row');
    $fClowCardWrapper.setAttribute('data-id', xhr.response._id);

    var $clowCard = document.createElement('div');
    $clowCard.setAttribute('class', 'clow-card f-clow-card col-full');

    var $fRow = document.createElement('div');
    $fRow.setAttribute('class', 'f-row');

    var $colHalf = document.createElement('div');
    $colHalf.setAttribute('class', 'col-half');

    var $fImgContainer = document.createElement('div');
    $fImgContainer.setAttribute('class', 'f-img-container');

    var $clowCardImg = document.createElement('img');
    $clowCardImg.setAttribute('src', xhr.response.clowCard);
    $clowCardImg.setAttribute('class', 'clow-card-img');

    var $colHalf2nd = document.createElement('div');
    $colHalf2nd.setAttribute('class', 'col-half');

    var $dFlex = document.createElement('div');
    $dFlex.setAttribute('class', 'd-flex');

    var $colHalfSub = document.createElement('div');
    var $colHalfSub2 = document.createElement('div');
    $colHalfSub.setAttribute('class', 'col-half');
    $colHalfSub2.setAttribute('class', 'col-half');

    var $h3 = document.createElement('h3');

    var $editBtn = document.createElement('div');
    $editBtn.setAttribute('class', 'edit-btn');

    var $penToSquare = document.createElement('i');
    $penToSquare.setAttribute('class', 'fa-regular fa-pen-to-square text-gray');

    var $note = document.createElement('p');
    $note.setAttribute('class', 'note');

    var $notePreview = document.createElement('p');
    $notePreview.setAttribute('class', 'note-preview');

    var $deleteAnchorDiv = document.createElement('div');
    $deleteAnchorDiv.setAttribute('class', 'delete-anchor-div');

    var $anchor = document.createElement('a');
    $anchor.setAttribute('href', '#');

    $fClowCardWrapper.appendChild($clowCard);
    $clowCard.append($fRow, $deleteAnchorDiv);
    $fRow.append($colHalf, $colHalf2nd);
    $deleteAnchorDiv.appendChild($anchor);
    $colHalf.appendChild($fImgContainer);
    $fImgContainer.appendChild($clowCardImg);
    $colHalf2nd.append($dFlex, $note, $notePreview);
    $dFlex.append($colHalfSub, $colHalfSub2);
    $colHalfSub.appendChild($h3);
    $colHalfSub2.appendChild($editBtn);
    $editBtn.appendChild($penToSquare);

    $h3.textContent = xhr.response.englishName;
    $note.textContent = 'Note';
    $notePreview.textContent = 'This is a note.';
    $anchor.textContent = 'delete';

    $fClowContainer.appendChild($fClowCardWrapper);
  });
  xhr.send();
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

/*
MAIN DOM TREE

<div class="col-fifth col-fourth col-third">
  <div class="clow-card" data-card-num="">
    <img src="images/ClowJump.jpg" class="clow-card-img" data-id="603a6076e708590015ca94d1">
    <div class="clow-card-text">
      <p><i class="fa-regular fa-heart"></i> <span class="card-title">The Jump</span></p>
    </div>
  </div>
</div>
*/

function getCards() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://protected-taiga-89091.herokuapp.com/api/card?pageSize=55');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.data.length; i++) {
      var $colFifth = document.createElement('div');
      $colFifth.setAttribute('class', 'col-fifth col-fourth col-third');

      var $clowCard = document.createElement('div');
      $clowCard.setAttribute('class', 'clow-card');
      $clowCard.setAttribute('data-number', xhr.response.data[i].cardNumber);

      var $cardImg = document.createElement('img');
      $cardImg.setAttribute('src', xhr.response.data[i].clowCard);
      $cardImg.setAttribute('class', 'clow-card-img');
      $cardImg.setAttribute('data-id', xhr.response.data[i]._id);

      var $clowCardText = document.createElement('div');
      $clowCardText.setAttribute('class', 'clow-card-text');

      var $cardName = document.createElement('p');
      var $heartIcon = document.createElement('i');
      $heartIcon.setAttribute('data-id', xhr.response.data[i]._id);
      $heartIcon.setAttribute('class', 'fa-regular fa-heart heart');

      var $cardTitle = document.createElement('span');
      $cardTitle.setAttribute('class', 'card-title');

      var $nameTextNode = document.createTextNode(xhr.response.data[i].englishName);

      $colFifth.appendChild($clowCard);
      $clowCard.append($cardImg, $clowCardText);
      $clowCardText.appendChild($cardName);
      $cardName.append($heartIcon, $cardTitle);
      $cardTitle.appendChild($nameTextNode);

      $cardWrapper.appendChild($colFifth);

    }
  });
  xhr.send();
  xhr.addEventListener('load', function (event) {
    var $heartIcons = document.querySelectorAll('.heart');

    var temp = [];
    for (var i = 0; i < $heartIcons.length; i++) {
      var $heartIdNum = $heartIcons[i].getAttribute('data-id');
      temp.push($heartIdNum);
    }

    for (var keys in localStorage) {
      var LSValue = localStorage.getItem(keys);

      for (var j = 0; j < temp.length; j++) {
        if (keys === temp[j]) {
          if (LSValue === 'true') {
            var preserveButton = document.querySelector('i[data-id="' + temp[j] + '"]');
            preserveButton.className = 'fa-solid fa-heart heart';
          }
        }
      }
    }
  });
}

getCards();
