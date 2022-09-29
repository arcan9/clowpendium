/* exported data */

var $cardWrapper = document.querySelector('.clow-card-wrapper');

/*
DOM TREE

<div class="col-fifth">
      <div class="clow-card" data-card-num="">
        <img src="images/ClowJump.jpg" class="clow-card-img">
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
    // console.log(xhr.response);
    for (var i = 0; i < xhr.response.data.length; i++) {
      var $colFifth = document.createElement('div');
      $colFifth.setAttribute('class', 'col-fifth');

      var $clowCard = document.createElement('div');
      $clowCard.setAttribute('class', 'clow-card');
      $clowCard.setAttribute('data-card-num', xhr.response.data[i].cardNumber);

      var $cardImg = document.createElement('img');
      $cardImg.setAttribute('src', xhr.response.data[i].clowCard);
      $cardImg.setAttribute('class', 'clow-card-img');
      $cardImg.setAttribute('data-id', xhr.response.data[i]._id);

      var $clowCardText = document.createElement('div');
      $clowCardText.setAttribute('class', 'clow-card-text');

      var $cardName = document.createElement('p');
      var $heartIcon = document.createElement('i');
      $heartIcon.setAttribute('class', 'fa-regular fa-heart');

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
