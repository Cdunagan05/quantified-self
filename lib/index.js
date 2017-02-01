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
  });
  
  $(addLunch).on("click", function(e){
    var selectedFoods = $('input[type=checkbox]:checked').parent().parent();
    setTableItems(selectedFoods, holdLunch);
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
      storeDay(dateBlock.innerHTML);
    };
  };

  var storeDay = function(date) {
    var diaryJSON = localStorage.getItem('diary');
    if(diaryJSON === null){
      diaryJSON = '{}';
    }
    var allDays = JSON.parse(diaryJSON);
    
    var breakfastArray = $('#breakfast-table tr').slice(1).map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var lunchArray = $('#lunch-table tr').slice(1).map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var dinnerArray = $('#dinner-table tr').slice(1).map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var snacksArray = $('#snack-table tr').slice(1).map(function(index, row){
      var foodName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: foodName, calories: calories};
    })

    var exerciseArray = $('#exercises-table tr').slice(1).map(function(index, row){
      var exerciseName = row.cells[0].textContent;
      var calories = row.cells[1].textContent;
      return {name: exerciseName, calories: calories};
    })
    
    allDays[date]["breakfast"] = breakfastArray;
    allDays[date]["lunch"] = lunchArray;
    allDays[date]["dinner"] = dinnerArray;
    allDays[date]["snacks"] = snacksArray;
    allDays[date]["exercises"] = exerciseArray;
    debugger
    diaryJSON = JSON.stringify(allDays);
    localStorage.setItem('diary', diaryJSON);
  };
   
  function displayDate() {
    var today = new Date();
    today.setDate(today.getDate());
    dateBlock.innerHTML = today.toLocaleDateString();
    storeDay(dateBlock.innerHTML);
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
      holdFoods.innerHTML += "<tr><td><input type='checkbox' id='foods-checkbox'/>" + " " + foods[i].food + "</td><td>" + foods[i].calories + "</td></tr>";
    }
  };

  function setExercises(){
    for (var i = 1; i <= Object.keys(exercises).length; i++) {
      holdExercises.innerHTML += "<tr><td><input type='checkbox' id='exercises-checkbox'/>" + " " + exercises[i].exercise + "</td><td>" + exercises[i].calories + "</td></tr>";
    }
  };

  displayDate();
  nextDate();
  setFood();
  setExercises();

});
