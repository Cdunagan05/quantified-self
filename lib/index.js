var Exercise = require('./exercise');
var Food = require('./food');


$(document).ready(function() {

  var holdFoods = document.getElementById("hold-foods-table");
  var holdExercises = document.getElementById("hold-exercises-table");
  var exercises = JSON.parse(localStorage.getItem("hold-exercises-table"));
  var foods = JSON.parse(localStorage.getItem('hold-foods-table'));
  var addBreakfast = document.getElementById("add-breakfast");
  var addLunch = document.getElementById("add-lunch");
  var addDinner = document.getElementById("add-dinner");
  var addSnacks = document.getElementById("add-snack");
  var addExercises = document.getElementById("add-exercise");
  var holdBreakfast = document.getElementById("breakfast-table");
  var holdLunch = document.getElementById("lunch-table");
  var holdDinner = document.getElementById("dinner-table");
  var holdSnacks = document.getElementById("snack-table");
  var holdCompletedExercises = document.getElementById("completed-exercise-table");
  var dateBlock = document.getElementById("date-holder");

  $(addBreakfast).on("click", function(e){
    var selectedFoods = $('input[type=checkbox]:checked').parent().parent();
    setTableItems(selectedFoods, holdBreakfast);
    BreakfastCalorieCounter();
  });

  $(addLunch).on("click", function(e){
    var selectedFoods = $('input[type=checkbox]:checked').parent().parent();
    setTableItems(selectedFoods, holdLunch);
    LunchCalorieCounter();
  });

  $(addDinner).on("click", function(e){
    var selectedFoods = $('input[type=checkbox]:checked').parent().parent();
    setTableItems(selectedFoods, holdDinner);
  });

  $(addSnacks).on("click", function(e){
    var selectedFoods = $('input[type=checkbox]:checked').parent().parent();
    setTableItems(selectedFoods, holdSnacks);
  });

  $(addExercises).on("click", function(e){
    var selectedExercises = $('input[type=checkbox]:checked').parent().parent();
    setTableItems(selectedExercises, holdCompletedExercises);
    storeDay(dateBlock.innerHTML);
  });

  function setTableItems(selectedItems, specificTable){
    for (var i = 0; i <= Object.keys(selectedItems).length; i++) {
      var specificRow = selectedItems[i]
      specificTable.innerHTML += specificRow.innerHTML;
      var dateBlock = document.getElementById("date-holder");
      // calorieCounter();
      storeDay(dateBlock.innerHTML);
    };
  };

  function BreakfastCalorieCounter() {
    var BreakCalCells = document.querySelectorAll("#breakfast-table .f-count");
    var total = 0
    for(var i=0; i < BreakCalCells.length; i++) {
      var thisCount = BreakCalCells[i].innerHTML;
      total += parseInt(thisCount);
    };
    var placeForCalories = document.getElementById('total-breakfast-cals');
    placeForCalories.innerHTML =  "CALORIE COUNTER: " + total;
  }

  function LunchCalorieCounter() {
    var LunchCalCells = document.querySelectorAll("#lunch-table .f-count");
    var total = 0
    for(var i=0; i < LunchCalCells.length; i++) {
      var thisCount = LunchCalCells[i].innerHTML;
      total += parseInt(thisCount);
    };
    var placeForCalories = document.getElementById('total-lunch-cals');
    placeForCalories.innerHTML =  "CALORIE COUNTER: " + total;
  }

  // function BreakfastCalorieCounter() {
  //   var calCells = document.querySelectorAll("#breakfast-table .f-count");
  //   var total = 0
  //   for(var i=0; i < calCells.length; i++) {
  //     var thisCount = calCells[i].innerHTML;
  //     total += parseInt(thisCount);
  //   };
  //   var placeForCalories = document.getElementById('total-breakfast-cals');
  //   placeForCalories.innerHTML =  "CALORIE COUNTER: " + total;
  // }
  //
  // function BreakfastCalorieCounter() {
  //   var calCells = document.querySelectorAll("#breakfast-table .f-count");
  //   var total = 0
  //   for(var i=0; i < calCells.length; i++) {
  //     var thisCount = calCells[i].innerHTML;
  //     total += parseInt(thisCount);
  //   };
  //   var placeForCalories = document.getElementById('total-breakfast-cals');
  //   placeForCalories.innerHTML =  "CALORIE COUNTER: " + total;
  // }

  var storeDay = function(date) {
    var diaryJSON = localStorage.getItem('diary');
    if(diaryJSON === null){
      diaryJSON = '{}';
    }
    var allDays = JSON.parse(diaryJSON);

    var breakfastArray = $('#breakfast-table tr').map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var lunchArray = $('#lunch-table tr').map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var dinnerArray = $('#dinner-table tr').map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var snacksArray = $('#snack-table tr').map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var exerciseArray = $('#exercises-table tr').map(function(index, row){
      var exerciseName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: exerciseName, calories: calories};
    })

    allDays[date]["breakfast"] = JSON.stringify(breakfastArray[0]);
    allDays[date]["lunch"] = JSON.stringify(lunchArray[0]);
    allDays[date]["dinner"] = JSON.stringify(dinnerArray[0]);
    allDays[date]["snacks"] = JSON.stringify(snacksArray[0]);
    allDays[date]["exercises"] = JSON.stringify(exerciseArray[0]);
    diaryJSON = JSON.stringify(allDays);
    localStorage.setItem('diary', diaryJSON);
  };

  function displayDate() {
    var today = new Date();
    today.setDate(today.getDate());
    dateBlock.innerHTML = today.toLocaleDateString();
  };

  function nextDate() {
    var date = new Date();

    $("#next-day").on("click", function(e){
      date.setDate(date.getDate() + 1);
      document.getElementById('date-holder').innerHTML = date.toLocaleDateString();
      storeDay(dateBlock.innerHTML);
    });

    $("#previous-day").on("click", function(e){
      date.setDate(date.getDate() - 1);
      document.getElementById('date-holder').innerHTML = date.toLocaleDateString();
      storeDay(dateBlock.innerHTML);
    });

  };

  function setFood(){
    for (var i = 1; i <= Object.keys(foods).length; i++) {
      holdFoods.innerHTML += "<tr><td><input type='checkbox' id='foods-checkbox'/>" + " " + foods[i].food + "</td><td class='f-count'>" + foods[i].calories + "</td></tr>";
    }
  };

  function setExercises(){
    for (var i = 1; i <= Object.keys(exercises).length; i++) {
      holdExercises.innerHTML += "<tr><td><input type='checkbox' id='exercises-checkbox'/>" + " " + exercises[i].exercise + "</td><td class='ex-count'>" + exercises[i].calories + "</td></tr>";
    }
  };

  function displayDiary(date){
    var diary = JSON.parse(localStorage.getItem('diary'));
    var diaryForToday = diary[date];
  }
  
  function displayBreakfast(diary){
    var breakfast = JSON.parse(diary["breakfast"]);
    for (var i = 0; i <= Object.keys(breakfast).length; i++) {
      holdBreakfast.innerHTML += "<tr><td><input type='checkbox' id='foods-checkbox'/>" + " " + breakfast[i].name + "</td><td>" + foods[i].calories + "</td></tr>";
    };
  }

  displayDate();
  nextDate();
  setFood();
  setExercises();
  displayDiary(dateBlock.innerHTML);
});
