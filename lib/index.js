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

  var holdExercises = document.getElementById("exercises-table");
  var exercises = JSON.parse(localStorage.getItem("hold-exercises-table"));

  function setExercises(){
    for (var i = 1; i <= Object.keys(exercises).length; i++) {
      holdExercises.innerHTML += "<tr><td>" + exercises[i].exercise + "</td><td>" + exercises[i].calories + "</td></tr>";
    }
  }

  setFood();
  setExercises();

});
