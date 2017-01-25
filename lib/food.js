// require('bootstrap')

var foodSubmit = document.getElementById('food-submit');
var foodName = document.getElementById('name-field');
var calorieNumber = document.getElementById('calorie-field');
var allFoods = document.getElementById("all-foods-table");
var alertBox = document.getElementById("alert-message");

foodSubmit.addEventListener('click', function(){
  var food = foodName.value;
  var calories = calorieNumber.value;
  if(food === ''){
    flash("Please enter a food name");
  }else if(calories === ''){
    flash("Please enter a calorie amount");
  }else {
    submitFood(food, calories);
  }
})

function flash(message) {
  $("#alert-message").remove();
  $('.alert').prepend(
    '<div id="alert-message">' + message + '</div>'
  );
  $('#alert-message').delay(1250).fadeOut();
}

// function storeFood(food, calories) {
//
//   var foodsJSON = localStorage.getItem('name-field');
//   var caloriesJSON = localStorage.getItem('calorie-field');
//   if ((foodsJSON === null) || (caloriesJSON === null)){
//
//   }
// }




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
  allFoods.appendChild(newRow);
};
