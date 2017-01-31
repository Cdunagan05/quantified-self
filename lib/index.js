var Exercise = require('./exercise');
var Food = require('./food');


$(document).ready(function() {

  var holdFoods = document.getElementById("foods-table");
  var foods = JSON.parse(localStorage.getItem('hold-foods-table'));

  function displayDate() {
    var dateBlock = document.getElementById("date-holder");
    var today = new Date();
    today.setDate(today.getDate());
    dateBlock.innerHTML = today.toLocaleDateString();
  };

  function nextDate() {
    var date = new Date();

    $("#next-day").on("click", function(e){
      date.setDate(date.getDate() + 1);
      document.getElementById('date-holder').innerHTML = date.toLocaleDateString();
    });

    $("#previous-day").on("click", function(e){
      date.setDate(date.getDate() - 1);
      document.getElementById('date-holder').innerHTML = date.toLocaleDateString();
    });

  };

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
  };

  displayDate();
  nextDate();

});

setFood();
setExercises();
