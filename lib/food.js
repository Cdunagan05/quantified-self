require('bootstrap')
var $ = require('jquery')
var foodCount = 0;

$(document).ready(function() {

  var foodSubmit = document.getElementById('food-submit');
  var foodDelete = document.getElementById('food-delete');
  var foodName = document.getElementById('name-field');
  var calorieNumber = document.getElementById('calorie-field');
  var allFoods = document.getElementById("all-foods-table");
  var alertBox = document.getElementById("alert-message");
  var holdFoods = document.getElementById("hold-foods-table");
  var editFoodName = document.getElementById("food-name");
  var editFoodCalories = document.getElementById("food-calories");

  foodSubmit.addEventListener('click', function(){
    var food = foodName.value;
    var calories = calorieNumber.value;
    if(food === ''){
      flash("Please enter a food name");
    }else if(calories === ''){
      flash("Please enter a calorie amount");
    }else {
      submitFood(food, calories);
      storeFood(food, calories, foodCount);
    }
  });
    
  function submitFood(food, calories) {
    var newRow = document.createElement("tr");
    newRow.setAttribute("id", "food-row");
    var nameCell = document.createElement('td');
    nameCell.innerText = food;
    nameCell.setAttribute("id", "food-name");
    var calorieCell = document.createElement('td');
    calorieCell.innerText = calories;
    calorieCell.setAttribute("id", "food-calories");
    var deleteCell = document.createElement('td');
    deleteCell.setAttribute("id", foodCount + "-" + food);
    deleteCell.innerHTML = "<button class='btn btn-default delete-food-button'>Delete</button>";
    newRow.appendChild(nameCell);
    newRow.appendChild(calorieCell);
    newRow.appendChild(deleteCell);
    holdFoods.insertBefore(newRow, holdFoods.firstChild);
    foodCount++;
  };  
  
  function displayFoods() {
    var foodsHash = JSON.parse(localStorage.getItem('hold-foods-table'))
    Object.values(foodsHash).forEach(function(element){
      submitFood(element.food, element.calories)
    });
  }
  displayFoods();  

  $(".delete-food-button").click(function() {
    var toBeDeleted = $(this).parent().parent();
    var storageId = (toBeDeleted[0].id[0]++ + 1);
    var foodStorage = localStorage["hold-foods-table"];
    var foodStorageParsed = JSON.parse(foodStorage);
    delete foodStorageParsed[(storageId.toString())];
    var updatedStorage = JSON.stringify(foodStorageParsed);
    localStorage.setItem('hold-foods-table', updatedStorage);
    toBeDeleted.remove();
  });  

  
});

function flash(message) {
  $("#alert-message").remove();
  $('.alert').prepend(
    '<div id="alert-message">' + message + '</div>'
  );
  $('#alert-message').delay(1250).fadeOut();
};

function storeFood(food, calories, counter) {
  var foodsJSON = localStorage.getItem('hold-foods-table');
  if(foodsJSON === null){
    foodsJSON = '{}';
  }
  var currentFoods = JSON.parse(foodsJSON);
  currentFoods[counter] = {food: food, calories: calories};
  foodsJSON = JSON.stringify(currentFoods);
  localStorage.setItem('hold-foods-table', foodsJSON);
};

  
$(function() {

  var $td = $("td");

  $td.on({
    // "keypress" : function(e) {
    //   if (e.which !== 13) { // On Return key - "save" cell
    //     e.preventDefault();
    //     $(this).prop("contenteditable", true);
    //   }
    // },
    "dblclick" : function() {
      $td.not(this).prop("contenteditable", false);
      $(this).prop("contenteditable", true);
    }
  });

});