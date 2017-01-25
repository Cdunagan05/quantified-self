// require('bootstrap')

var foodSubmit = document.getElementById('food-submit');
var foodName = document.getElementById('name-field');
var calorieNumber = document.getElementById('calorie-field');
var allFoods = document.getElementById("all-foods-table");
var alertBox = document.getElementById("alert-message");
var holdFoods = document.getElementById("hold-foods-table");

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
})

function flash(message) {
  $("#alert-message").remove();
  $('.alert').prepend(
    '<div id="alert-message">' + message + '</div>'
  );
  $('#alert-message').delay(1250).fadeOut();
}

function storeFood(food, calories) {
  var foodsJSON = localStorage.getItem('all-foods-table');
  if(foodsJSON === null){
    foodsJSON = '[]';
  }
  var currentFoods = JSON.parse(foodsJSON);
  currentFoods.push({food: food, calories: calories});
  foodsJSON = JSON.stringify(currentFoods);
  localStorage.setItem('all-foods-table', foodsJSON);
}





function submitFood(food, calories){
  var newRow = document.createElement('tr');
  var nameCell = document.createElement('td');
  nameCell.innerText = food;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  var deleteCell = document.createElement('td');
  deleteCell.innerHTML = "<span class='glyphicon glyphicon-trash' aria-hidden='true'></span>";
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  holdFoods.insertBefore(newRow, holdFoods.firstChild);
};

function displayFoods(){
  JSON.parse(localStorage.getItem('all-foods-table')).forEach(function(element){
    submitFood(element.food, element.calories);
  });
}

displayFoods();
