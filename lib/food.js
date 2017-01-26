require('bootstrap')

var foodSubmit = document.getElementById('food-submit');
var foodDelete = document.getElementById('food-delete')
var foodName = document.getElementById('name-field');
var calorieNumber = document.getElementById('calorie-field');
var allFoods = document.getElementById("all-foods-table");
var alertBox = document.getElementById("alert-message");
var holdFoods = document.getElementById("hold-foods-table");
var foodCount = 0;

foodSubmit.addEventListener('click', function(){
  var food = foodName.value;
  var calories = calorieNumber.value;
  if(food === ''){
    flash("Please enter a food name");
  }else if(calories === ''){
    flash("Please enter a calorie amount");
  }else {
    submitFood(food, calories);
    storeFood(food, calories);
  }
});

// foodDelete.addEventListener('click', function(){
//   var deleteRow = function(rowId) {
//     var elem = document.getElementById(rowId);
//     allFoods.remove(elem);
//   }
//   deleteRow(1);
// });

function flash(message) {
  $("#alert-message").remove();
  $('.alert').prepend(
    '<div id="alert-message">' + message + '</div>'
  );
  $('#alert-message').delay(1250).fadeOut();
}

function storeFood(food, calories) {
  var foodsJSON = localStorage.getItem('hold-foods-table');
  if(foodsJSON === null){
    foodsJSON = '[]';
  }
  var currentFoods = JSON.parse(foodsJSON);
  currentFoods.push({food: food, calories: calories});
  foodsJSON = JSON.stringify(currentFoods);
  localStorage.setItem('hold-foods-table', foodsJSON);
}

function submitFood(food, calories){
  var newRow = document.createElement("tr");
  newRow.setAttribute("id", foodCount + "-" + food);
  var nameCell = document.createElement('td');
  nameCell.innerText = food;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  var deleteCell = document.createElement('td');
  deleteCell.setAttribute("id", foodCount + "-" + food);
  deleteCell.innerHTML = "<button class='btn btn-default delete-food-button', id='food-delete'>Delete</button>";
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  holdFoods.insertBefore(newRow, holdFoods.firstChild);
  foodCount++;
};

function displayFoods(){
  JSON.parse(localStorage.getItem('hold-foods-table')).forEach(function(element){
    submitFood(element.food, element.calories);
  });
}

displayFoods();
