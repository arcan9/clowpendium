/* exported data */

var $cardWrapper = document.querySelector('.clow-card-wrapper');

/*
DOM TREE

<div class="col-fifth">
      <div class="clow-card" data-card-num="">
        <img src="images/ClowJump.jpg">
        <div class="clow-card-text">
          <p><i class="fa-regular fa-heart"></i> The Jump</p>
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
      $colFifth.setAttribute('class', 'col-fifth');

      var $clowCard = document.createElement('div');
      $clowCard.setAttribute('class', 'clow-card');
      $clowCard.setAttribute('data-card-num', xhr.response.data[i].cardNumber);

      var $cardImg = document.createElement('img');
      $cardImg.setAttribute('src', xhr.response.data[i].clowCard);

      var $clowCardText = document.createElement('div');
      $clowCardText.setAttribute('class', 'clow-card-text');

      var $cardName = document.createElement('p');
      var $heartIcon = document.createElement('i');
      $heartIcon.setAttribute('class', 'fa-regular fa-heart');

      var $nameTextNode = document.createTextNode(xhr.response.data[i].englishName);

      $colFifth.appendChild($clowCard);
      $clowCard.append($cardImg, $clowCardText);
      $clowCardText.appendChild($cardName);
      $cardName.append($heartIcon, $nameTextNode);

      $cardWrapper.appendChild($colFifth);
    }
  });
  xhr.send();
}

getCards(55);

// click on an individual card
// display a modal with card info. Create DOM tree for it.
// when card is clicked, api data is rendered and appended to modal
