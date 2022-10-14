/* exported data */

var data = {
  view: 'card-list',
  faves: [],
  editing: null,
  itemId: 1
};

/*
window.addEventListener('beforeunload', function () {
  var faveItemsJSON = JSON.stringify(data);
  localStorage.setItem('fave-item', faveItemsJSON);
});

var getFaveItem = localStorage.getItem('fave-item');

if (getFaveItem !== null) {
  data = JSON.parse(getFaveItem);
}
 */
