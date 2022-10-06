/* exported data */

var data = {
  view: 'card-list',
  faves: [],
  editing: null,
  itemId: 0
};

window.addEventListener('beforeunload', function () {
  var faveItemsJSON = JSON.stringify(data);
  localStorage.setItem('fave-item', faveItemsJSON);
});

var getFaveItem = localStorage.getItem('fave-item');

if (getFaveItem !== null) {
  data = JSON.parse(getFaveItem);
}

var $cardWrapper = document.querySelector('.clow-card-wrapper');

/*
DOM TREE

<div class="col-fifth col-fourth col-third">
  <div class="clow-card" data-card-num="">
    <img src="images/ClowJump.jpg" class="clow-card-img" data-id="603a6076e708590015ca94d1">
    <div class="clow-card-text">
      <p><i class="fa-regular fa-heart"></i> <span class="card-title">The Jump</span></p>
    </div>
  </div>
</div>
*/

function getCards(pageSize) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://protected-taiga-89091.herokuapp.com/api/card?pageSize=' + pageSize);
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
      $heartIcon.setAttribute('class', 'fa-regular fa-heart');

      for (var j = 0; j < localStorage.length; j++) {
        var local = localStorage.getItem(localStorage.key(i));
        if (local === 'true') {
          $heartIcon.setAttribute('class', 'fa-solid fa-heart');
        } else {
          $heartIcon.setAttribute('class', 'fa-regular fa-heart');

        }
      }

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
}

getCards(55);
