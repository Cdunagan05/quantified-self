require('bootstrap')

var exerciseSubmit = document.getElementById('exercise-submit');
var exerciseDelete = document.getElementById('exercise-delete')
var exerciseName = document.getElementById('name-field');
var calorieNumber = document.getElementById('calorie-field');
var allExercises = document.getElementById("all-exercises-table");
var alertBox = document.getElementById("alert-message");
var holdExercises = document.getElementById("hold-exercises-table");
var exerciseCount = 0;

exerciseSubmit.addEventListener('click', function(){
  var exercise = exerciseName.value;
  var calories = calorieNumber.value;
  if(exercise === ''){
    flash("Please enter a exercise name");
  }else if(calories === ''){
    flash("Please enter a calorie amount");
  }else {
    submitExercise(exercise, calories);
    storeExercise(exercise, calories, exerciseCount);
  }
});

$(document).ready(function() {
  $(".delete-exercise-button").click(function() {
    var toBeDeleted = $(this).parent().parent();
    var storageId = (toBeDeleted[0].id[0]++ + 1);
    var exerciseStorage = localStorage["hold-exercises-table"];
    var exerciseStorageParsed = JSON.parse(exerciseStorage);
    delete exerciseStorageParsed[(storageId.toString())];
    var updatedStorage = JSON.stringify(exerciseStorageParsed);
    localStorage.setItem('hold-exercises-table', updatedStorage);
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

function storeExercise(exercise, calories, counter) {
  var exercisesJSON = localStorage.getItem('hold-exercises-table');
  if(exercisesJSON === null){
    exercisesJSON = '{}';
  }
  var currentExercises = JSON.parse(exercisesJSON);
  currentExercises[counter] = {exercise: exercise, calories: calories};
  exercisesJSON = JSON.stringify(currentExercises);
  localStorage.setItem('hold-exercises-table', exercisesJSON);
}

function submitExercise(exercise, calories){
  var newRow = document.createElement("tr");
  newRow.setAttribute("id", exerciseCount + "-" + exercise);
  var nameCell = document.createElement('td');
  nameCell.innerText = exercise;
  var calorieCell = document.createElement('td');
  calorieCell.innerText = calories;
  var deleteCell = document.createElement('td');
  deleteCell.setAttribute("id", exerciseCount + "-" + exercise);
  deleteCell.innerHTML = "<button class='btn btn-default delete-exercise-button'>Delete</button>";
  newRow.appendChild(nameCell);
  newRow.appendChild(calorieCell);
  newRow.appendChild(deleteCell);
  holdExercises.insertBefore(newRow, holdExercises.firstChild);
  exerciseCount++;
};

function displayExercises(){
  var exercisesHash = JSON.parse(localStorage.getItem('hold-exercises-table'))
    Object.values(exercisesHash).forEach(function(element){ 
      submitExercise(element.food, element.calories)
    });
}

displayExercises();