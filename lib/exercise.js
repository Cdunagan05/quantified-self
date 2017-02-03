require('bootstrap')
var exerciseCount = 0;

$(document).ready(function() {

  var exerciseSubmit = document.getElementById('exercise-submit');
  var exerciseDelete = document.getElementById('exercise-delete');
  var exerciseName = document.getElementById('exercise-field');
  var calorieNumber = document.getElementById('exercise-calorie-field');
  var allExercises = document.getElementById('all-exercises-table');
  var alertBox = document.getElementById('alert-message');
  var holdExercises = document.getElementById('hold-exercises-table');
  var inputExercise = document.getElementById("exercise-search");

  inputExercise.addEventListener('keyup', function(){
    var filter = inputExercise.value.toUpperCase();
    var tr = holdExercises.getElementsByTagName("tr");

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


  exerciseSubmit.addEventListener('click', function(){
    var exercise = exerciseName.value;
    var calories = calorieNumber.value;
    if(exercise === ''){
      flash("Please enter an exercise name");
    }else if(calories === ''){
      flash("Please enter a calorie amount");
    }else {
      submitExercise(exercise, calories);
      storeExercise(exercise, calories, exerciseCount);
    }
  });

  function submitExercise(exercise, calories){
    var newRow = document.createElement("tr");
    newRow.setAttribute("id", exerciseCount + "-" + exercise);
    var nameCell = document.createElement('td');
    nameCell.innerText = exercise;
    nameCell.setAttribute("id", exerciseCount + 1);
    nameCell.setAttribute("class", "exercise-name-cell");
    var calorieCell = document.createElement('td');
    calorieCell.innerText = calories;
    calorieCell.setAttribute("id", exerciseCount + 1);
    calorieCell.setAttribute("class", "exercise-calorie-cell");
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
      submitExercise(element.exercise, element.calories)
    });
  }

  displayExercises();
  
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

$(function() {

  var $td = $("td");
  
  $td.on({
    "dblclick" : function() {
      $td.not(this).prop("contenteditable", false);
      $(this).prop("contenteditable", true);
    },
    "blur" : function() {
      var newText = this.textContent
      var storage = JSON.parse(localStorage["hold-exercises-table"]);
      var exerciseToEdit = storage[this.id]
      if(this.classList[0] === "exercise-name-cell") {
        exerciseToEdit["exercise"] = newText;
      } else if(this.classList[0] === "exercise-calorie-cell") {
        exerciseToEdit["calories"] = newText;
      };
      var newStorage = JSON.stringify(storage)
      localStorage.setItem("hold-exercises-table", newStorage)
    }
  });

});