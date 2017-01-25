// require('bootstrap')

var foodSubmit = document.getElementById('food-submit');
var foodName = document.getElementById('name-field');
var calorieNumber = document.getElementById('calorie-field');
var allFoods = document.getElementById("all-foods-table");
var alertBox = document.getElementById("alert-message");

foodSubmit.addEventListener('click', function(){
  var food = foodName.value;
  var calories = calorieNumber.value;
  if(food === "p"){
    // var notEnteredMessage = document.createElement("h4");
    // throw new Error("Please Enter a food name");
    console.log("Hello, this is working");
  }else {
  submitFood(food, calories);
  }
})

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
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  allFoods.appendChild(newRow);
};
