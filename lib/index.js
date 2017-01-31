var Exercise = require('./exercise');
var Food = require('./food');


$(document).ready(function() {

  var dateBlock = document.getElementById("date-holder");


function displayDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }

  if(mm<10) {
      mm='0'+mm
  }

  today = mm+'/'+dd+'/'+yyyy;
  // document.write(today);
  dateBlock.innerHTML = "<h2><p id='previous-day'> ⬅️ </p>" + today + "<p id='next-day'> ➡️ </p></h2>";
  var dateNext = document.getElementById("next-day");
  dateNext.addEventListener("click", function() {
    var tomorrow = new Date();
    today = (tomorrow.setDate(tomorrow.getDate() + 1));
    var dd = tomorrow.getDate();
    var mm = tomorrow.getMonth()+1; //January is 0!
    var yyyy = tomorrow.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = mm+'/'+dd+'/'+yyyy;
    dateBlock.innerHTML = "<h2><p id='previous-day'> ⬅️ </p>" + today + "<p id='next-day'> ➡️ </p></h2>";
    // debugger
  })
};

displayDate();


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
