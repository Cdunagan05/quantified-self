var Exercise = require('./exercise');
var Food = require('./food');

$(document).ready(function() {


  var holdFoods = document.getElementById("foods-table");
  var foods = JSON.parse(localStorage.getItem('hold-foods-table'));

  function setFood(){
    for (var i = 1; i <= Object.keys(foods).length; i++) {
      holdFoods.innerHTML += "<tr><td>" + foods[i].food + "</td><td>" + foods[i].calories + "</td></tr>";
    }
  };

  setFood();

});
