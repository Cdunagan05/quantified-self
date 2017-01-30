require('bootstrap')
var foodCount = 0;

$(document).ready(function() {

  var foodSubmit = document.getElementById('food-submit');
  var foodDelete = document.getElementById('food-delete')
  var foodName = document.getElementById('name-field');
  var calorieNumber = document.getElementById('calorie-field');
  var allFoods = document.getElementById("all-foods-table");
  var alertBox = document.getElementById("alert-message");
  var holdFoods = document.getElementById("hold-foods-table");
  var input = document.getElementById("myInput");

  input.addEventListener('keyup', function(){
    var filter = input.value.toUpperCase();
    var tr = holdFoods.getElementsByTagName("tr");

    for (i=0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        }else {
          tr[i].style.display = "none";
        }
      }
    }
  });


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

  function submitFood(food, calories){
    var newRow = document.createElement("tr");
    newRow.setAttribute("id", foodCount + "-" + food);
    var nameCell = document.createElement('td');
    nameCell.innerText = food;
    var calorieCell = document.createElement('td');
    calorieCell.innerText = calories;
    var deleteCell = document.createElement('td');
    deleteCell.setAttribute("id", foodCount + "-" + food);
    deleteCell.innerHTML = "<button class='btn btn-default delete-food-button'>Delete</button>";
    newRow.appendChild(nameCell);
    newRow.appendChild(calorieCell);
    newRow.appendChild(deleteCell);
    holdFoods.insertBefore(newRow, holdFoods.firstChild);
    foodCount++;
  };

  function displayFoods(){
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
}

function storeFood(food, calories, counter) {
  var foodsJSON = localStorage.getItem('hold-foods-table');
  if(foodsJSON === null){
    foodsJSON = '{}';
  }
  var currentFoods = JSON.parse(foodsJSON);
  currentFoods[counter] = {food: food, calories: calories};
  foodsJSON = JSON.stringify(currentFoods);
  localStorage.setItem('hold-foods-table', foodsJSON);
}
